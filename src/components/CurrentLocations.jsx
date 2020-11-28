import React from 'react';
import LocationItem from './LocationItem/LocationItem';

const CurrentLocations = (props) => {
  return (
    <div style={{ marginTop: "32px" }}>
      <h3>Your cities</h3>
      <hr style={{ borderColor: "#6299bd" }} />
      {props.selectedLocations && props.selectedLocations.map((data, key) => <LocationItem
        key={key}
        data={data}
        removeLocation={props.removeLocation}
      />)}
    </div>
  )
}

export default CurrentLocations;