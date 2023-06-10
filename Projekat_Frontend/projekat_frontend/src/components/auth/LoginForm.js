import React,{useState ,useEffect ,useReducer, useContext,useRef }  from "react";
import axios from 'axios'
import multipart from 'parse-multipart';

import classes from "./Form.module.css";
import Modal from "../UI/Modal/Modal";
import AuthContext from "../../Contexts/auth-context";
import Input from '../UI/Input/Input'
import Button from "../UI/Button/Button";

const emailReducer=(state,action)=>{
    if(action.type === 'USER_INPUT')
      return { value: action.val, isValid: action.val.includes('@') };
    if(action.type === 'INPUT_BLUR')
      return { value: state.value, isValid: state.value.includes('@')};
    return {value:'',isValid:false};
  };
  
  const passwordReducer = (state,action) => {
    if(action.type === 'USER_INPUT')
      return { value: action.val, isValid: action.val.trim().length > 6}
    if(action.type==='INPUT_BLUR')
      return {value:state.value , isValid: state.value.trim().length > 6}
    return {value:'',isValid:false};
  }

const LoginForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isValid:null});
    const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:'',isValid:null});
  
    const authCtx = useContext(AuthContext);
  
    const emailInputRef = useRef();
    const passwordInputRef=useRef();
  
    const {isValid: emailIsValid} =emailState 
    const {isValid: passwordIsValid} =passwordState 
  
     useEffect(()=>{
      const identifier = setTimeout(()=>{
        setFormIsValid(
          emailIsValid && passwordIsValid
        );
      },500);
      
      return ()=>{
        clearTimeout(identifier);
      };
    }, [emailIsValid,passwordIsValid]);
  
  
    const emailChangeHandler = (event) => {
      dispatchEmail({type:'USER_INPUT', val: event.target.value});
    };
  
    const passwordChangeHandler = (event) => {
      dispatchPassword({type:'USER_INPUT',val:event.target.value});
  
    };
  
    const validateEmailHandler = () => {
      dispatchEmail({type:'INPUT_BLUR'})
    };
  
    const validatePasswordHandler = () => {
      dispatchPassword({type:'INPUT_BLUR'});
    };
  
    const submitHandler = async(event) => {
      event.preventDefault();
      if(formIsValid){
        try{
          const response = await axios.post(process.env.REACT_APP_SERVER_URL+'users/login', { 
            Email: event.target.email.value,
            Password: event.target.password.value,
          });
          const data = response.data
          const boundary = multipart.getBoundary(response.headers['content-type']);
          const parts = multipart.Parse(Buffer.from(data, 'binary'), boundary);
    
          const user = JSON.parse(parts[0].data.toString());
          const profilePic = parts[1].data;

          authCtx.onLogin(user,profilePic);
          props.onClose();
        }
        catch (error){
          console.error(error);
        }
      }
      else if(!emailIsValid)
      {
        emailInputRef.current.focus();
      }
      else{
        passwordInputRef.current.focus();
      }
    };
  
  return (
    <Modal onClose={props.onClose} className={classes.login}>
      <form onSubmit={submitHandler}>
        <span>Login</span>
        <Input ref={emailInputRef} id='email' label='E-mail' type="email" isValid={emailIsValid} value={emailState.value}  onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input ref={passwordInputRef} id='password' label='Password' type="password" isValid={passwordIsValid} value={passwordState.value}  onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
