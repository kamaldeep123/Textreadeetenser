// Enhanced Text-to-Speech functionality with natural voice and UTC timestamp reading
let voices = [];
let isSpeaking = false;
let currentDateTime = '';

// Format and update datetime in UTC
function updateDateTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    // Update display if element exists
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = currentDateTime;
    }
    
    return currentDateTime;
}

// Convert datetime to natural speech format
function formatDateTimeForSpeech(dateTimeStr) {
    const [datePart, timePart] = dateTimeStr.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Convert to more natural speech format
    return `The current UTC time is ${hours}:${minutes} and ${seconds} seconds on ${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

// Initialize voice system with preference for natural voices
function loadVoices() {
    return new Promise((resolve) => {
        const loadVoiceList = () => {
            voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                resolve(voices);
            }
        };
        
        loadVoiceList();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = loadVoiceList;
        }
    });
}

// Set up voice selection interface with priority for natural voices
async function setupVoiceSelector() {
    try {
        await loadVoices();
        
        if (!document.getElementById('voice-select')) {
            const voiceSelect = document.createElement('select');
            voiceSelect.id = 'voice-select';
            voiceSelect.style.cssText = `
                margin: 10px;
                padding: 8px;
                border-radius: 4px;
                border: 1px solid #ccc;
                font-size: 14px;
                min-width: 200px;
            `;
            
            // Filter and prioritize natural voices
            const naturalVoices = voices.filter(voice => 
                voice.name.includes('Neural') ||
                voice.name.includes('Natural') ||
                voice.name.includes('Premium') ||
                voice.name.toLowerCase().includes('samantha') ||
                voice.name.toLowerCase().includes('daniel')
            );
            
            const otherVoices = voices.filter(voice => !naturalVoices.includes(voice));
            
            // Add natural voices group
            if (naturalVoices.length > 0) {
                const naturalGroup = document.createElement('optgroup');
                naturalGroup.label = 'Natural Voices';
                naturalVoices.forEach(voice => addVoiceOption(naturalGroup, voice));
                voiceSelect.appendChild(naturalGroup);
            }
            
            // Add other voices group
            const otherGroup = document.createElement('optgroup');
            otherGroup.label = 'Other Voices';
            otherVoices.forEach(voice => addVoiceOption(otherGroup, voice));
            voiceSelect.appendChild(otherGroup);
            
            // Insert voice selector into DOM
            const controlsContainer = document.createElement('div');
            controlsContainer.id = 'tts-controls';
            controlsContainer.style.cssText = 'margin: 20px 0; text-align: center;';
            
            const readButton = createReadButton();
            
            controlsContainer.appendChild(readButton);
            controlsContainer.appendChild(voiceSelect);
            
            // Find appropriate place to insert controls
            const datetimeElement = document.getElementById('datetime');
            if (datetimeElement && datetimeElement.parentNode) {
                datetimeElement.parentNode.insertBefore(controlsContainer, datetimeElement.nextSibling);
            }
        }
    } catch (error) {
        console.error('Error setting up voice selector:', error);
    }
}

// Helper function to add voice options
function addVoiceOption(group, voice) {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    option.selected = voice.name.includes('Natural') || voice.name.includes('Neural');
    group.appendChild(option);
}

// Create styled read button
function createReadButton() {
    const button = document.createElement('button');
    button.id = 'read-btn';
    button.textContent = 'Read Time Aloud';
    button.style.cssText = `
        padding: 10px 20px;
        font-size: 14px;
        color: white;
        background-color: #4CAF50;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-right: 10px;
    `;
    button.addEventListener('click', readCurrentInfo);
    return button;
}

// Main function to read current information
async function readCurrentInfo() {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        updateReadButton();
        return;
    }
    
    // Update current time
    updateDateTime();
    
    // Prepare natural speech text
    const timeText = formatDateTimeForSpeech(currentDateTime);
    const userText = `The current user is ${document.getElementById('userLogin').textContent}`;
    const fullText = `${timeText}. ${userText}`;
    
    // Get selected voice
    const voiceSelect = document.getElementById('voice-select');
    const selectedVoiceName = voiceSelect ? voiceSelect.value : null;
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName) || 
                         voices.find(voice => voice.name.includes('Natural')) ||
                         voices[0];
    
    // Create and configure utterance
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;  // Slightly slower for clarity
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 1.0;
    
    // Handle speech events
    utterance.onstart = () => {
        isSpeaking = true;
        updateReadButton();
    };
    
    utterance.onend = () => {
        isSpeaking = false;
        updateReadButton();
    };
    
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        isSpeaking = false;
        updateReadButton();
        alert('An error occurred while reading the information aloud.');
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
}

// Update read button state
function updateReadButton() {
    const readButton = document.getElementById('read-btn');
    if (readButton) {
        readButton.textContent = isSpeaking ? 'Stop Speaking' : 'Read Time Aloud';
        readButton.style.backgroundColor = isSpeaking ? '#ff4444' : '#4CAF50';
    }
}

// Initialize functionality
document.addEventListener('DOMContentLoaded', () => {
    setupVoiceSelector();
    
    // Start datetime updates
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        updateReadButton();
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
    }
});

// Export functions for external use
window.textToSpeech = {
    speak: readCurrentInfo,
    stop: () => {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        updateReadButton();
    },
    getCurrentDateTime: updateDateTime
};