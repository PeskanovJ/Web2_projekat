import React, { Fragment, useContext } from 'react';

import classes from './ProfileInfo.module.css'
import AuthContext from '../../Contexts/auth-context';
import Input from '../UI/Input/Input'

function ProfileInfo() {
  const ctx = useContext(AuthContext)

  const birthDate = new Date(ctx.user.BirthDate);
  const day = String(birthDate.getDate()).padStart(2, '0');
  const month = String(birthDate.getMonth() + 1).padStart(2, '0');
  const year = birthDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  let role='';
let image ='';
  if(ctx.user.Role==1)
   role="Buyer";
  else if(ctx.user.Role==2)
    role="Seller";
  else
    role = "Admin";

  return (
    <Fragment>
      <section className={classes.summary}>
        <h2>Your Profile</h2>
        <img src={ctx.user.Avatar} alt='avatar'/>
        <p>Username : <b>  {ctx.user.UserName}</b></p><br/>
        <p>First name : <b>  {ctx.user.FirstName}</b></p><br/>
        <p>Last name : <b>  {ctx.user.LastName}</b></p><br/>
        <p>Email : <b>  {ctx.user.Email}</b></p><br/>
        <p>Address : <b>  {ctx.user.Address}</b></p><br/>
        <p>Birth date : <b>  {formattedDate}</b></p><br/>
        <p>Account type : <b>  {role}</b></p><br/>
        {ctx.user.IsVerified?(<p>Account Status : Verified</p>):(<p>Account Status : Pending</p>)}
      </section>
    </Fragment>
  );
}

export default ProfileInfo;