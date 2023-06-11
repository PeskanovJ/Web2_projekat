import React,{useState,useEffect, Fragment} from 'react'
import { v4 as uuidv4 } from 'uuid';

import classes from './NewOrders.module.css'
import Card from '../../UI/Card/Card'
import Item from '../../../Models/Item'
import ItemCard from './ItemCard'

const NewOrders = () => {
  const [orderList,SetOrderList] =useState([]);

  useEffect(() => {
     fetchData();
  }, []);

  const fetchData=()=>{
    // axios.get(process.env.REACT_APP_SERVER_URL+'items/notVerified')
    // .then(response => {
    //   if(response.data != "All users are verified"){
    //     SetUserList(response.data.map(element =>  new User(element)));
    //   }
    //   else
    //     SetUserList([])
// });
  }

  const ReloadHandler=()=>{
    fetchData();
  }

  return (
    <Fragment>
    <section className={classes.summary}>
      <h2>Buyer orders </h2>
    <section className={classes.users}>
     
        {orderList.length > 0 ? 
        (
        <Card>
          <ul>
            {orderList.map(order => <ItemCard key={uuidv4()} id={order.Id} Name = {order.Name} From = {order.From}   />)}
          </ul>
        </Card>
        )
        : 
        (
          <h2>You have no new orders</h2>
        )}
        
    </section>

    </section>
  </Fragment>
  )
}

export default NewOrders