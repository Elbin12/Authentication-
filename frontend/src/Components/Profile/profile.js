import React, { useEffect, useState } from "react";
import {BASE_URL, api} from '../../axios'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Post } from "../../redux/Actions/PostRequest";

import './Profile.css';

function Profile(){
    const navigate = useNavigate();

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);


    const handleSubmit = async ()=>{
        const updatedData = {
            first_name:first_name,
            last_name:last_name,
            email:email,
            pic:pic,
        }
        const url='update/'
        dispatch(Post({ navigate, dispatch, url, updatedData}))
        setPic('')
        document.getElementById('fileInput').value=null;
    }
    
    console.log(pic, 'llll')
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
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <img style={{width:'40px', height:'40px', objectFit:'cover', border:'2px solid #88c1c0', borderRadius:'50px'}} src={user?`${BASE_URL}${user.profile_pic}`:''} alt="" />
                    <h2>{user? `${user.first_name} ${user.last_name}` : ''}</h2>
                </div>
                <h4>{user? `${user.email}`:''}</h4>
            </div>
            <div style={{display:'flex', width:'110%', flexDirection:'column', border:'1px solid #bdbdbd', padding:'30px'}}>
                <h3>Edit Profile Informations</h3>
                <label htmlFor="">First name:</label>
                <br />
                <input type="text" defaultValue={user? `${user.first_name}`:''} onChange={(e)=>{setFirst_name(e.target.value)}} />
                <br />
                <label htmlFor="">Last name:</label>
                <br />
                <input type="text" defaultValue={user? `${user.last_name}`:''} onChange={(e)=>{setLast_name(e.target.value)}} />
                <br />
                <label htmlFor="">Email:</label>
                <br />
                <input type="text"  defaultValue={user? `${user.email}`:''} onChange={(e)=>{setEmail(e.target.value)}} />
                <br />
                <label htmlFor="">Upload profile image</label>
                <br />
                <input id="fileInput" type="file" onChange={handleFileChange} />
                <div style={{width:'150px'}}>
                    <img id="uploadimg" style={{width:'100%'}} src={pic?URL.createObjectURL(pic):''} alt="" />
                </div>
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            </div>
        </div>
    )
}

export default Profile