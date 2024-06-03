import React, { useState } from "react";
import './Register.css'

import axios from "axios";

import {api} from '../../axios'
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [first_nameError, setFirst_nameError] = useState('');
    const [last_nameError, setLast_nameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = ()=>{
        const userData = {
            first_name: first_name,
            last_name:last_name,
            email:email,
            password: password
        }

        api.post('/register/', userData).then(res=>{
            console.log(res.data,'gs')
            setEmailError(res.data.email)
            setFirst_nameError(res.data.first_name)
            setLast_nameError(res.data.last_name)
            setPasswordError(res.data.password)
            if (res.data.message){
                navigate('/login')
            }
        })
        .catch(error=>{
            console.log(error.email, 'error');
        })
    }
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'700px'}}>
            <div className="signup">
                <h2>Register</h2>
                <div className="signupform">
                    <div className="username">
                        <div    >
                            <input type="text" placeholder="First name" onChange={(e)=>{setFirst_name(e.target.value)}}/>
                            <p style={{margin:0, fontSize:'9px', color:'red', textAlign:'start'}}>{first_nameError? first_nameError:''}</p>
                        </div>
                        <div>
                            <input type="text" placeholder="Last name" onChange={(e)=>{setLast_name(e.target.value)}}/>
                            <p style={{margin:0, fontSize:'9px', color:'red'}}>{last_nameError? last_nameError    :''}</p>
                        </div>
                    </div>
                    <br />
                    <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <p style={{margin:0, fontSize:'9px', color:'red'}}>{emailError? emailError:''}</p>
                    <br />
                    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <p style={{margin:0, fontSize:'9px', color:'red'}}>{passwordError? passwordError:''}</p>
                    <br />
                    <input type="password" placeholder="Re-Enter password"/>
                    <p style={{margin:0, fontSize:'9px', color:'red'}}>{passwordError? passwordError:''}</p>
                    <br />
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export {Register}