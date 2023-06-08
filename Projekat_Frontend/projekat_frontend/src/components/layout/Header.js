import React,{Fragment,useContext} from 'react'
import image from '../../assets/images/shop.jpg'

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
            {ctx.isLoggedIn && (
              <HeaderCartButton onClick={props.onShowCart}/>
            )}
        </header>
        <div className={classes['main-image']}>
            <img src={image} alt='Best shop ever!'/>
        </div>
    </Fragment>
  )
}

export default Header