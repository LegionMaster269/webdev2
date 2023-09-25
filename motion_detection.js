<!DOCTYPE html>
<html>
<head>
    <title>Motion Detection</title>
    <style>
        /* Add CSS styles for the elements here */
    </style>
</head>
<body>
    <div id="cameraView"></div>
    <div id="logs"></div>
    <input type="range" id="sensitivity" value="50" min="0" max="100">
    <select id="mosaic">
        <option value="3x2">3x2</option>
        <option value="3x3">3x3</option>
        <option value="5x5">5x5</option>
        <option value="10x10">10x10</option>
    </select>

    <script>
        // Define variables
        let sensitivity = 50; // percent
        let minPeriod = 500; // milliseconds
        let mosaic = "3x3";

        // Function to start motion detection
        function startDetection() {
            log("Ready");
            setTimeout(() => {
                // Simulate motion detection by logging a message
                onMotion([0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }, 1000);
        }

        // Function called when motion is detected
        // (data contains an array of detection strength values corresponding to each mosaic tile)
        function onMotion(data) {
            // Show info in the logs
            log(data);

            // Simulate snapping a photo by logging a message
            snap();
        }

        // Function to log messages
        function log(message) {
            const logs = document.getElementById('logs');
            logs.innerHTML += message + "<br>";
        }

        // Function to simulate snapping a photo
        function snap() {
            // Simulate taking a picture and storing it
            const count = 1; // You can replace this with actual logic to track picture count
            const file = `Snap${count}.jpg`;
            log(`Saved picture to ${file}`);
        }

        // Start motion detection when the page loads
        startDetection();
    </script>
</body>
</html>
