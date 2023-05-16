import React from "react";
import '../components/styles/InfoTooltip.css'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
        <div className={`infoTooltip__img${props.success}`}></div>
        <p className="infoTooltip__text">{props.text}</p>
      </div>
    </div>
  );
}
export default InfoTooltip;