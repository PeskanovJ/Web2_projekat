import React,{useContext} from 'react'

import classes from './DashboardItem.module.css'

import Button from '../UI/Button/Button'
import AuthContext from '../../Contexts/auth-context'

const DashBoardItem = (props) => {
  const ctx=useContext(AuthContext)
  return (
    <li className={classes.item}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}$</div>
      </div>
      <div>
        {ctx.user.Role==1 && (<Button>Add to Cart</Button>)}
        <div className={classes.amount}>Items remaining : {props.amount}</div>
      </div>
    </li>
  )
}

export default DashBoardItem