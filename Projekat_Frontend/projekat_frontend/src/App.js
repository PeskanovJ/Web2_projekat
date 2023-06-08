import { useState,useContext } from "react";

import Header from "./components/layout/Header";
import Cart from "./components/Cart/Cart";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from './components/auth/RegisterForm'
import AuthContext from './Contexts/auth-context';
import CartProvider from "./Contexts/CartProvider";

function App() {
  const ctx= useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [LoginIsShown, setLoginIsShown] = useState(false);
  const [RegisterIsShown, setRegisterIsShown] = useState(false);

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
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      {LoginIsShown && <LoginForm onClose={hideLoginFormHandler}/>}
      {RegisterIsShown && <RegisterForm onClose={hideRegisterFormHandler}/>}
      <Header onShowCart={showCartHandler}  onShowLoginForm={showLoginFormHandler} onShowRegisterForm={showRegisterFormHandler}/>
      <main>
       
      </main>
   </CartProvider>
  );
}

export default App;
