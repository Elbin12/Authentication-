import React, { Fragment, useEffect, useState } from "react";
import { api } from "../../axios";
import axios from "axios";
import { useSelector, useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setUsers, setSelectedusers} from "../../redux/user";
function AdminHome(){

    const [error, setError] = useState();

    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access_token');

    const navigate = useNavigate();
    const Logined_user = useSelector(state => state.user.user);
    const sel = useSelector(state => state.user.selectedUser);
    console.log(Logined_user,'dags')
    
    const fetchUsers= ()=>{
        api.get('adminpage/',{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res)=>{
            console.log(res.data)
            dispatch(setUsers(res.data))
        }).catch((error)=>{
            navigate('/login')
        })
    }
    useEffect(()=>{
        if(Logined_user.isAdmin==='False'){
            navigate('/login', { state: { message: 'You must be an admin to access this page.' } })
        }
        fetchUsers();
        
    },[Logined_user, dispatch])

    console.log(localStorage.getItem('access_token'), localStorage.getItem('refresh_token'),'lldsfs')

    const handleClick =(user)=>{
        dispatch(setSelectedusers(user))
        navigate('/admin/edit')
    }

    const deleteUser =(user)=>{
        api.post('delete/', user, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res)=>{
            console.log(res);
            fetchUsers();
        })
    }
    console.log(sel,'sel')
    return(
        <div style={{width:'100%', display:'flex', flexDirection:'column',}}>
            <div style={{paddingBottom:'20px', padding:'40px'}}>
                <h3>Admin Home</h3>
                <h3><Link to={'/admin/create'} style={{textDecoration:'none', color:"black"}}>Create User</Link></h3>
            </div>
            <div style={{padding:'40px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                    <h3>Search User</h3>
                    <input style={{height:'20px'}}  type="text" placeholder="search user...." onChange={(e)=>{
                        api.post('search/',{search:e.target.value},{
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        }).then((res)=>{
                            console.log(res.data)
                            dispatch(setUsers(res.data))
                            setError('')
                        }).catch((error)=>{
                            console.log(error.response.data.error)
                            setError(error.response.data.error)  
                        })
                    }}/>
                </div>
                <h3>Users</h3>
                {
                    error?error:Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                            <div style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center'}}>
                                <h4 key={user.id}>{user.first_name}</h4>
                                <h4>{user.last_name}</h4>
                                <h5>{user.email}</h5>
                                <button style={{height:'20px', cursor:'pointer'}} onClick={()=>{handleClick(user)}}>Edit User</button>
                                <button style={{height:'20px', cursor:'pointer'}} onClick={()=>{deleteUser(user)}}>Delete User</button>
                            </div>
                        ))
                    ) : (
                        <p>Loading users...</p>
                    )
                }

            </div>
        </div>
    )
}

export default AdminHome