/**
 * PDF test file creation for TensorFlow.js Text Reader
 * Creates a sample PDF file for testing PDF extraction functionality
 */

// Function to create a sample PDF file using PDF.js
const createSamplePDF = () => {
  // This is a simplified approach for testing
  // In a real application, we would use a PDF generation library
  // For testing purposes, we'll create a simple PDF-like structure
  
  const pdfContent = `%PDF-1.5
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 6 0 R >> >>
endobj
5 0 obj
<< /Length 172 >>
stream
BT
/F1 12 Tf
50 700 Td
(This is a sample PDF file for testing the TensorFlow.js Text Reader application.) Tj
0 -20 Td
(It contains multiple paragraphs to test the PDF extraction capabilities.) Tj
0 -20 Td
(The application should be able to extract text from this PDF and analyze it.) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000210 00000 n
0000000251 00000 n
0000000476 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
543
%%EOF`;
  
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  return new File([blob], 'sample.pdf', { type: 'application/pdf' });
};

// Function to test PDF file upload
const testPDFFileUpload = () => {
  try {
    const file = createSamplePDF();
    
    // Create a DataTransfer object and add the file
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    
    // Set the file input's files property
    const fileInput = document.getElementById('file-input');
    fileInput.files = dataTransfer.files;
    
    // Trigger the change event
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
    
    console.log('Sample PDF file uploaded for testing');
  } catch (error) {
    console.error('Error creating sample PDF:', error);
  }
};

// Add a test button to the page
const addPDFTestButton = () => {
  const button = document.createElement('button');
  button.textContent = 'Test PDF Upload';
  button.style.position = 'fixed';
  button.style.bottom = '50px';
  button.style.right = '10px';
  button.style.zIndex = '1000';
  button.style.backgroundColor = '#e74c3c';
  
  button.addEventListener('click', testPDFFileUpload);
  
  document.body.appendChild(button);
  console.log('PDF Test button added to page');
};

// Run when the page loads
window.addEventListener('load', () => {
  // Only add test button in development environment
  if (window.location.protocol === 'file:') {
    addPDFTestButton();
  }
});
