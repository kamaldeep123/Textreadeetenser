/**
 * DOCX test file creation for TensorFlow.js Text Reader
 * Creates a sample DOCX file for testing Word document extraction functionality
 */

// Function to create a sample DOCX-like file for testing
const createSampleDocx = () => {
  // This is a simplified approach for testing
  // In a real application, we would use a proper DOCX generation library
  // For testing purposes, we'll create a simple file with DOCX mime type
  
  const docxContent = `
    This is a sample Word document for testing the TensorFlow.js Text Reader application.
    
    It contains multiple paragraphs to test the Word document extraction capabilities.
    
    The application should be able to extract text from this document and analyze it.
    
    This will help verify that the DOCX extraction functionality is working correctly.
  `;
  
  // Create a Blob with the text content and DOCX mime type
  const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  return new File([blob], 'sample.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
};

// Function to test DOCX file upload
const testDocxFileUpload = () => {
  try {
    const file = createSampleDocx();
    
    // Create a DataTransfer object and add the file
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    
    // Set the file input's files property
    const fileInput = document.getElementById('file-input');
    fileInput.files = dataTransfer.files;
    
    // Trigger the change event
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
    
    console.log('Sample DOCX file uploaded for testing');
  } catch (error) {
    console.error('Error creating sample DOCX:', error);
  }
};

// Add a test button to the page
const addDocxTestButton = () => {
  const button = document.createElement('button');
  button.textContent = 'Test DOCX Upload';
  button.style.position = 'fixed';
  button.style.bottom = '90px';
  button.style.right = '10px';
  button.style.zIndex = '1000';
  button.style.backgroundColor = '#3498db';
  
  button.addEventListener('click', testDocxFileUpload);
  
  document.body.appendChild(button);
  console.log('DOCX Test button added to page');
};

// Run when the page loads
window.addEventListener('load', () => {
  // Only add test button in development environment
  if (window.location.protocol === 'file:') {
    addDocxTestButton();
  }
});
