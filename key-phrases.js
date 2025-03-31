// Additional text analysis functionality for TensorFlow.js Text Reader

// Function to extract key phrases from text
function extractKeyPhrases(text) {
    if (!text) return [];
    
    // Split text into sentences
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    // Common stop words to filter out
    const stopWords = new Set([
        'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 
        'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 
        'may', 'might', 'must', 'of', 'in', 'with', 'about', 'against', 'between',
        'into', 'through', 'during', 'before', 'after', 'above', 'below', 'from',
        'up', 'down', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she',
        'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
    ]);
    
    // Extract words and count their frequency
    const wordFrequency = {};
    sentences.forEach(sentence => {
        // Split sentence into words and filter out stop words
        const words = sentence.trim().toLowerCase().split(/\s+/)
            .filter(word => word.length > 2 && !stopWords.has(word));
        
        // Count word frequency
        words.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
    });
    
    // Convert to array and sort by frequency
    const sortedWords = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => ({ word: entry[0], frequency: entry[1] }));
    
    return sortedWords;
}

// Function to display key phrases in the UI
function displayKeyPhrases(phrases) {
    // Create a container for key phrases if it doesn't exist
    let keyPhrasesContainer = document.getElementById('key-phrases-output');
    
    if (!keyPhrasesContainer) {
        // Create a new result item for key phrases
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        // Create heading
        const heading = document.createElement('h3');
        heading.textContent = 'Key Phrases';
        resultItem.appendChild(heading);
        
        // Create output container
        keyPhrasesContainer = document.createElement('div');
        keyPhrasesContainer.id = 'key-phrases-output';
        resultItem.appendChild(keyPhrasesContainer);
        
        // Add to results section
        document.getElementById('results').appendChild(resultItem);
    }
    
    // Display key phrases
    if (phrases.length === 0) {
        keyPhrasesContainer.innerHTML = '<p>No key phrases found.</p>';
        return;
    }
    
    // Create HTML for key phrases
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 10px;">';
    
    phrases.forEach(phrase => {
        // Calculate size based on frequency (between 0.8em and 1.5em)
        const size = 0.8 + (phrase.frequency * 0.1);
        const fontSize = Math.min(1.5, size) + 'em';
        
        html += `<span style="font-size: ${fontSize}; padding: 5px 10px; background-color: #e3f2fd; 
                border-radius: 15px; display: inline-block;">${phrase.word} (${phrase.frequency})</span>`;
    });
    
    html += '</div>';
    keyPhrasesContainer.innerHTML = html;
}

// Function to add key phrase extraction to the main processing function
function addKeyPhraseExtraction() {
    // Get the original processText function
    const originalProcessText = window.processText;
    
    // Replace it with an enhanced version
    window.processText = async function() {
        // Call the original function first
        await originalProcessText.apply(this, arguments);
        
        // Get the input text
        const text = document.getElementById('input-text').value.trim();
        
        // Extract and display key phrases
        const keyPhrases = extractKeyPhrases(text);
        displayKeyPhrases(keyPhrases);
    };
    
    console.log('Key phrase extraction functionality added');
}

// Call this function after the page loads
document.addEventListener('DOMContentLoaded', () => {
    // This will be called after the main app.js is loaded
    setTimeout(() => {
        addKeyPhraseExtraction();
    }, 500);
});
