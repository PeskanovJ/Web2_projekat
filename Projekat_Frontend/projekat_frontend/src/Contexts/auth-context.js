import React,{useState,useEffect} from 'react'
import axios from 'axios';

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLoggout: ()=>{},
    onLogin:(email,password)=>{},
    onRegister:()=>{},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    
    useEffect(()=>{
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if(storedUserLoggedInInformation === '1')
          setIsLoggedIn(true)
    
    }, []);

    const logoutHandler =()=>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler=()=>{
        console.log(process.env.REACT_APP_SERVER_URL+'/login');
        axios.get(process.env.REACT_APP_SERVER_URL+'/login')
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err);
        })
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    }

    const RegisterHandler=()=>{
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
        value={{isLoggedIn:isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler, onRegister:RegisterHandler}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;