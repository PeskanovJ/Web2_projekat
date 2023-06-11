import React, { Fragment } from 'react'

import classes from './NewItem.module.css'
import Input from '../../UI/Input/Input'

const NewItem = () => {
  return (
    <Fragment>
      <section className={classes.newItem}>
        <h2>Add new item</h2>
        <div className={classes.control}>
          <label>Name:</label>
          <input type='text' ></input>
        </div>
      </section>
    </Fragment>
  )
}

export default NewItem