import { createSlice } from "@reduxjs/toolkit";
import GetCookie from "../Cookies/GetCookie";


let userinfo = GetCookie('userInfo')
let selected_user = GetCookie('selectedUser') 
console.log(userinfo, 'lljjg');
if (userinfo !== undefined){
    console.log('undefinedd');
    userinfo = JSON.parse(userinfo)
}

if (selected_user !== undefined){
    console.log('undefinedd');
    selected_user = JSON.parse(selected_user)
}

console.log(userinfo , 'from slice');

const INITIAL_STATE = {
    user:userinfo || null,
    users:[],
    selectedUser: selected_user ||null,
    count: null
}
const userSlice = createSlice({ 
    name:'user',
    initialState: INITIAL_STATE,
    reducers:{
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        setUsers: (state, action)=>{
            state.users = action.payload;
        },
        setSelectedusers: (state, action)=>{
            console.log(action);
            state.selectedUser = action.payload;
        },
        setCount: (state, action)=>{
            state.count = action.payload;
        }
    }
})

export const { setUser, setUsers, setSelectedusers, setCount} = userSlice.actions;
export default userSlice.reducer;