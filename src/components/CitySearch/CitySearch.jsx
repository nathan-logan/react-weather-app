import React, { useState } from 'react';
import { getWeatherForCity } from '../../api';
import './city-search.css';

const CitySearch = (props) => {

  const [values, setValues] = useState({
    city_query: ''
  });

  const handleChange = (e) => {
    // reset the UI error
    props.resetError();
    setValues({
      [e.target.id]: e.target.value
    });
  }

  const handleCitySearch = (e) => {
    e.preventDefault();
    // fetch data from the weather api and apply it to the state
    getWeatherForCity(values.city_query).then(data => {
      // reset the search box
      setValues({
        city_query: ''
      });
      // add the location to the list
      props.addLocation(data);
    }).catch(err => props.throwError(err));
  }

  return (
    <div className="city-search__wrapper">
      <h2>Please enter a city</h2>
      <form
        className="city-search__form"
        onSubmit={handleCitySearch}
      >
        <div>
          <input
            type="text"
            name="city_query"
            id="city_query"
            placeholder="City"
            value={values.city_query}
            onChange={handleChange}
          />
          <button type="submit">+ Add city</button>
        </div>
        {props.error && <span className="city-search__error">{props.error.message}</span>}
      </form>
    </div>
  )
}

export default CitySearch;