import React, { useEffect, useState } from 'react';
import ls from 'local-storage';
import { getLocationFromCoords, getWeatherForCity } from '../api';
import { appendToLocationStore, loadLocationStore, removeFromLocationStore } from '../util';

// components
import CitySearch from './CitySearch/CitySearch';
import CurrentWeather from './CurrentLocations';

const App = () => {

  const [currentLocation, setCurrentLocation] = useState({
    city: 'Surfers Paradise',
    state: 'Queensland',
    country: 'Australia'
  });
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const locations = loadLocationStore();
    setSelectedLocations(locations);
    if("geolocation" in navigator) {
      // browser geolocation is available
      navigator.geolocation.getCurrentPosition(pos => {
        const {latitude, longitude} = pos.coords;
        // converts lat long coordinates to an actual location
        getLocationFromCoords(latitude, longitude).then(data => {
          // fetches the weather data for the city
          getWeatherForCity(data.city).then(data => {
            setCurrentLocation({
              city: data.city,
              country: data.country,
              state: data.state,
            })
            data.currentLocation = true;
            // add it to our saved locations
            handleLocationAdd(data);
          }).catch(err => setError(err));
        }).catch(err => setError(err));
      }, err => setError(err));
    } else {
      // browser geolocation is blocked by user
      return;
    }
  }, []);

  // adds an item the saved location list
  const handleLocationAdd = weatherData => {
    if(selectedLocations.find(x => x.city === weatherData.city && x.country === weatherData.country)) {
      setError(new Error("City already exists in list"));
      return;
    }
    // if current location, unshift it
    // not 100% necessary, just looks nicer
    setSelectedLocations(w => !currentLocation ? [...w, weatherData] : [weatherData, ...w]);
    // update the localstorage unless it's the browser's current location
    // because we load that regardless
    if(!weatherData.currentLocation) appendToLocationStore(weatherData);
  }

  // removes the specified item from the saved location list
  const handleLocationRemove = weatherData => {
    selectedLocations.splice(selectedLocations.indexOf(weatherData),1)
    setSelectedLocations([...selectedLocations]);
    // update the localstorage unless it's the current location
    if(!weatherData.currentLocation) removeFromLocationStore(weatherData);
  }

  return (
    <div className="app_container">
      You're currently in {currentLocation.city}, {currentLocation.state}, {currentLocation.country}
      <CitySearch
        currentLocation={currentLocation}
        addLocation={handleLocationAdd}
        throwError={err => setError(err)}
        resetError={() => setError(null)}
        error={error}
      />
      <CurrentWeather
        selectedLocations={selectedLocations}
        removeLocation={handleLocationRemove}
      />
    </div>
  );
}

export default App;
