# User Guide: TensorFlow.js Text Reader

This guide provides detailed instructions on how to use the TensorFlow.js Text Reader application.

## Getting Started

The TensorFlow.js Text Reader is a web application that allows you to analyze text using TensorFlow.js and provides additional features like file upload and natural text-to-speech.

## Application Structure

This application uses a simple flat directory structure with all files in a single folder for easier organization and GitHub deployment. This makes it straightforward to download, use, and deploy the application.

## Main Features

### 1. Text Analysis
- **Text Embeddings**: Generate vector representations of text using TensorFlow.js Universal Sentence Encoder
- **Sentiment Analysis**: Determine the emotional tone of the text
- **Text Statistics**: View character count, word count, sentence count, and more
- **Key Phrase Extraction**: Identify important phrases in the text

### 2. Multiple Input Methods
- **Direct Text Input**: Type or paste text directly into the application
- **File Upload**: Upload and extract text from various file formats:
  - PDF documents (*.pdf)
  - Text files (*.txt)
  - Word documents (*.docx)

### 3. Enhanced Text-to-Speech
- **Natural Voice**: Uses the best available voice on your system
- **Appropriate Pauses**: Adds natural pauses at punctuation marks
- **Speech Controls**: Start and stop speech as needed

## How to Use the Application

### Direct Text Input

1. When you open the application, the "Text Input" tab is selected by default
2. Type or paste your text into the text area
3. Click the "Process Text" button to analyze the text
4. View the analysis results in the sections below:
   - Text Embeddings
   - Sentiment Score
   - Text Statistics
5. To hear the text read aloud, click the "Read Text Aloud" button

### File Upload

1. Click the "File Upload" tab
2. Click the "Choose a file" button or drag and drop a file onto the designated area
3. Select a PDF, TXT, or Word document from your computer
4. The application will extract the text from the file and display it in the text area
5. Click the "Process Text" button to analyze the extracted text
6. To hear the text read aloud, click the "Read Text Aloud" button

### Using Text-to-Speech

1. Enter text or upload a file to extract text
2. Click the "Read Text Aloud" button
3. The application will read the text using a natural-sounding voice
4. The speech will include appropriate pauses at punctuation marks
5. To stop the speech at any time, click the "Stop Speaking" button (appears when speech is active)

## Tips for Best Results

- **For PDF Files**: The application works best with text-based PDFs rather than scanned documents
- **For Word Documents**: Complex formatting may be simplified during text extraction
- **For Text-to-Speech**: Chrome and Edge browsers typically provide the best voice quality
- **For Large Files**: Processing large documents may take a few moments
- **For Best Analysis**: Provide well-structured text with proper punctuation for the most accurate results

## Troubleshooting

- **If text extraction fails**: Try a different file format or copy and paste the text manually
- **If text-to-speech doesn't work**: Ensure your browser supports the Web Speech API (Chrome, Edge, Firefox, and Safari are recommended)
- **If analysis results are unexpected**: Check that the text is properly formatted and contains meaningful content
- **If the application seems slow**: Large documents or complex analyses may take longer to process

## Privacy Information

- All processing is done locally in your browser
- No text or files are uploaded to any server
- Your data remains private on your device
