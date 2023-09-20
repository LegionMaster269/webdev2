// DOM Elements
const connectButton = document.getElementById("connectButton");
const speakButton = document.getElementById("speakButton");
const textToSpeak = document.getElementById("textToSpeak");

let bluetoothDevice;
let textToSpeechSynthesizer;

// Event listener for the "Connect to Bluetooth Device" button
connectButton.addEventListener("click", async () => {
  try {
    // Request Bluetooth device
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }],
    });

    // Connect to the Bluetooth device
    await bluetoothDevice.gatt.connect();

    // Get the Text-to-Speech service
    const service = await bluetoothDevice.gatt.getPrimaryService('text_to_speech_service');

    // Get the Text-to-Speech characteristic
    textToSpeechSynthesizer = await service.getCharacteristic('speak_text');

    console.log("Connected to Bluetooth device:", bluetoothDevice);
  } catch (error) {
    console.error("Error connecting to Bluetooth device:", error);
  }
});

// Event listener for the "Speak" button
speakButton.addEventListener("click", async () => {
  try {
    const text = textToSpeak.value;
    if (!textToSpeechSynthesizer) {
      console.error("Bluetooth device not connected.");
      return;
    }

    // Convert the text to bytes and send it to the Bluetooth device
    const textEncoder = new TextEncoder();
    const encodedText = textEncoder.encode(text);
    await textToSpeechSynthesizer.writeValue(encodedText);

    console.log("Text sent to Bluetooth device:", text);
  } catch (error) {
    console.error("Error sending text to Bluetooth device:", error);
  }
});
