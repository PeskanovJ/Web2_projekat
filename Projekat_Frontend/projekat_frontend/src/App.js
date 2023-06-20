import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/layout/Header";
import Cart from "./components/Cart/Cart";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from './components/auth/RegisterForm'
import CartProvider from "./Contexts/CartProvider";
import { AuthContextProvider } from "./Contexts/auth-context";
import { ItemContextProvider } from "./Contexts/item-context";
import { OrderContextProvider } from "./Contexts/order-context";
import ProfileInfo from "./components/common/ProfileInfo";
import Dashboard from "./components/Home/Dashboard";
//Buyer
import MyOrders from "./components/common/BuyerComponents/MyOrders";
// Seller
import NewItem from './components/common/SellerComponents/NewItem'
import NewOrders from './components/common/SellerComponents/NewOrders'
import OrderHistory from './components/common/SellerComponents/OrderHistory'
//Admin
import AllOrders from './components/common/AdminComponents/AllOrders'
import Verification from './components/common/AdminComponents/Verification'

function App() {
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
    <AuthContextProvider>
      <ItemContextProvider>
        <OrderContextProvider>
        <CartProvider>
      <Router>
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        {LoginIsShown && <LoginForm onClose={hideLoginFormHandler}/>}
        {RegisterIsShown && <RegisterForm onClose={hideRegisterFormHandler}/>}
        <Header onShowCart={showCartHandler}  onShowLoginForm={showLoginFormHandler} onShowRegisterForm={showRegisterFormHandler}/>
        <main>
          <Routes>
            <Route path="/" exact element={<Dashboard/>} />
            <Route path="/profile" element={<ProfileInfo />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/addNew" element={<NewItem />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/newOrders" element={<NewOrders />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/allOrders" element={<AllOrders />} />
        </Routes>
        </main>
        </Router>
          </CartProvider>
          </OrderContextProvider>
        </ItemContextProvider>
    </AuthContextProvider>
  );
}

export default App;
