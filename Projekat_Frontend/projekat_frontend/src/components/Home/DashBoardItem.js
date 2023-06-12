import React,{useContext} from 'react'

import classes from './DashboardItem.module.css'

import AuthContext from '../../Contexts/auth-context'
import CartContext from '../../Contexts/cart-context'
import AddItemForm from '../common/BuyerComponents/AddItemForm'

const DashBoardItem = (props) => {
  const ctx=useContext(AuthContext)
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };


  return (
    <li className={classes.item}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}$</div>
      </div>
      <div>
        {ctx.user.Role==1 && (<AddItemForm onAddToCart={addToCartHandler}>Add to Cart</AddItemForm>)}
        <div className={classes.amount}>Items remaining : {props.amount}</div>
      </div>
    </li>
  )
}

export default DashBoardItem