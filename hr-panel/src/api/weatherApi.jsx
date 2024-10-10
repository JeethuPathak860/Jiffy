// src/api/weatherApi.js
export const getWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=YOUR_API_KEY`);
    const data = await response.json();
    return {
      weather: data.weather[0].main,
    };
  };
  