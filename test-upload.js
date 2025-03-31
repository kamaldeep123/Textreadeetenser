/**
 * File upload test script for TensorFlow.js Text Reader
 * Creates sample files for testing file upload functionality
 */

// Create a sample text file
const createSampleTextFile = () => {
  const content = `This is a sample text file for testing the TensorFlow.js Text Reader application.
It contains multiple sentences to test the text processing capabilities.
The application should be able to extract text from this file and analyze it.
This will help verify that the file upload functionality is working correctly.`;
  
  const blob = new Blob([content], { type: 'text/plain' });
  return new File([blob], 'sample.txt', { type: 'text/plain' });
};

// Function to test file upload with a text file
const testTextFileUpload = () => {
  const file = createSampleTextFile();
  
  // Create a DataTransfer object and add the file
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  
  // Set the file input's files property
  const fileInput = document.getElementById('file-input');
  fileInput.files = dataTransfer.files;
  
  // Trigger the change event
  const event = new Event('change', { bubbles: true });
  fileInput.dispatchEvent(event);
  
  console.log('Sample text file uploaded for testing');
};

// Add a test button to the page
const addTestButton = () => {
  const button = document.createElement('button');
  button.textContent = 'Test TXT Upload';
  button.style.position = 'fixed';
  button.style.bottom = '10px';
  button.style.right = '10px';
  button.style.zIndex = '1000';
  button.style.backgroundColor = '#9b59b6';
  
  button.addEventListener('click', testTextFileUpload);
  
  document.body.appendChild(button);
  console.log('Test button added to page');
};

// Run when the page loads
window.addEventListener('load', () => {
  // Only add test button in development environment
  if (window.location.protocol === 'file:') {
    addTestButton();
  }
});
