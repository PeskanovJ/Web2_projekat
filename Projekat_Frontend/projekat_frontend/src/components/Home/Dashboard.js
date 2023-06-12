import React, { Fragment, useEffect,useState,useContext } from 'react'

import classes from './Dashboard.module.css'

import DashboardItem from './DashBoardItem'
import Card from '../UI/Card/Card'
import ItemContext from '../../Contexts/item-context'

const Dashboard = () => {
  const ctx = useContext(ItemContext)

  useEffect(() => {
    ctx.onFetch()
  }, []);

  return (
    <Fragment>
         <section className={classes.summary}>
            <h2>All items</h2>
            {ctx.items.length > 0 ? 
            (
              <Card>
                <section className={classes.items}>
                <ul>{ctx.items.map((item) => <DashboardItem key={item.Id} id={item.Id} name={item.Name} description={item.Description} price={item.Price} amount={item.Amount}/>)}</ul>
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