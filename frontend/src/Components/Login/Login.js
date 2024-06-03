import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Login.css'

import axios from "axios";
import { api } from "../../axios";

function Login(){

    const location = useLocation();
    const message = location.state?.message;


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [mainError, setmainError] = useState('');

    const handleSubmit = async ()=>{
        let data = {
            email,
            password
        }
        api.post('login/', data).then(res=>{
            console.log(res.data,'kk');
            const { access, refresh } = res.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            console.log('Login successful:', res.data);
            if (res.data.isAdmin){
                navigate('/admin/home');
            }else{
                navigate('/home');
            }
        })
        .catch(error=>{
            console.log(error.response.data, 'error');
            setmainError(error.response.data.detail)
        })
    }

    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'700px'}}>
            <div className="login">
                <h3>Login</h3>
                <br />  
                <div className="loginform">
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" />
                    <br />
                    <br />
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                    <br />
                    <p style={{margin:0, fontSize:'12px', color:'red'}}>{message? message:mainError}</p>
                    <br />
                    <button type="submit" onClick={handleSubmit}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Login