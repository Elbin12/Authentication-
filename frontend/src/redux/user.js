import {createSlice} from "@reduxjs/toolkit";


const INITIAL_STATE = {
    user:[],
    users:[],
    selectedUser:[]
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
        }
    }
})

export const { setUser, setUsers, setSelectedusers} = userSlice.actions;
export default userSlice.reducer;