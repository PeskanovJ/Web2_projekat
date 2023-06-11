import React,{useState,useEffect, Fragment} from 'react'
import { v4 as uuidv4 } from 'uuid';

import classes from './MyItems.module.css'
import Card from '../../UI/Card/Card'
import Item from '../../../Models/Item'
import ItemCard from './ItemCard'

const MyItems = () => {
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
      <h2>My items on the market</h2>

    <section className={classes.users}>
     
        {itemList.length > 0 ? 
        (
        <Card>
          <ul>
            {itemList.map(item => <ItemCard key={uuidv4()} id={item.Name} Name = {item.Name} Description = {item.Description}  Price = {item.Price} Amount = {item.Amount} ImageUrl = {item.Image} />)}
          </ul>
        </Card>
        )
        : 
        (
          <h2>You have no items on the market</h2>
        )}
        
    </section>

    </section>
  </Fragment>
  )
}

export default MyItems