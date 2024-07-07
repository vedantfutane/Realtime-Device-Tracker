const socket = io();

let currentLocation = null;

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            currentLocation = { latitude, longitude };
            console.log(`Sending location: ${latitude}, ${longitude}`);
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Realtime Device Tracker by VEdA'
}).addTo(map);

const markers = {};
const markerClusterGroup = L.markerClusterGroup();
map.addLayer(markerClusterGroup);

// Function to add slight offsets
const addOffset = (latitude, longitude) => {
    const offset = 0.00001; // Reduce the offset value to minimize inaccuracy
    const randomOffsetLat = (Math.random() - 0.5) * offset;
    const randomOffsetLng = (Math.random() - 0.5) * offset;
    return [latitude + randomOffsetLat, longitude + randomOffsetLng];
};

// Function to calculate the distance using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
};

// Function to update location list
const updateLocationList = (id, latitude, longitude, distance = null) => {
    const locationList = document.getElementById('location-list');
    let locationItem = document.getElementById(`location-${id}`);
    if (!locationItem) {
        locationItem = document.createElement('li');
        locationItem.id = `location-${id}`;
        locationList.appendChild(locationItem);
    }
    locationItem.textContent = `ID: ${id}, Latitude: ${latitude}, Longitude: ${longitude}${distance !== null ? `, Distance: ${distance.toFixed(2)} meters` : ''}`;
};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    console.log(`Received location for ${id}: ${latitude}, ${longitude}`);
    map.setView([latitude, longitude]);
    const [newLat, newLng] = addOffset(latitude, longitude);
    if (markers[id]) {
        markers[id].setLatLng([newLat, newLng]);
    } else {
        markers[id] = L.marker([newLat, newLng]).addTo(markerClusterGroup);
    }
    updateLocationList(id, latitude, longitude);
});

socket.on("user-disconnected", (id) => {
    console.log(`User disconnected: ${id}`);
    if (markers[id]) {
        markerClusterGroup.removeLayer(markers[id]);
        delete markers[id];
    }
    const locationItem = document.getElementById(`location-${id}`);
    if (locationItem) {
        locationItem.remove();
    }
});

// Function to handle manual addition of location
let manualMarker = null;

map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    const userConfirmed = window.confirm(`Do you want to add a marker at Latitude: ${lat}, Longitude: ${lng}?`);
    if (userConfirmed) {
        if (manualMarker) {
            map.removeLayer(manualMarker);
        }
        manualMarker = L.marker([lat, lng]).addTo(map);
        const distance = currentLocation ? calculateDistance(currentLocation.latitude, currentLocation.longitude, lat, lng) : null;
        updateLocationList('manual', lat, lng, distance);
    }
});
