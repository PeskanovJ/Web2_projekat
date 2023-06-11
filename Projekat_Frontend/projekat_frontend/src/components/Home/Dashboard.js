import React, { Fragment, useEffect,useState } from 'react'
import axios from 'axios'

import classes from './Dashboard.module.css'

import DashboardItem from './DashBoardItem'
import Item from '../../Models/Item'
import Card from '../UI/Card/Card'

const Dashboard = () => {
  const [itemList,SetItemList] =useState([]);

  const fetchItems=()=>
  {
    axios.get(process.env.REACT_APP_SERVER_URL+'items/allItems')
    .then(response => 
    {
      if(response.data != "All users are verified"){
        console.log(response.data)
        SetItemList(response.data.map(element =>  new Item(element)));
      }
      else
      SetItemList([])

      console.log(itemList)
     });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Fragment>
         <section className={classes.summary}>
            <h2>All items</h2>
            {itemList.length > 0 ? 
            (
              <Card>
                <section className={classes.items}>
                <ul>{itemList.map((item) => <DashboardItem key={item.Id} id={item.Id} name={item.Name} description={item.Description} price={item.Price} amount={item.Amount}/>)}</ul>
                </section>
              </Card>
            ): 
            (
              <h2>No items on the market</h2>
            )}
        </section>
    </Fragment>
  )
}

export default Dashboard