import React, { useContext } from "react";
import axios from 'axios'

import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../Contexts/cart-context";
import CartItem from "./CartItem";
import Order from "../../Models/Order";
import AuthContext from '../../Contexts/auth-context'

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({...item,amount:1});
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  const OrderHandler = async()=>{
    const order = new Order(authCtx.user.Id)
    ctx.items.forEach((item) => {
      order.addOrderItem(item.id, item.amount);
    });

    try{
      const response = await axios.post(process.env.REACT_APP_SERVER_URL+'orders/newOrder', order,{
        headers: {
          Authorization: `Bearer ${authCtx.user.Token}`
        }
      });

      if(response.data)
        console.log(response.data)

      ctx.emptyCart();
      props.onClose();
    }
    catch (error){
      console.error(error);
    }

  }

  return (
    <Modal onClose={props.onClose}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button onClick={OrderHandler} className={classes.button}>Order</button>}
    </div>
  </Modal>
  );
};

export default Cart;
