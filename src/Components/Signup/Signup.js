import React, { useState,useContext } from 'react';
import {useHistory} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

export default function Signup() {
  const history =useHistory()
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const {firebase} = useContefirebasext(FirebaseContext)
  const [err,setErr] = useState('')
  const handleSubmit =(e)=>{
    e.preventDefault()
    .auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          history.push('/login')
        })
      })
    }).catch((error)=>{
      console.log(error.message)
      setErr(error.message)
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value ={username}
            onChange= {(e)=>setusername(e.target.value)}
            id="fname"
            name="name"
       
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value = {email}
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
        
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="lname"
            name="phone"
            onChange={(e)=>setPhone(e.target.value)}
  
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}

          />
          <p style={{color:'red'}}>{err}</p>
          <br />
       
          <button>Signup</button>
        </form>
        <a onClick={()=>history.push('/login')}>Login</a>
      </div>
    </div>
  );
}