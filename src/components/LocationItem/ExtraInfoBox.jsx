import React from 'react';


const ExtraInfoBox = (props) => {

  return (
    <div className="extra-info-box__wrapper">
      <span className="extra-info-box__title">{props.title}</span>
      <span className="extra-info-box__data">{props.data}</span>
    </div>
  )
}

export default ExtraInfoBox;