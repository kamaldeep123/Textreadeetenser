/**
 * Enhanced DOCX text extraction functionality for TensorFlow.js Text Reader
 * Uses mammoth.js library for client-side DOCX text extraction with improved handling
 */

// Enhanced Word document text extraction module
const DocxExtractor = {
    // Initialize the mammoth.js library
    init: function() {
        console.log('Enhanced DOCX Extractor initialized');
    },
    
    // Extract text from a DOCX file with improved handling
    extractText: async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(event) {
                const arrayBuffer = event.target.result;
                
                try {
                    document.getElementById('loading').classList.remove('hidden');
                    document.getElementById('loading').textContent = 'Extracting text from Word document...';
                    
                    // Use mammoth.js with enhanced options for better text extraction
                    const options = {
                        styleMap: [
                            "p[style-name='Heading 1'] => h1:fresh",
                            "p[style-name='Heading 2'] => h2:fresh",
                            "p[style-name='Heading 3'] => h3:fresh",
                            "p[style-name='Heading 4'] => h4:fresh",
                            "p => p:fresh",
                            "table => table",
                            "r[style-name='Strong'] => strong",
                            "r[style-name='Emphasis'] => em"
                        ]
                    };
                    
                    // Extract text with structure preservation
                    const result = await mammoth.extractRawText({
                        arrayBuffer: arrayBuffer,
                        options: options
                    });
                    
                    const text = result.value; // The raw text content
                    
                    // Check if there were any warnings
                    if (result.messages.length > 0) {
                        console.warn('Warnings while extracting text from DOCX:', result.messages);
                    }
                    
                    // Hide loading indicator
                    document.getElementById('loading').classList.add('hidden');
                    
                    resolve(text.trim());
                } catch (error) {
                    console.error('Error extracting text from DOCX:', error);
                    document.getElementById('loading').classList.add('hidden');
                    reject(new Error(`Failed to extract text from Word document: ${error.message}`));
                }
            };
            
            reader.onerror = function(error) {
                console.error('Error reading DOCX file:', error);
                reject(new Error('Failed to read Word document'));
            };
            
            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    },
    
    // Get DOCX metadata
    getMetadata: async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(event) {
                const arrayBuffer = event.target.result;
                
                try {
                    // Use mammoth.js to extract document properties
                    // Note: mammoth.js doesn't provide direct metadata extraction
                    // This is a simplified approach
                    
                    const result = await mammoth.extractRawText({
                        arrayBuffer: arrayBuffer
                    });
                    
                    // Basic metadata
                    const metadata = {
                        title: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: new Date(file.lastModified).toLocaleString()
                    };
                    
                    resolve(metadata);
                } catch (error) {
                    console.error('Error getting DOCX metadata:', error);
                    reject(error);
                }
            };
            
            reader.onerror = function(error) {
                console.error('Error reading DOCX file for metadata:', error);
                reject(error);
            };
            
            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    }
};
