// TensorFlow.js Text Reader Application

// Global variables
let model; // Will hold the Universal Sentence Encoder model
let isModelLoaded = false;
let selectedFile = null; // Will hold the selected file for upload

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const inputText = document.getElementById('input-text');
    const processBtn = document.getElementById('process-btn');
    const loadingDiv = document.getElementById('loading');
    const embeddingsOutput = document.getElementById('embeddings-output');
    const sentimentOutput = document.getElementById('sentiment-output');
    const statsOutput = document.getElementById('stats-output');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const clearFileBtn = document.getElementById('clear-file');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize the application
    init();

    // Initialize file handling modules
    PDFExtractor.init();
    DocxExtractor.init();
    FileHandler.init();

    // Add event listener to the process button
    processBtn.addEventListener('click', processText);
    
    // Setup Text-to-Speech functionality
    setupTextToSpeech();

    // Add event listeners for tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Add event listener for file input
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if file type is supported
            if (FileHandler.isSupported(file)) {
                selectedFile = file;
                fileName.textContent = `${file.name} (${FileHandler.getFileTypeName(file)})`;
                fileInfo.classList.remove('hidden');
            } else {
                alert('Unsupported file type. Please select a PDF, TXT, or DOCX file.');
                fileInput.value = '';
                selectedFile = null;
            }
        }
    });

    // Add event listener for clear file button
    clearFileBtn.addEventListener('click', () => {
        fileInput.value = '';
        selectedFile = null;
        fileInfo.classList.add('hidden');
    });

    // Initialize function - loads the TensorFlow.js model
    async function init() {
        try {
            // Disable the process button while loading
            processBtn.disabled = true;
            processBtn.textContent = 'Loading Model...';
            
            // Load the Universal Sentence Encoder model
            model = await use.load();
            
            // Update UI once model is loaded
            isModelLoaded = true;
            processBtn.disabled = false;
            processBtn.textContent = 'Process Text';
            
            console.log('TensorFlow.js model loaded successfully');
        } catch (error) {
            console.error('Error loading the model:', error);
            alert('Failed to load the TensorFlow.js model. Please check your internet connection and try again.');
        }
    }

    // Process the input text using TensorFlow.js
    async function processText() {
        let text = '';
        
        // Check which tab is active
        const isFileUploadActive = document.querySelector('.tab-btn[data-tab="file-upload"]').classList.contains('active');
        
        if (isFileUploadActive) {
            // File upload mode
            if (!selectedFile) {
                alert('Please select a file to process.');
                return;
            }
            
            try {
                // Extract text from the selected file
                text = await FileHandler.processFile(selectedFile);
                
                // Display the extracted text in the text area for reference
                inputText.value = text;
                
                // Switch to text input tab to show the extracted text
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                document.querySelector('.tab-btn[data-tab="text-input"]').classList.add('active');
                document.getElementById('text-input').classList.add('active');
            } catch (error) {
                console.error('Error processing file:', error);
                alert(`Error processing file: ${error.message}`);
                return;
            }
        } else {
            // Text input mode
            text = inputText.value.trim();
            
            // Validate input
            if (!text) {
                alert('Please enter some text to process.');
                return;
            }
        }
        
        if (!isModelLoaded) {
            alert('The model is still loading. Please wait a moment and try again.');
            return;
        }
        
        try {
            // Show loading indicator
            loadingDiv.classList.remove('hidden');
            processBtn.disabled = true;
            
            // Split text into sentences (simple split by period)
            const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
            
            // Generate embeddings using the Universal Sentence Encoder
            const embeddings = await model.embed(sentences);
            
            // Convert embeddings to array for display
            const embeddingsArray = await embeddings.array();
            
            // Display a sample of the embeddings (first sentence, first 10 values)
            const embeddingSample = embeddingsArray[0].slice(0, 10);
            embeddingsOutput.textContent = `Embedding dimensions: ${embeddingsArray[0].length}\nSample (first 10 values of first sentence):\n[${embeddingSample.map(val => val.toFixed(4)).join(', ')}...]`;
            
            // Calculate basic sentiment (very simplified approach)
            const sentimentScore = calculateSimpleSentiment(text);
            displaySentiment(sentimentScore);
            
            // Calculate text statistics
            displayTextStatistics(text);
            
            // Enable the process button again
            processBtn.disabled = false;
            loadingDiv.classList.add('hidden');
            
        } catch (error) {
            console.error('Error processing text:', error);
            alert('An error occurred while processing the text. Please try again.');
            processBtn.disabled = false;
            loadingDiv.classList.add('hidden');
        }
    }

    // Simple sentiment analysis function (very basic implementation)
    function calculateSimpleSentiment(text) {
        // Lists of positive and negative words (very simplified)
        const positiveWords = ['good', 'great', 'excellent', 'happy', 'positive', 'wonderful', 'love', 'best', 'beautiful', 'nice'];
        const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'negative', 'horrible', 'hate', 'worst', 'ugly', 'poor'];
        
        // Convert text to lowercase for comparison
        const lowerText = text.toLowerCase();
        
        // Count positive and negative words
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            const matches = lowerText.match(regex);
            if (matches) {
                positiveCount += matches.length;
            }
        });
        
        negativeWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            const matches = lowerText.match(regex);
            if (matches) {
                negativeCount += matches.length;
            }
        });
        
        // Calculate sentiment score (-1 to 1)
        const totalWords = positiveCount + negativeCount;
        if (totalWords === 0) return 0;
        
        return (positiveCount - negativeCount) / totalWords;
    }

    // Display sentiment analysis results
    function displaySentiment(score) {
        let sentiment;
        let color;
        
        if (score > 0.5) {
            sentiment = 'Very Positive';
            color = '#27ae60';
        } else if (score > 0) {
            sentiment = 'Somewhat Positive';
            color = '#2ecc71';
        } else if (score === 0) {
            sentiment = 'Neutral';
            color = '#3498db';
        } else if (score > -0.5) {
            sentiment = 'Somewhat Negative';
            color = '#e67e22';
        } else {
            sentiment = 'Very Negative';
            color = '#e74c3c';
        }
        
        sentimentOutput.innerHTML = `
            <div style="color: ${color}; font-weight: bold;">
                ${sentiment} (Score: ${score.toFixed(2)})
            </div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                <em>Note: This is a very simplified sentiment analysis based on word counting.</em>
            </div>
        `;
    }

    // Calculate and display text statistics
    function displayTextStatistics(text) {
        // Count characters
        const charCount = text.length;
        
        // Count words
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        
        // Count sentences (simple split by period, exclamation, question mark)
        const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
        
        // Calculate average word length
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
        const avgWordLength = (totalWordLength / wordCount).toFixed(2);
        
        // Calculate average sentence length in words
        const avgSentenceLength = (wordCount / sentenceCount).toFixed(2);
        
        // Display statistics
        statsOutput.innerHTML = `
            <ul style="list-style-type: none; padding: 0;">
                <li><strong>Characters:</strong> ${charCount}</li>
                <li><strong>Words:</strong> ${wordCount}</li>
                <li><strong>Sentences:</strong> ${sentenceCount}</li>
                <li><strong>Average Word Length:</strong> ${avgWordLength} characters</li>
                <li><strong>Average Sentence Length:</strong> ${avgSentenceLength} words</li>
            </ul>
        `;
    }
});
