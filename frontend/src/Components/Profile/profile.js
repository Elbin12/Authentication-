import React, { useEffect, useState } from "react";
import axios from "axios";
import {api} from '../../axios'
import {useDispatch, useSelector} from 'react-redux';

import { setUser } from "../../redux/user";
import { useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const accessToken = localStorage.getItem('access_token');
    useEffect(() => {
        console.log('Selected file:', pic);
    }, [pic]); 
    useEffect(()=>{
        const fetchProfile = async ()=>{
            await api.get('profile/',{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((res)=>{
                console.log(res, 'kk');
                dispatch(setUser(res.data.message))

            }).catch((error)=>{
                navigate('/login')
            })
        }
        fetchProfile();
    },[dispatch])
    console.log(user,'user')

    const handleSubmit = async ()=>{
        const updatedData = {
            first_name:first_name,
            last_name:last_name,
            email:email,
            pic:pic,
        }
        try{
            const response = await api.post('update/', updatedData,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response, updatedData)
        }
        catch(error){
            console.log(error.response)
        }
        
    }
    console.log(pic, email, 'llll')
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPic(selectedFile);
        console.log('Selected file:', selectedFile);
    };

    return(
        <div style={{display:'flex', flexDirection:'column', height:'700px', alignItems:'center', justifyContent:'center'}}>
            <h2>Profile</h2>
            <div style={{ width:'20%',}}>
            <div>
                <h2>{user? `${user.first_name} ${user.last_name}` : ''}</h2>
                <h4>{user? `${user.email}`:''}</h4>
            </div>
            <div style={{display:'flex', width:'110%', flexDirection:'column', border:'1px solid #bdbdbd', padding:'30px'}}>
                <h3>Edit Profile Informations</h3>
                <label htmlFor="">First name:</label>
                <br />
                <input type="text" placeholder={user? `${user.first_name}`:''} onChange={(e)=>{setFirst_name(e.target.value)}} />
                <br />
                <label htmlFor="">Last name:</label>
                <br />
                <input type="text" placeholder={user? `${user.last_name}`:''} onChange={(e)=>{setLast_name(e.target.value)}} />
                <br />
                <label htmlFor="">Email:</label>
                <br />
                <input type="text" placeholder={user? `${user.email}`:''} onChange={(e)=>{setEmail(e.target.value)}} />
                <br />
                <label htmlFor="">Upload profile image</label>
                <br />
                <input type="file" onChange={handleFileChange} />
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            </div>
        </div>
    )
}

export default Profile