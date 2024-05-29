import React, { useState } from "react";
import './Register.css'

function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = ()=>{
        const userData = {
            username: username,
            password: password
        }
        
        async function fetchDetails(){
            console.log('userdata in handlesubmit', userData)
            const res = await fetch('http://localhost:8000/api/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await res.json()
            console.log(data);
        }
        fetchDetails()
    }
    console.log('user', username, password)

    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'700px'}}>
            <div className="signup">
                <h2>Register</h2>
                <div className="signupform">
                    <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <br />
                    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <br />
                    <input type="password" placeholder="Re-Enter password"/>
                    <br />
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export {Register}