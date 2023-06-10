import { useState } from "react";

import Header from "./components/layout/Header";
import Cart from "./components/Cart/Cart";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from './components/auth/RegisterForm'
import CartProvider from "./Contexts/CartProvider";
import { AuthContextProvider } from "./Contexts/auth-context";
import ProfileInfo from "./components/common/ProfileInfo";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [LoginIsShown, setLoginIsShown] = useState(false);
  const [RegisterIsShown, setRegisterIsShown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const showProfileHandler = () => {
    setShowProfile(true);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showLoginFormHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginFormHandler = () => {
    setLoginIsShown(false);
  };

  const showRegisterFormHandler = () => {
    setRegisterIsShown(true);
  };

  const hideRegisterFormHandler = () => {
    setRegisterIsShown(false);
  };

  return (
    <CartProvider >
      <AuthContextProvider>
        <div>
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        {LoginIsShown && <LoginForm onClose={hideLoginFormHandler}/>}
        {RegisterIsShown && <RegisterForm onClose={hideRegisterFormHandler}/>}
        <Header onShowProfile={showProfileHandler} onShowCart={showCartHandler}  onShowLoginForm={showLoginFormHandler} onShowRegisterForm={showRegisterFormHandler}/>
        <main >
          {showProfile && <ProfileInfo />}
        </main>
        </div>
    </AuthContextProvider>
   </CartProvider>
  );
}

export default App;
