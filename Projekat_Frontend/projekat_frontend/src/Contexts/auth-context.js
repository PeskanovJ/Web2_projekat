import React,{useState,useEffect} from 'react'

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLoggout: ()=>{},
    onLogin:(user)=>{    
    },
    onRegister:()=>{},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user,setUser] = useState({});
   
    
    useEffect(()=>{
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if(storedUserLoggedInInformation === '1')
          setIsLoggedIn(true)
    
    }, []);

    const logoutHandler =()=>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler=(user)=>{
        localStorage.setItem('token', user.Token);
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
        setUser(user);
    }

    const RegisterHandler=()=>{
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
        value={{isLoggedIn: isLoggedIn,
            user:user,
            onLogout: logoutHandler, 
            onLogin: loginHandler, 
            onRegister:RegisterHandler}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;