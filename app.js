// app.js

// Check if browser supports geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByGeolocation);
} else {
    console.log('Geolocation is not supported by this browser.');
}

// OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Fetch weather data by city name
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.log('Error fetching weather data:', error));
}

// Fetch weather data by geolocation
function getWeatherByGeolocation(position) {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.log('Error fetching weather data:', error));
}

// Display weather data
function displayWeather(data) {
    if (data.cod === 200) {
        const weatherInfo = `City: ${data.name}\nTemperature: ${data.main.temp}°C\nWeather: ${data.weather[0].description}`;
        console.log(weatherInfo);
        // Update your HTML with weatherInfo as needed
    } else {
        console.log('City not found');
    }
}

// Event listener for search functionality
document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

