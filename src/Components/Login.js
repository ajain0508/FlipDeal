import React,{ useState} from 'react'
import './Login.css'
import {auth} from "./firebase"
import {Link,useNavigate} from 'react-router-dom'

function Login() {
    
    // navigate is for navigating to specific page after user is created
    const navigate = useNavigate()
    // have an empty string rather than NULL
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = (e)=>{
        // to prevent refreshing
        e.preventDefault()
        // firebase login
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            if(auth){
                navigate('/')
            }
        })
        .catch(error=>console.log(error.message))
    }
    const register = (e)=>{
        // to prevent refreshing
        e.preventDefault()
        
        // firebase register
        // it creates a new user with email id and password
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            if(auth){
                navigate('/')
            }
        })
        .catch(error => console.log(error.message))

    }
  return (
    <div className='login'>
        <Link to = '/'>
      <img className = 'login_logo' src='https://logolook.net/wp-content/uploads/2021/06/Amazon-Logo.png'></img>
      </Link>
      <div className="login_container">
        <h1>Sign in </h1>

        <form action="">
            <h5>E-mail</h5>
            <input type="text" value = {email} onChange={e=>setEmail(e.target.value)}/>
            <h5>Password</h5>
            <input type='password' value = {password} onChange={e=>setPassword(e.target.value)}/>
            <button className='login_signinButton' type = "submit" onClick = {signIn}>Sign In</button>
        </form>
        <p>
        Please read these conditions carefully before using the AMAZON CLONE website. By using the Amazon.in website, you signify your agreement to be bound by these conditions.In addition, when you use any current or future Amazon.in service, you will also be subject to the terms, guidelines and conditions applicable to that Amazon Service.
        </p>
        <button className='login_registerButton' type = "submit" onClick = {register} >Create Amazon Account</button>
      </div>
    </div>
  )
}

export default Login
