function ImagePopup(props) {

  return (
    <section className={`popup popup-openphoto ${props.card.link ? "popup_opened" : " "}`}>
      <div className="popup__container-openphoto">
        <button className="popup__closebutton link" type="button" onClick={props.popupClose}></button>
        <img className="popup__photo-openphoto" src={props.card.link} alt={props.card.name} />
        <p className="popup__photo-info">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup