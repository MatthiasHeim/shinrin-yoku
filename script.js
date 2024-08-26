// Wait for the page to load
window.addEventListener('load', () => {
    // Check if Vapi is defined
    if (typeof Vapi === 'undefined') {
        console.error('Vapi SDK not loaded. Please check your internet connection and try again.');
        return;
    }

    // Initialize VAPI with your public key
    const vapi = new Vapi("b1bdc903-982d-4845-b770-4e5334614c88");

    // Get the audio element
    const forestAudio = document.getElementById('forestAudio');
    const toggleAudioButton = document.getElementById('toggleAudio');

    // Function to start the call
    function startCall() {
        vapi.start("17800062-cdea-41c1-a0f9-848e53ac8288");
    }

    // Event listeners for VAPI
    vapi.on("call-start", () => {
        console.log("Call has started.");
    });

    vapi.on("call-end", () => {
        console.log("Call has ended.");
    });

    vapi.on("speech-start", () => {
        console.log("Assistant speech has started.");
        // Optionally lower the volume of forest sounds when the assistant is speaking
        forestAudio.volume = 0.3;
    });

    vapi.on("speech-end", () => {
        console.log("Assistant speech has ended.");
        // Restore the volume of forest sounds
        forestAudio.volume = 1;
    });

    vapi.on("volume-level", (volume) => {
        console.log(`Assistant volume level: ${volume}`);
    });

    vapi.on("message", (message) => {
        console.log("Received message:", message);
    });

    vapi.on("error", (e) => {
        console.error("An error occurred:", e);
    });

    // Function to toggle forest audio
    function toggleForestAudio() {
        if (forestAudio.paused) {
            forestAudio.play();
            toggleAudioButton.textContent = "Mute Forest Sounds";
        } else {
            forestAudio.pause();
            toggleAudioButton.textContent = "Unmute Forest Sounds";
        }
    }

    // Event listener for the audio toggle button
    toggleAudioButton.addEventListener('click', toggleForestAudio);

    // Start playing forest sounds
    forestAudio.play();
    
    // Start the VAPI call
    startCall();
});
