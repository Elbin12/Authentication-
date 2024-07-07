import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Login.css'

import { api } from "../../axios";
import SetCookie from "../../Cookies/SetCookie";

import { useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/Actions/ProfileAction";

function Login(){

    const location = useLocation();
    const message = location.state?.message;


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [mainError, setmainError] = useState('');

    const handleSubmit = async () => {
        let data = {
            email,
            password
        }
    
        try {
            const res = await api.post('login/', data);
            console.log(res.data, 'kk');
            console.log('Login successful:', res.data);
    
            const fetchdata = async () => {
                const userinfo = await dispatch(fetchProfile({ navigate, dispatch })).unwrap();
                console.log(userinfo, 'userinfo');
                SetCookie('userInfo', JSON.stringify(userinfo));
            }
    
            await fetchdata();
    
            if (res.data.isAdmin) {
                navigate('/admin/home',{replace:true});
            } else {
                navigate('/home',{replace:true});
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.response.data, 'error');
            setmainError(error.response.data.detail);
        }
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