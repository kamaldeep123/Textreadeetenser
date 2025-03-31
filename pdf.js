/**
 * PDF text extraction functionality for TensorFlow.js Text Reader
 * Uses PDF.js library for client-side PDF text extraction
 */

// PDF text extraction module
const PDFExtractor = {
    // Initialize the PDF.js library
    init: function() {
        // PDF.js is loaded via CDN in the HTML file
        console.log('PDF Extractor initialized');
    },
    
    // Extract text from a PDF file
    extractText: async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(event) {
                const typedArray = new Uint8Array(event.target.result);
                
                try {
                    // Load the PDF document using PDF.js
                    const loadingTask = pdfjsLib.getDocument(typedArray);
                    const pdf = await loadingTask.promise;
                    
                    let fullText = '';
                    
                    // Get total number of pages
                    const numPages = pdf.numPages;
                    document.getElementById('loading').textContent = `Extracting text from PDF (${numPages} pages)...`;
                    
                    // Extract text from each page
                    for (let i = 1; i <= numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        
                        // Concatenate the text items
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n\n';
                        
                        // Update loading status
                        document.getElementById('loading').textContent = `Extracting text from PDF (page ${i}/${numPages})...`;
                    }
                    
                    resolve(fullText.trim());
                } catch (error) {
                    console.error('Error extracting text from PDF:', error);
                    reject(error);
                }
            };
            
            reader.onerror = function(error) {
                console.error('Error reading PDF file:', error);
                reject(error);
            };
            
            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    }
};
