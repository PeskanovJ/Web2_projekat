import React, { Fragment,useEffect,useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import classes from './Verification.module.css'
import User from '../../../Models/User'
import Card from '../../UI/Card/Card'
import UserCard from './UserCard'

const Verification = () => {
  const [userList,SetUserList] =useState([]);

  useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER_URL+'users/notVerified')
      .then(response => {
        if(response.data != null){
          SetUserList(response.data.map(element =>  new User(element)));
        }
  });
  }, []);


  return (
    <Fragment>
      <section className={classes.summary}>
        <h2>Requested user profiles</h2>
  
      <section className={classes.users}>
        <Card>
          <ul>{userList.map(user => <UserCard key={uuidv4()} id={user.UserName} FirstName = {user.FirstName} LastName = {user.LastName}  Email = {user.Email} Address = {user.Address} BirthDate= {user.BirthDate} ImageUrl = {user.ImageUrl}/>)}</ul>
        </Card>
      </section>
  
      </section>
    </Fragment>
  )
}

export default Verification