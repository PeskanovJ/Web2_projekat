import React,{Fragment,useContext} from 'react'

import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
import AuthContext from '../../Contexts/auth-context'
import Button from '../UI/Button/Button'

const Header = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <Fragment>
        <header className={classes.header}>
            <h1>eShop</h1>
            <nav className={classes.nav}>
              <ul>
                {!ctx.isLoggedIn && (
                    <Button onClick={props.onShowLoginForm}>Login</Button>
             )}
                {!ctx.isLoggedIn && (
                  <Button className onClick={props.onShowRegisterForm}>Register</Button>
                )}
              </ul>
            </nav>
            {ctx.isLoggedIn ? (
              <div className={classes.rightContent}>
              {ctx.user.Role == 1 ? (<HeaderCartButton onClick={props.onShowCart}/>) : null}
             <span> {ctx.user.FirstName} {ctx.user.LastName}</span>
              <Button onClick={props.onShowProfile}>Profile</Button>
              </div>
            ):null}
        </header>
        
    </Fragment>
  )
}

export default Header