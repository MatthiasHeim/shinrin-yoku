// Function to load the Vapi SDK
function loadVapiSDK() {
    return new Promise((resolve, reject) => {
        if (typeof Vapi !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@vapi-ai/web@1.0.0/dist/vapi.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Vapi SDK'));
        document.body.appendChild(script);
    });
}

// Function to initialize Vapi and start the experience
function initVapi() {
    const vapi = new Vapi("b1bdc903-982d-4845-b770-4e5334614c88");

    const forestAudio = document.getElementById('forestAudio');
    const toggleAudioButton = document.getElementById('toggleAudio');

    function startCall() {
        try {
            vapi.start("17800062-cdea-41c1-a0f9-848e53ac8288");
        } catch (error) {
            console.error('Failed to start Vapi call:', error);
        }
    }

    vapi.on("call-start", () => {
        console.log("Call has started.");
    });

    vapi.on("call-end", () => {
        console.log("Call has ended.");
    });

    vapi.on("speech-start", () => {
        console.log("Assistant speech has started.");
        forestAudio.volume = 0.3;
    });

    vapi.on("speech-end", () => {
        console.log("Assistant speech has ended.");
        forestAudio.volume = 1;
    });

    vapi.on("volume-level", (volume) => {
        console.log(`Assistant volume level: ${volume}`);
    });

    vapi.on("message", (message) => {
        console.log("Received message:", message);
    });

    vapi.on("error", (e) => {
        console.error("Vapi error occurred:", e);
    });

    function toggleForestAudio() {
        if (forestAudio.paused) {
            forestAudio.play().catch(error => console.error('Failed to play audio:', error));
            toggleAudioButton.textContent = "Mute Forest Sounds";
        } else {
            forestAudio.pause();
            toggleAudioButton.textContent = "Unmute Forest Sounds";
        }
    }

    toggleAudioButton.addEventListener('click', toggleForestAudio);

    forestAudio.play().catch(error => console.error('Failed to play audio:', error));
    startCall();
}

// Load Vapi SDK and initialize when the page is loaded
window.addEventListener('load', () => {
    loadVapiSDK()
        .then(() => {
            console.log('Vapi SDK loaded successfully');
            initVapi();
        })
        .catch((error) => {
            console.error('Failed to load Vapi SDK:', error);
        });
});
