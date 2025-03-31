/**
 * Word document text extraction functionality for TensorFlow.js Text Reader
 * Uses mammoth.js library for client-side DOCX text extraction
 */

// Word document text extraction module
const DocxExtractor = {
    // Initialize the mammoth.js library
    init: function() {
        // Mammoth.js is loaded via CDN in the HTML file
        console.log('DOCX Extractor initialized');
    },
    
    // Extract text from a DOCX file
    extractText: async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(event) {
                const arrayBuffer = event.target.result;
                
                try {
                    document.getElementById('loading').textContent = 'Extracting text from Word document...';
                    
                    // Use mammoth.js to extract text from the DOCX file
                    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
                    const text = result.value; // The raw text content
                    
                    // Check if there were any warnings
                    if (result.messages.length > 0) {
                        console.warn('Warnings while extracting text from DOCX:', result.messages);
                    }
                    
                    resolve(text.trim());
                } catch (error) {
                    console.error('Error extracting text from DOCX:', error);
                    reject(error);
                }
            };
            
            reader.onerror = function(error) {
                console.error('Error reading DOCX file:', error);
                reject(error);
            };
            
            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    }
};
