import React, { Fragment,useState,useContext } from 'react'
import axios from 'axios'

import classes from './MyOrders.module.css'

import AuthContext from '../../../Contexts/auth-context'
import Order from '../../../Models/Order'
import Card from '../../UI/Card/Card'

const MyOrders = () => {
  const [orderList,SetOrderList] =useState([]);
  const ctx = useContext(AuthContext);

  const fetchData=()=>{
    axios.get(process.env.REACT_APP_SERVER_URL+'items/myOrders',  {
      headers: {
        Authorization: `Bearer ${ctx.user.Token}`
      }
    })
    .then(response => {
      if(response.data != "All users are verified"){
        SetOrderList(response.data.map(element =>  new Order(element)));
      }
      else
        SetOrderList([])
    });
  }

  return (
    <Fragment>
    <section className={classes.summary}>
      <h2>My orders</h2>

    <section className={classes.users}>
     
        {orderList.length > 0 ? 
        (
        <Card>
          <ul>
           {/* {orderList.map(user => <OrderCard key={uuidv4()} id={user.UserName} FirstName = {user.FirstName} LastName = {user.LastName}  Email = {user.Email} Address = {user.Address} BirthDate= {user.BirthDate} ImageUrl = {user.ImageUrl} onVerify={ReloadHandler} />)} */}
          </ul>
        </Card>
        )
        : 
        (
          <h2>You never ordered anything</h2>
        )}
        
    </section>

    </section>
  </Fragment>
  )
}

export default MyOrders