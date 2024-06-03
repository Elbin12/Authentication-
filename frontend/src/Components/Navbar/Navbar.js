import React from 'react';
import { api } from '../../axios';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setUser } from "../../redux/user";

function Navbar(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const user = useSelector(state => state.user.user);

    console.log(user)
    const logout =async ()=>{
        await api.post('logout/',{refresh_token: refresh_token},{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res)=>{
            console.log(res)
            localStorage.setItem('access_token', '');
            localStorage.setItem('refresh_token', '');
            dispatch(setUser([]))
            navigate('/login')
        })
    }
  return (
    <div>
        <h5 style={{textAlign:'end', cursor:'pointer', margin:'40px'}} onClick={logout}>Logout</h5>
    </div>
  )
}

export default Navbar
