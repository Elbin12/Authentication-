import React,{useEffect, useMemo, useState} from "react";
import { Link, json } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../redux/Actions/ProfileAction";

import GetCookie from "../../Cookies/GetCookie";
import SetCookie from "../../Cookies/SetCookie";

function Home(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user.user)
    console.log(user, 'userrr')


    const [count, setCount] = useState()

    const memo =  useMemo(()=>{
       return count*2
    },[count])

    console.log(memo,'memo')

    
    console.log(user,'user')
    return(
        <div>
            <h3>Home</h3>
            <Link to={"/profile/"}>profile</Link>
        </div>
    )
}

export default Home