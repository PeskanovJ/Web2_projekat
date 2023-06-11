import React from "react";

import classes from "./UserCard.module.css";
import axios from "axios";

const UserCard = (props) => {
    const birthDate = new Date(props.BirthDate);
    const day = String(birthDate.getDate()).padStart(2, '0');
    const month = String(birthDate.getMonth() + 1).padStart(2, '0');
    const year = birthDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const VerifyHandler = async (username) =>{
        try{
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'users/verify', { 
              UserName: username,
              IsAccepted: true,
              Reason: '',
            });

            if(response.data)
              props.onVerify();
          }
          catch (error){
            console.error(error);
          }
    }

  return (
    <li className={classes.user}>
      <div>
        <h3>Username: {props.id}</h3>
        <div className={classes.description}>
           First Name: {props.FirstName}<br/>
           Last Name: {props.LastName}<br/>
           Email: {props.Email}<br/>
           Address: {props.Address}<br/>
           Birth date: {formattedDate}<br/>
           Profile picture: 
           {props.Avatar && <img src={props.Avatar} alt="avatar" />}
        </div>
      </div>
      <div className="actions">
        <button onClick={() => VerifyHandler(props.id)} >Verify</button>
        <button>Deny</button>
      </div>
    </li>
  )
}

export default UserCard