// Initialize VAPI with your public key
const vapi = new Vapi("b1bdc903-982d-4845-b770-4e5334614c88");

// Event listeners for VAPI
vapi.on("call-start", () => {
    console.log("Call has started.");
});

vapi.on("call-end", () => {
    console.log("Call has ended.");
});

vapi.on("speech-start", () => {
    console.log("Assistant speech has started.");
});

vapi.on("speech-end", () => {
    console.log("Assistant speech has ended.");
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

// Function to start the call
function startCall() {
    vapi.start("17800062-cdea-41c1-a0f9-848e53ac8288");
}

// Function to stop the call
function stopCall() {
    vapi.stop();
}

// Function to mute/unmute
function toggleMute() {
    const currentlyMuted = vapi.isMuted();
    vapi.setMuted(!currentlyMuted);
    console.log("Mute toggled. Currently muted:", !currentlyMuted);
}

// Event listeners for buttons
document.getElementById('startCall').addEventListener('click', startCall);
document.getElementById('stopCall').addEventListener('click', stopCall);
document.getElementById('toggleMute').addEventListener('click', toggleMute);
