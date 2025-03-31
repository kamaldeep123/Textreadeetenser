/**
 * Enhanced PDF text extraction functionality for TensorFlow.js Text Reader
 * Uses PDF.js library for client-side PDF text extraction with improved handling
 */

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

// PDF text extraction module with enhanced capabilities
const PDFExtractor = {
    // Initialize the PDF.js library
    init: function() {
        console.log('Enhanced PDF Extractor initialized');
    },
    
    // Extract text from a PDF file with improved handling
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
                    document.getElementById('loading').classList.remove('hidden');
                    document.getElementById('loading').textContent = `Extracting text from PDF (${numPages} pages)...`;
                    
                    // Extract text from each page
                    for (let i = 1; i <= numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent({
                            normalizeWhitespace: true,
                            disableCombineTextItems: false
                        });
                        
                        // Process text items with better handling of layout
                        let lastY = null;
                        let pageText = '';
                        
                        for (const item of textContent.items) {
                            if (lastY !== item.transform[5] && lastY !== null) {
                                // New line detected
                                pageText += '\n';
                            }
                            
                            pageText += item.str;
                            lastY = item.transform[5];
                        }
                        
                        fullText += pageText + '\n\n';
                        
                        // Update loading status
                        document.getElementById('loading').textContent = `Extracting text from PDF (page ${i}/${numPages})...`;
                    }
                    
                    // Hide loading indicator
                    document.getElementById('loading').classList.add('hidden');
                    
                    resolve(fullText.trim());
                } catch (error) {
                    console.error('Error extracting text from PDF:', error);
                    document.getElementById('loading').classList.add('hidden');
                    reject(new Error(`Failed to extract text from PDF: ${error.message}`));
                }
            };
            
            reader.onerror = function(error) {
                console.error('Error reading PDF file:', error);
                reject(new Error('Failed to read PDF file'));
            };
            
            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    },
    
    // Get PDF metadata
    getMetadata: async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(event) {
                const typedArray = new Uint8Array(event.target.result);
                
                try {
                    // Load the PDF document using PDF.js
                    const loadingTask = pdfjsLib.getDocument(typedArray);
                    const pdf = await loadingTask.promise;
                    
                    // Get metadata
                    const metadata = await pdf.getMetadata();
                    
                    resolve({
                        title: metadata.info?.Title || 'Untitled',
                        author: metadata.info?.Author || 'Unknown',
                        numPages: pdf.numPages,
                        isEncrypted: pdf.isEncrypted
                    });
                } catch (error) {
                    console.error('Error getting PDF metadata:', error);
                    reject(error);
                }
            };
            
            reader.onerror = function(error) {
                console.error('Error reading PDF file for metadata:', error);
                reject(error);
            };
            
            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    }
};
