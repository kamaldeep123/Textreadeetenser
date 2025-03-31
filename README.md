# TensorFlow.js Text Reader

A web application that uses TensorFlow.js to analyze text with advanced features for file upload and natural text-to-speech.

## Features

- **Text Analysis**: Uses TensorFlow.js Universal Sentence Encoder to generate text embeddings
- **Sentiment Analysis**: Analyzes the sentiment of the input text
- **Text Statistics**: Provides character count, word count, sentence count, and more
- **Key Phrase Extraction**: Identifies important phrases in the text
- **Multiple Input Methods**:
  - Direct text input
  - File upload supporting PDF, TXT, and Word documents
- **Enhanced Text-to-Speech**: Natural-sounding voice with appropriate pauses at punctuation

## Technologies Used

- **TensorFlow.js**: For text analysis and embeddings
- **Web Speech API**: For text-to-speech functionality
- **PDF.js**: For PDF text extraction
- **Mammoth.js**: For Word document text extraction

## File Structure

All files are organized in a single folder for easier management and GitHub deployment:
- `index.html` - Main HTML file
- `style.css` - CSS styles
- `app.js` - Main application logic
- `text-to-speech.js` - Text-to-speech functionality
- `enhanced-text-to-speech.js` - Enhanced voice features
- `key-phrases.js` - Key phrase extraction
- `file-handler.js` - File upload handling
- `pdf.js` & `enhanced-pdf.js` - PDF processing
- `docx.js` & `enhanced-docx.js` - Word document processing
- Various test files for development

## How to Use

### Text Input
1. Enter text in the input area
2. Click "Process Text" to analyze the text
3. Click "Read Text Aloud" to use the text-to-speech feature

### File Upload
1. Click the "File Upload" tab
2. Select a file (PDF, TXT, or Word document)
3. The text will be extracted and displayed in the input area
4. Click "Process Text" to analyze the extracted text
5. Click "Read Text Aloud" to hear the text read with a natural voice

## Installation

No installation is required. Simply open the `index.html` file in a modern web browser.

## GitHub Deployment

To deploy this application to GitHub Pages:

1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in the repository settings
4. Select the main branch as the source
5. Your application will be available at `https://[your-username].github.io/[repository-name]/`

For detailed deployment instructions, see the `GITHUB_DEPLOYMENT.md` file.

## Browser Compatibility

This application works best in modern browsers that support TensorFlow.js and the Web Speech API:
- Google Chrome (recommended)
- Microsoft Edge
- Firefox
- Safari

## License

This project is open source and available under the MIT License.
