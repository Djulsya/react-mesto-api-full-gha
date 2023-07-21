function PopupWithForm(props) {

  return (
    <section className={`popup popup-${props.name} ${props.popupOpen ? "popup_opened" : " "}`}>
      <div className="popup__container">
        <button className="popup__closebutton link" type="button" onClick={props.popupClose}></button>
        <h2 className="popup__title">{props.popupTitle}</h2>
        <form className={`popup__form-${props.name} popup__editprofile`} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__savebutton link" type="submit">{props.button}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm