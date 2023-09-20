const connectButton = document.getElementById("connectButton");
const speakButton = document.getElementById("speakButton");
const textToSpeak = document.getElementById("textToSpeak");
let bluetoothDevice;
let textToSpeechCharacteristic;

connectButton.addEventListener("click", async () => {
    try {
        // Request Bluetooth device
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['your_service_uuid_here'] }], // Replace with your service UUID
        });

        // Connect to the Bluetooth device
        const server = await bluetoothDevice.gatt.connect();

        // Get the Text-to-Speech characteristic
        const service = await server.getPrimaryService('text_to_speech_service'); // Replace with your service name
        textToSpeechCharacteristic = await service.getCharacteristic('speak_text'); // Replace with your characteristic name

        speakButton.disabled = false;
        console.log("Connected to Android phone:", bluetoothDevice);
    } catch (error) {
        console.error("Error connecting to Android phone:", error);
    }
});

speakButton.addEventListener("click", async () => {
    try {
        const text = textToSpeak.value;
        if (!textToSpeechCharacteristic) {
            console.error("Android phone not connected.");
            return;
        }

        // Convert the text to bytes and send it to the Bluetooth device
        const textEncoder = new TextEncoder();
        const encodedText = textEncoder.encode(text);
        await textToSpeechCharacteristic.writeValue(encodedText);

        console.log("Text sent to Android phone:", text);
    } catch (error) {
        console.error("Error sending text to Android phone:", error);
    }
});
