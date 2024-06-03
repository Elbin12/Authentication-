import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { api } from '../../axios';

function CreateUser(){

    const Logined_user = useSelector(state => state.user.user);

    const navigate = useNavigate();

    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Repassword, setRepassword] = useState();

    const [first_nameError, setFirst_nameError] = useState('');
    const [last_nameError, setLast_nameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const accessToken = localStorage.getItem('access_token');

    useEffect(()=>{
        console.log(Logined_user.isAdmin,'kgnjfj');
        if(Logined_user.isAdmin==='False'){
            navigate('/login', { state: { message: 'You must be an admin to access this page.' } })
        }
    })

    const handleSubmit = ()=>{
        const data={
            first_name, last_name, email, password
        }
        if(password!=Repassword){
            setPasswordError('Enter the same password')
        }
        else{
            api.post('register/', data,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((res)=>{
                console.log(res.data);
                setEmailError(res.data.email)
                setFirst_nameError(res.data.first_name)
                setLast_nameError(res.data.last_name)
                setPasswordError(res.data.password)
                if (res.data.message){
                    navigate('/admin/home')
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }


  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <h2>Create User</h2>
      <div style={{display:'flex', flexDirection:'column', width:'22%', border:'1px solid #d2d2d2', padding:'20px '}}>
        <br />
        <label htmlFor="" >First name : </label>
        <input type="text" style={{height:'20px'}} onChange={(e)=>{setFirst_name(e.target.value)}}/>
        <p style={{margin:0, fontSize:'9px', color:'red', textAlign:'start'}}>{first_nameError? first_nameError:''}</p>
        <br />
        <label htmlFor="">Last name : </label>
        <input type="text" style={{height:'20px'}} onChange={(e)=>{setLast_name(e.target.value)}}/>
        <p style={{margin:0, fontSize:'9px', color:'red', textAlign:'start'}}>{last_nameError? last_nameError:''}</p>
        <br />
        <label htmlFor="">Email : </label>
        <input type="text" style={{height:'20px'}} onChange={(e)=>{setEmail(e.target.value)}}/>
        <p style={{margin:0, fontSize:'9px', color:'red', textAlign:'start'}}>{emailError? emailError:''}</p>
        <br />
        <label htmlFor="">Password : </label>
        <input type="password" style={{height:'20px'}} onChange={(e)=>{setPassword(e.target.value)}}/>
        <p style={{margin:0, fontSize:'9px', color:'red', textAlign:'start'}}>{passwordError? passwordError:''}</p>
        <br />
        <label htmlFor="">Re-Enter password : </label>
        <input type="password" style={{height:'20px'}} onChange={(e)=>{setRepassword(e.target.value)}}/>
        <p style={{margin:0, fontSize:'9px', color:'red', textAlign:'start'}}>{passwordError? passwordError:''}</p>
        <br />
        <button style={{height:'25px'}} onClick={handleSubmit} >Create</button>
      </div>
    </div>
  )
}

export default CreateUser
