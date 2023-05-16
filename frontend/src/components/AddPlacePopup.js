import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  function handleChangeName(e) {
    props.setImgName(e.target.value);
  }
  function handleChangeImage(e) {
    props.setImageUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: props.imgName,
      link: props.imageUrl,
    })
  }

  return (
    <PopupWithForm name="mesto" headerName="Новое место" btnName="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} children>
      <input value={props.imgName} onChange={handleChangeName} type="text" className="popup__input popup__input_type_name" name="name" minLength="2" maxLength="40" placeholder="Название"
        required id="inputPlace-name" />
      <span className="error inputPlace-name-error"></span>

      <input value={props.imageUrl} onChange={handleChangeImage} type="url" className="popup__input popup__input_type_card-src" name="link" placeholder="Ссылка на картинку"
        required id="input-link" />
      <span className="error input-link-error"></span>
    </PopupWithForm>
  )

}

export default AddPlacePopup;