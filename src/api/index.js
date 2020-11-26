import { convertKelvinToCelcius } from "../util";

const WEATHER_API_BASE_URL = "http://api.weatherapi.com/v1";
const LOCATION_API_BASE_URL = "https://us1.locationiq.com/v1";

export const apiCall = url => {
  return fetch(url).then(res => {
    if (res.status >= 400) {
      return Promise.reject('Response is invalid');
    }
    return res.json();
  }).then(json => json);
}

export const getWeatherForCity = city => {
  return apiCall(`${WEATHER_API_BASE_URL}/current.json?q=${city.trim()}&key=${process.env.REACT_APP_WEATHER_API_KEY}`).then(data => {
    return {
      city: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      temp_feels_like: data.current.feelslike_c,
      humidity: data.current.humidity,
      last_updated: data.current.last_updated,
      condition: data.current.condition,
      wind_kph: data.current.wind_kph,
      wind_dir: data.current.wind_dir,
    }
  });
}

export const getLocationFromCoords = (lat, lon) => {

  return apiCall(`${LOCATION_API_BASE_URL}/reverse.php?key=${process.env.REACT_APP_LOCATION_ACCESS_TOKEN}&lat=${lat}&lon=${lon}&format=json`).then(data => {
    return {
      city: data.address.city,
      country: data.address.country,
      state: data.address.state,
    }
  });
}
