// Text-to-Speech functionality for TensorFlow.js Text Reader

// This function will be added to the main app.js file
function setupTextToSpeech() {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Create a button for text-to-speech
        const ttsButton = document.createElement('button');
        ttsButton.id = 'tts-btn';
        ttsButton.textContent = 'Read Text Aloud';
        ttsButton.style.marginLeft = '10px';
        
        // Get the process button to position the TTS button next to it
        const processBtn = document.getElementById('process-btn');
        processBtn.parentNode.insertBefore(ttsButton, processBtn.nextSibling);
        
        // Add event listener to the TTS button
        ttsButton.addEventListener('click', readTextAloud);
        
        console.log('Text-to-Speech functionality added');
    } else {
        console.warn('Text-to-Speech is not supported in this browser');
    }
}

// Function to read the text aloud
function readTextAloud() {
    const text = document.getElementById('input-text').value.trim();
    
    if (!text) {
        alert('Please enter some text to read aloud.');
        return;
    }
    
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties (optional)
    utterance.rate = 1.0; // Speed of speech (0.1 to 10)
    utterance.pitch = 1.0; // Pitch of speech (0 to 2)
    utterance.volume = 1.0; // Volume (0 to 1)
    
    // Use the default voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices[0];
    }
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
    
    // Add event listeners for speech events
    utterance.onstart = () => {
        document.getElementById('tts-btn').textContent = 'Speaking...';
        document.getElementById('tts-btn').disabled = true;
    };
    
    utterance.onend = () => {
        document.getElementById('tts-btn').textContent = 'Read Text Aloud';
        document.getElementById('tts-btn').disabled = false;
    };
    
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        document.getElementById('tts-btn').textContent = 'Read Text Aloud';
        document.getElementById('tts-btn').disabled = false;
        alert('An error occurred while reading the text aloud.');
    };
}
