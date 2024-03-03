document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '8b5b311b56110d2d188ac3fea412e5d6';
    const form = document.getElementById('City-form');
    const weatherContainer = document.getElementById('weather-info');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const locationInput = document.getElementById('City-input').value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${locationInput}`);
        }
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    function displayWeather(data) {
      weatherContainer.innerHTML = '';
  
      const weatherInfo = document.createElement('div');
      weatherInfo.classList.add('weather-info');
  
      const temperature = data.main.temp;
      const cityName = data.name;
      const weatherDescription = data.weather[0].description.toLowerCase();
      const iconUrl = getWeatherIcon(weatherDescription);
  
      weatherInfo.innerHTML = `
        <h3>Weather in ${cityName}</h3>
        <p>Temperature: ${temperature}°C</p>
        <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
      `;
  
      weatherContainer.appendChild(weatherInfo);
    }
  
    function getWeatherIcon(weatherDescription) {
      const lowercaseWeatherDescription = weatherDescription.toLowerCase();
      
      if (lowercaseWeatherDescription.includes('scattered clouds')) {
        return 'Scattered clouds.jpg'; 
      } else if (lowercaseWeatherDescription.includes('rain')) {
        return 'rain.jpg'; 
      } else if (lowercaseWeatherDescription.includes('clear')) {
        return 'clear sky.png'; 
      } else if (lowercaseWeatherDescription.includes('thunderstorm')) {
        return 'Thunderstorms.jpg'; 
      } else {
        return 'default weather icon.png'; 
      }
    }
});

