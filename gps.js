// Check if the Geolocation API is available in the browser
if ("geolocation" in navigator) {
  // Geolocation is available
  navigator.geolocation.getCurrentPosition(function(position) {
    // Get the user's latitude and longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Use the coordinates as needed
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }, function(error) {
    // Handle errors
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
  });
} else {
  // Geolocation is not available in this browser
  console.error("Geolocation is not supported in this browser.");
}
