import React,{useState,useEffect, Fragment} from 'react'
import { v4 as uuidv4 } from 'uuid';

import classes from './OrderHistory.module.css'

import Card from '../../UI/Card/Card'
import Item from '../../../Models/Item'
import OrderCard from './OrderCard'

const OrderHistory = () => {
  const [itemList,SetItemList] =useState([]);

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
      <h2>My previous orders</h2>

    <section className={classes.users}>
     
        {itemList.length > 0 ? 
        (
        <Card>
          <ul>
            {itemList.map(item => <OrderCard/>)}
          </ul>
        </Card>
        )
        : 
        (
          <h2>You have no previous orders</h2>
        )}
        
    </section>

    </section>
  </Fragment>
  )
}

export default OrderHistory