import React, { Fragment } from 'react'
import {useNavigate} from 'react-router-dom'

import classes from './NewItem.module.css'
import Button from '../../UI/Button/Button'

const NewItem = () => {
  const navigate = useNavigate();

  const submitHandler=(event)=>{
    event.preventDefault();

    navigate('/myItems');

  }


  return (
    <Fragment>
      <section className={classes.newItem}>
        <h2>Add new item</h2>
        <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Name:</label>
          <input type='text' ></input>
        </div>
        <div className={classes.control}>
          <label>Description:</label>
          <input type='text' ></input>
        </div>
        <div className={classes.control}>
          <label>Price:</label>
          <input type='number'/>
        </div>
        <div className={classes.control}>
          <label>Amount:</label>
          <input type='number' />
        </div>
        <div className={classes.control}>
          <label>Upload picture:</label>
          <input type='file' />
        </div>
        <div className={classes.control}>
          <Button type="submit">Add</Button>
        </div>
        </form>
      </section>
    </Fragment>
  )
}

export default NewItem