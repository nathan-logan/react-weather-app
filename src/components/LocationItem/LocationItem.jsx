import React from 'react';

import './location-item.css';

const LocationItem = (props) => {
  return (
    <div className="location-item">
      <span className="location-item__city">{props.data.city}, {props.data.country} {props.data.currentLocation ? "(current location)" : ""}</span>
      <div className="location-item__temp"><span>{props.data.temp}°C</span><span className="location-item__temp__feels-like">Feels like {props.data.temp_feels_like}°C</span></div>
      {!props.data.currentLocation && <span className="location-item__remove" onClick={() => props.removeLocation(props.data)}>Remove</span>}
    </div>
  )
}

export default LocationItem;