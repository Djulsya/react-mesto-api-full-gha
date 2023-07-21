import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarEdit = React.useRef();
  
  React.useEffect(() => {
    avatarEdit.current.value = '';
  }, [props.popupOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarEdit.current.value,
    })
  }

  return (
    <PopupWithForm
      name="editavatar"
      popupTitle="Обновить"
      button="Сохранить"
      popupOpen={props.popupOpen}
      popupClose={props.popupClose}
      onSubmit={handleSubmit}>
      <input className="popup__input popup__input-editavatar popup__input_type_avatar" ref={avatarEdit}
        id="photourl-input-avatar" type="url" name="link" placeholder="Ссылка на картинку аватара" required />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup