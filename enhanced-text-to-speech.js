/**
 * Enhanced Text-to-Speech functionality for TensorFlow.js Text Reader
 * Uses Web Speech API with improved voice selection and natural speech parameters
 */

// Initialize text-to-speech functionality
function setupTextToSpeech() {
    // Get DOM elements
    const readBtn = document.getElementById('read-btn');
    const inputText = document.getElementById('input-text');
    
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Add event listener to the read button
        readBtn.addEventListener('click', () => {
            const text = inputText.value.trim();
            
            if (text) {
                speakText(text);
            } else {
                alert('Please enter or upload some text to read aloud.');
            }
        });
        
        // Enable the read button
        readBtn.disabled = false;
    } else {
        // Browser doesn't support speech synthesis
        readBtn.disabled = true;
        readBtn.textContent = 'Text-to-Speech Not Supported';
        console.error('This browser does not support the Web Speech API');
    }
}

// Enhanced speak function with improved voice selection and natural parameters
function speakText(text) {
    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    let voices = speechSynthesis.getVoices();
    
    // If voices array is empty, wait for voices to load
    if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            voices = speechSynthesis.getVoices();
            setVoiceAndSpeak(utterance, voices);
        });
    } else {
        setVoiceAndSpeak(utterance, voices);
    }
}

// Helper function to set voice and speech parameters
function setVoiceAndSpeak(utterance, voices) {
    // Find a good quality voice - prioritize natural sounding voices
    let selectedVoice = null;
    
    // First try to find a premium/enhanced voice
    for (const voice of voices) {
        if (voice.name.includes('Premium') || 
            voice.name.includes('Enhanced') || 
            voice.name.includes('Neural') ||
            voice.localService === false) { // Non-local voices are often higher quality
            selectedVoice = voice;
            break;
        }
    }
    
    // If no premium voice found, try to find a good English voice
    if (!selectedVoice) {
        for (const voice of voices) {
            if (voice.lang.startsWith('en-')) {
                selectedVoice = voice;
                break;
            }
        }
    }
    
    // If still no voice found, use the first available voice
    if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
    }
    
    // Set the selected voice
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    
    // Set natural-sounding speech parameters
    utterance.rate = 0.9;       // Slightly slower than default for better clarity
    utterance.pitch = 1.0;      // Normal pitch
    utterance.volume = 1.0;     // Full volume
    
    // Add pauses at punctuation for more natural speech
    const processedText = addPausesToText(utterance.text);
    utterance.text = processedText;
    
    // Show speaking indicator
    const readBtn = document.getElementById('read-btn');
    const originalText = readBtn.textContent;
    readBtn.textContent = 'Speaking...';
    readBtn.disabled = true;
    
    // Add event listeners for speech events
    utterance.onend = () => {
        // Reset button when speech ends
        readBtn.textContent = originalText;
        readBtn.disabled = false;
    };
    
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        readBtn.textContent = originalText;
        readBtn.disabled = false;
    };
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Speak the text
    speechSynthesis.speak(utterance);
}

// Function to add pauses at punctuation for more natural speech
function addPausesToText(text) {
    // Replace periods, commas, etc. with pauses using SSML-like syntax
    // Note: Web Speech API doesn't fully support SSML, but some engines recognize these patterns
    return text
        .replace(/\.\s+/g, '. <break time="500ms"/> ')
        .replace(/\?\s+/g, '? <break time="500ms"/> ')
        .replace(/\!\s+/g, '! <break time="500ms"/> ')
        .replace(/,\s+/g, ', <break time="200ms"/> ')
        .replace(/;\s+/g, '; <break time="300ms"/> ')
        .replace(/:\s+/g, ': <break time="300ms"/> ');
}

// Function to stop speaking
function stopSpeaking() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        
        // Reset button
        const readBtn = document.getElementById('read-btn');
        readBtn.textContent = 'Read Text Aloud';
        readBtn.disabled = false;
    }
}

// Add a stop button to the UI
function addStopSpeakingButton() {
    const container = document.querySelector('.button-container');
    
    if (container && 'speechSynthesis' in window) {
        const stopBtn = document.createElement('button');
        stopBtn.id = 'stop-btn';
        stopBtn.className = 'btn btn-danger';
        stopBtn.textContent = 'Stop Speaking';
        stopBtn.style.display = 'none'; // Initially hidden
        
        container.appendChild(stopBtn);
        
        // Add event listener
        stopBtn.addEventListener('click', stopSpeaking);
        
        // Show/hide stop button when speaking starts/ends
        const readBtn = document.getElementById('read-btn');
        const originalAddEventListener = readBtn.addEventListener;
        
        readBtn.addEventListener = function(type, listener, options) {
            if (type === 'click') {
                const wrappedListener = function(event) {
                    // Show stop button when read button is clicked
                    stopBtn.style.display = 'inline-block';
                    listener(event);
                };
                return originalAddEventListener.call(this, type, wrappedListener, options);
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
        
        // Update the onend event to hide the stop button
        const originalSetVoiceAndSpeak = window.setVoiceAndSpeak;
        window.setVoiceAndSpeak = function(utterance, voices) {
            const originalOnEnd = utterance.onend;
            utterance.onend = function(event) {
                stopBtn.style.display = 'none';
                if (originalOnEnd) {
                    originalOnEnd(event);
                }
            };
            return originalSetVoiceAndSpeak(utterance, voices);
        };
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    if ('speechSynthesis' in window) {
        // Pre-load voices
        speechSynthesis.getVoices();
        
        // Add stop button
        addStopSpeakingButton();
    }
});
