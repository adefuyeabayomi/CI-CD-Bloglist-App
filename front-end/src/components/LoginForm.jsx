import userService from "../services/user";
import { useState } from "react";
import Notification from "../components/Notification"
import styles from "../styles/mainStyles"

let buttonStyle = styles.buttonStyle;
let formStyle = styles.formStyle;

const LoginForm = (props) => {
    let [usernameL,setUsernameL] = useState('')
    let [passwordL,setPasswordL] = useState('')
    let [usernameS,setUsernameS] = useState('')
    let [passwordS,setPasswordS] = useState('')
    const [showNotification,setShowNotification] = useState(false)
    const [notificationText,setNotificationText] = useState('')
    const [notifType,setNotifType] = useState('')
  
    const handleUsernameChangeL =  (e) => {
        e.preventDefault();
        setUsernameL(e.target.value)
    }
    const handlePasswordChangeL = (e) => {
        e.preventDefault();
        setPasswordL(e.target.value);
    }
    const handleUsernameChangeS =  (e) => {
      e.preventDefault();
      setUsernameS(e.target.value)
    }
    const handlePasswordChangeS = (e) => {
      e.preventDefault();
      setPasswordS(e.target.value);
    }
  
    const login = async () => {
      let loginData = {
        username : usernameL,
        password : passwordL
      }
      console.log("logindata", loginData);
      let data = await userService.login(loginData);
      data.status === 200 ? alert("login Successful, you can now create and view blogs") : alert("unable to login now, we are working to fix the issue. Thanks for understanding.")
      if(data.status === 200){
        console.log("data.data",data.data)
        window.localStorage.setItem("userToken",data.data.token)
        window.localStorage.setItem("username",usernameL)
        window.localStorage.setItem("userID",data.data.id)
        props.setUserToken(data.data.token)
      }
    }

    const signUp = async () => {
      let signUpData = { 
        username : usernameS,
        password : passwordS,
      }
      console.log("signupdata", signUpData);
      if(usernameS.length < 3 || passwordS.length < 8){
        setNotificationText("To sign up, supply a username more than 3 characters and a password more than 8 characters long. Please try again.");
        setNotifType("error");
        setShowNotification(true);
        setTimeout(()=>{
        setShowNotification(false);
        }, 5000)
      }
      else {
        let data = await userService.signUp(signUpData)
        console.log("response data", data)
        if(data.status === 201){
            setNotificationText("account created successfully");
            setNotifType("success");
            setShowNotification(true);
            setTimeout(()=>{
            setShowNotification(false);
            }, 5000)
        }
        else {
            setNotificationText("Unable to create account, we are working to fix the issue, thanks for understanding");
            setNotifType("error");
            setShowNotification(true);
            setTimeout(()=>{
            setShowNotification(false);
            }, 5000)
        }
        return "Account Created Successfully"
      }
    }
  

  
    return (
        <div>
            <Notification  type={notifType} text={notificationText} showNotification={showNotification} />
            <h1>Login</h1>
            <form id="loginForm" style={formStyle}>
                <div>
                    <p>Username : <input id="loginUsername" type="text" name="username" onChange={handleUsernameChangeL} value={usernameL} /></p>
                </div>
                <div>
                    <p>Password : <input id="loginPassword" type="text" name="username" onChange={handlePasswordChangeL} value={passwordL} /></p>
                </div>
            </form>
            <button style={buttonStyle} id="loginButton" onClick={login}>Login</button>
  
            <h1>Sign Up For New Users</h1>
            <form id="signupForm" style={formStyle}>
                <div>
                    <p>Username : <input type="text" id="signupUsername" name="username" onChange={handleUsernameChangeS} value={usernameS} /></p>
                </div>
                <div>
                    <p>Password : <input type="text" id="signupPassword" name="username" onChange={handlePasswordChangeS} value={passwordS} /></p>
                </div>
            </form>
            <button style={buttonStyle} id="signupButton" onClick={signUp}>Sign Up</button>
        </div>
    )
  }
  export default LoginForm;