# Realtime-Device-Tracker
Realtime Device Tracker is the project for getting the exact location based on the geolocation with marker. This project aims to enhance the backend practice and learn about socket.io and leaflet links.
"A web application that tracks the real-time location of connected devices using Geolocation API, Socket.IO, and Leaflet.js."
Realtime Device Tracker is an application that tracks the exact location of devices in real-time and displays them on a map with markers. The project is an excellent opportunity to practice backend development, learn about real-time communication with Socket.IO, and use the Leaflet library for interactive maps.

# Features
Real-time location tracking: Updates and displays the location of connected devices on a map.
User-friendly map interface: Uses Leaflet.js to provide an interactive map.
Location details: Displays the location data below the map.

# Technologies Used
## Frontend:
1. HTML
2. CSS
3. JavaScript
4. Leaflet.js
5. Socket.IO-client

## Backend:
1. Node.js
2. Express.js
3. Socket.IO-server

# Explanation of Key Files
* app.js: The main server file where the Express server and Socket.IO are configured.
* public/: Contains the static files served by the server.
* css/style.css: Contains the CSS styling for the application.
* js/script.js: Contains the client-side JavaScript for handling geolocation and updating the map.
* index.ejs: The main HTML file rendered by the server.

# How It Works
* Geolocation Tracking: When a user opens the application, their browser requests permission to access their location using the Geolocation API.
* Real-time Communication: The location data is sent to the server via Socket.IO.
* Broadcasting Location: The server receives the location data and broadcasts it to all connected clients.
* Updating Map and List: Each client updates the map with markers representing the locations of all connected users and displays the location data below the map.

# Future Enhancements
* User Authentication: Allow users to log in and save their tracking history.
* Clustering Markers: Use marker clustering to handle scenarios with a high density of users.
* Enhanced UI/UX: Improve the user interface and add more interactive features.

##
# Steps to Run this in your system
# Prerequisites
Ensure you have Node.js and npm installed on your machine.

# Installation
Clone the repository: 
git clone https://github.com/your-username/realtime-device-tracker.git
cd realtime-device-tracker

# Install dependencies: 
npm install express node socket.io 

# Run the server: 
npm start
npx nodemon app.js

# Open your browser:
Navigate to http://localhost:3000 to see the application in action.
