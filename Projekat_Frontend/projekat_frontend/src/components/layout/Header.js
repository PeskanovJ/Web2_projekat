import React,{Fragment,useContext} from 'react'
import {Link} from 'react-router-dom'

import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
import AuthContext from '../../Contexts/auth-context'
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    navigate('/');
    ctx.onLogout();
  };

  return (
    <Fragment>
        <header className={classes.header}>
          <div className={classes.content}>
            <h1>eShop</h1>
            
          
            <nav className={classes.nav}>
              <ul>
                <Link to="/">
                  <Button>Home</Button>
                </Link>
                  { ctx.isLoggedIn  ? ( 
                  <>
                    {ctx.user.Role == 1 ? (
                    <Link to="/myOrders">
                      <Button >My orders</Button>
                    </Link>) : null}
                    {(ctx.user.Role == 2 && ctx.user.IsVerified ) ? (
                    <>
                      <Link to="/addNew">
                        <Button>New item</Button>
                      </Link>

                      <Link to="/newOrders">
                        <Button>New orders</Button>
                      </Link>

                      <Link to="/orderHistory">
                        <Button>Order history</Button>
                      </Link>
                    </>
                    ):null}
                    {(ctx.user.Role == 3 ) ? (
                    <>
                      <Link to="/allOrders">
                        <Button>All orders</Button>
                      </Link>

                      <Link to="/verification">
                        <Button>User verification</Button>
                      </Link>
                    </>
                    ):null}
                  </>
                  ) : null}
            </ul>
          </nav>
          </div>
          <div className={classes.content}>
          {ctx.isLoggedIn ? (
          <>
            {ctx.user.Role == 1 ? (<HeaderCartButton onClick={props.onShowCart}/>) : null}
            <span> {ctx.user.FirstName} {ctx.user.LastName}</span>
            <Link to="/profile">
            <Button onClick={props.onShowProfile}>Profile</Button>
            </Link>
            <Button onClick={LogoutHandler}>Logout</Button>
          </>
          )
          :(
          <>
            <Button onClick={props.onShowLoginForm}>Login</Button>
            <Button className onClick={props.onShowRegisterForm}>Register</Button>
          </>
          )}
            </div>
        </header>
    </Fragment>
  )
}

export default Header