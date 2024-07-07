import React, {useState} from 'react'
import { useSelector, useDispatch} from "react-redux";
import { api } from '../../axios';
import { setSelectedusers } from '../../redux/user';
import SetCookie from '../../Cookies/SetCookie';


function AdminEdit(){
    const user = useSelector(state=>state.user.user)
    const selected_user = useSelector(state => state.user.selectedUser)
    console.log(selected_user, user)

    const dispatch = useDispatch()


    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);

    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [email, setEmail] = useState();


    const handleSubmit = ()=>{
        const data={
            unique_first_name:selected_user.first_name,
            first_name:first_name,
            last_name:last_name,
            email:email
        }
        console.log(data,'data');
        api.post('edit/',data).then((res)=>{
            console.log(res.data,'ldfkgdgdg')
            dispatch(setSelectedusers(res.data))
            SetCookie('selectedUser',JSON.stringify(res.data))
        })
    }

  return (
    <div style={{margin:'50px'}}>
      <h3>Edit user</h3>
      <div style={{display:'flex', alignItems:'center', padding:'30px', gap:'10px'}}>
        <h3>{selected_user.first_name}</h3>
        <h5>{selected_user.last_name}</h5>
        <h5>{selected_user.email}</h5>
      </div>
      <div style={{display:'flex', gap:'10px', padding:'30px'}}>
        <label htmlFor="">First name:</label>
        <input type="text" placeholder={selected_user.first_name} onChange={(e)=>{setFirst_name(e.target.value)}}/>
        <br />
        <label htmlFor="">Last name:</label>
        <input type="text" placeholder={selected_user.last_name} onChange={(e)=>{setLast_name(e.target.value)}}/>
        <br />
        <label htmlFor="">Email:</label>
        <input type="email" placeholder={selected_user.email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <br />
        <button onClick={handleSubmit} >Submit</button>
        </div>
    </div>
  )
}

export default AdminEdit
