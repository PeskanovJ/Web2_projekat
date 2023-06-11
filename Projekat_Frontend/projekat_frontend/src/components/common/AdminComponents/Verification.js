import React, { Fragment,useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import classes from './Verification.module.css'
import User from '../../../Models/User'
import Card from '../../UI/Card/Card'
import UserCard from './UserCard'
import AuthContext from '../../../Contexts/auth-context'

const Verification = () => {
  const [userList,SetUserList] =useState([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
     fetchData();
  }, []);

  const fetchData=()=>{
    axios.get(process.env.REACT_APP_SERVER_URL+'users/notVerified',  {
      headers: {
        Authorization: `Bearer ${ctx.user.Token}`
      }
    })
    .then(response => {
      if(response.data != "All users are verified"){
        SetUserList(response.data.map(element =>  new User(element)));
      }
      else
        SetUserList([])
});
  }

  const ReloadHandler=()=>{
    fetchData();
  }

  return (
    <Fragment>
      <section className={classes.summary}>
        <h2>Requested user profiles</h2>
  
      <section className={classes.users}>
       
          {userList.length > 0 ? 
          (
          <Card>
            <ul>
              {userList.map(user => <UserCard key={uuidv4()} id={user.UserName} FirstName = {user.FirstName} LastName = {user.LastName}  Email = {user.Email} Address = {user.Address} BirthDate= {user.BirthDate} ImageUrl = {user.ImageUrl} onVerify={ReloadHandler} />)}
            </ul>
          </Card>
          )
          : 
          (
            <h2>All users are verified</h2>
          )}
          
      </section>
  
      </section>
    </Fragment>
  )
}

export default Verification