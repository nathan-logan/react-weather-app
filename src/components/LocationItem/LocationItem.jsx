import React, { useState } from 'react';
import ExtraInfoBox from './ExtraInfoBox';

import './location-item.css';

const LocationItem = (props) => {

  const [visible, setVisible] = useState(false);

  return (
    <div
      className="location-item__wrapper"
      onMouseEnter={() => { setVisible(true) }}
      onMouseLeave={() => { setVisible(false) }}
    >
      <div className="location-item">
        <span className="location-item__city">{props.data.city}, {props.data.country} {props.data.currentLocation ? "(current location)" : ""}</span>
        <div className="location-item__temp"><span>{props.data.temp}°C</span><span className="location-item__temp__feels-like">Feels like {props.data.temp_feels_like}°C</span></div>
        {!props.data.currentLocation && <span className="location-item__remove" onClick={() => props.removeLocation(props.data)}>Remove</span>}
      </div>
      <div
        className="location-item__extra-info__wrapper"
        style={{
          height: visible ? "75px" : "0",
          opacity: visible ? "1" : "0",
          transition: "all 0.3s ease-in-out"
        }}
      >
        <ExtraInfoBox
          title="Condition"
          data={props.data.condition.text}
        />
        <ExtraInfoBox
          title="Wind"
          data={props.data.wind_kph}
        />
        <ExtraInfoBox
          title="Wind direction"
          data={props.data.wind_dir}
        />
      </div>
    </div>
  )
}

export default LocationItem;