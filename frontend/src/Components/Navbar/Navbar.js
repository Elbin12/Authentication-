import React, { useEffect } from 'react';
import { api } from '../../axios';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setUser } from "../../redux/user";

import RemoveCookie from '../../Cookies/RemoveCookie';


function Navbar(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const count = useSelector(state=> state.user.count)

    useEffect(()=>{
        if(!user){
            console.log('vanno', user);
            navigate('/login')
        }
        console.log('ccaa', user)
    },[])

    console.log(user,'prooo')
    const logout =async ()=>{
        const res = await api.post('logout/')
        console.log(res.data)
        dispatch(setUser([]))
        RemoveCookie('userInfo');
        navigate('/login');
    }
  return (
    <div style={{ padding:'0 40px 0 40px' , display:'flex', justifyContent:'space-between', backgroundColor:'#c3cac3'}}>
        <h4 >{user? `${user.first_name}`:''}</h4>
        <h3>{count? count:''}</h3>
        <h5 onClick={logout}>Logout</h5>
    </div>
  )
}
        
export default Navbar
