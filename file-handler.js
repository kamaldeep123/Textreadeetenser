/**
 * File upload and processing functionality for TensorFlow.js Text Reader
 * Handles different file types and extracts text content
 */

// File handler module
const FileHandler = {
    // Supported file types
    supportedTypes: {
        'text/plain': 'TXT',
        'application/pdf': 'PDF',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
    },
    
    // Initialize the file handler
    init: function() {
        console.log('File Handler initialized');
    },
    
    // Process the uploaded file based on its type
    processFile: async function(file) {
        return new Promise(async (resolve, reject) => {
            try {
                const fileType = file.type;
                let extractedText = '';
                
                // Show loading indicator
                const loadingDiv = document.getElementById('loading');
                loadingDiv.classList.remove('hidden');
                loadingDiv.textContent = `Processing ${file.name}...`;
                
                // Process based on file type
                if (fileType === 'text/plain') {
                    // For plain text files
                    extractedText = await this.extractTextFromTxt(file);
                } else if (fileType === 'application/pdf') {
                    // For PDF files - use enhanced PDF extractor
                    extractedText = await PDFExtractor.extractText(file);
                } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    // For DOCX files - use enhanced DOCX extractor
                    extractedText = await DocxExtractor.extractText(file);
                } else {
                    throw new Error(`Unsupported file type: ${fileType}`);
                }
                
                // Hide loading indicator
                loadingDiv.classList.add('hidden');
                
                resolve(extractedText);
            } catch (error) {
                console.error('Error processing file:', error);
                
                // Hide loading indicator and show error
                document.getElementById('loading').classList.add('hidden');
                
                reject(error);
            }
        });
    },
    
    // Extract text from a plain text file
    extractTextFromTxt: async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const text = event.target.result;
                resolve(text);
            };
            
            reader.onerror = function(error) {
                console.error('Error reading text file:', error);
                reject(error);
            };
            
            // Read the file as text
            reader.readAsText(file);
        });
    },
    
    // Check if the file type is supported
    isSupported: function(file) {
        return this.supportedTypes.hasOwnProperty(file.type);
    },
    
    // Get a friendly name for the file type
    getFileTypeName: function(file) {
        return this.supportedTypes[file.type] || 'Unknown';
    }
};
