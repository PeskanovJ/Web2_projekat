import React, { useContext } from "react";

import classes from "./OrderCard.module.css";

const OrderCard = (props) => {
    console.log(props)
  return (
    <li className={classes.user}>
      <div>
        <h3>Order Id: {props.id}</h3>
        {props.Buyer && (<h3>Buyer: {props.Buyer}</h3>)}
        <div className={classes.description}>
          {props.Items.map(element => <p>Item name:{element.item.name} Ordered amount: {element.amount} Price: {element.item.price}$</p>)}
        </div>
      </div>
    </li>
  )
}

export default OrderCard