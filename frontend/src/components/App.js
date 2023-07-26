/* eslint-disable no-undef */
import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import authorization from '../utils/Autharization.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);
  const [elements, setElements] = React.useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [headerEmail, setEmail] = React.useState("");
  const [isTooltipPopupOpen, setToolTipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setToolTipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newElement) => {
        setElements((elements) => elements.map((c) =>
          (c._id === card._id ? newElement : c)))
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setElements((setDelete) => setDelete.filter((c) =>
          c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(avatarEdit) {
    api.updateUserAvatar(avatarEdit)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleUpdateUser(userData) {
    api.updateUserInfo(userData)
      .then((userDataBase) => {
        setCurrentUser(userDataBase)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  };

  function handleAddPlaceSubmit(card) {
    api.createCard(card)
      .then((newElement) => {
        setElements([newElement, ...elements]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleSingOut() {
    authorization
      .logout()
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
    setIsLoggedIn(false);
    navigate("/sign-in");
    setEmail("");
  }

  function handleLoginSubmit(email, password) {
    authorization
      .login(email, password)
      .then((res) => {
        // localStorage.setItem("jwt", res.token)
        setEmail(res.email)
        setIsLoggedIn(true)
        navigate("/")
        setIsSuccess(true)
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        setToolTipPopupOpen(true)
        setIsSuccess(false)
      })
  }

  function handleRegisterSubmit(email, password) {
    authorization
      .register(email, password)
      .then(() => {
        setToolTipPopupOpen(true)
        setIsSuccess(true)
        navigate("/sign-in")
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        setToolTipPopupOpen(true)
        setIsSuccess(false)
      })
  }

  React.useEffect(() => {
    authorization
      .checkToken()
      .then((res) => {
        if (res.email) {
          setIsLoggedIn(true)
          setEmail(res.email)
          navigate("/")
          setCurrentUser(res)
        } else {
          setEmail("")
          setIsLoggedIn(false)
          navigate("/sign-in")
          setCurrentUser(defaultCurrentUser)
        }
      })
      .catch((err) => {
        setEmail("");
        setIsLoggedIn(false)
        navigate("/sign-in")
        setCurrentUser(defaultCurrentUser)
        console.log(`Произошла ошибка: ${err}`)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((elements) => {
          setElements(elements.reverse());
        })
        .catch((err) => {
          setElements([])
          console.log(`Произошла ошибка: ${err}`)
        })
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header
          email={headerEmail}
          signOut={handleSingOut}
          isLoggedIn={isLoggedIn}
        />

        <Routes>
          <Route element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<Login onLogin={handleLoginSubmit} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegisterSubmit} />} />
          <Route path="/" element={<Main
            elements={elements}
            editProfile={handleEditProfileClick}
            editAvatar={handleEditAvatarClick}
            addCard={handleAddPlaceClick}
            openPhoto={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onAddPlace={handleAddPlaceClick} />} />
          <Route element={<ProtectedRoute
            isLoggedIn={isLoggedIn} />} />
        </Routes>

        <EditProfilePopup
          popupOpen={isEditProfilePopupOpen}
          popupClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          popupOpen={isEditAvatarPopupOpen}
          popupClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          popupOpen={isAddPlacePopupOpen}
          popupClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* <PopupWithForm
          name="deletephoto"
          popupTitle="Вы уверены?"
          button="Да" /> */}

        <InfoTooltip
          popupOpen={isTooltipPopupOpen}
          popupClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <ImagePopup
          card={selectedCard}
          popupClose={closeAllPopups}
        />

        <Footer />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App