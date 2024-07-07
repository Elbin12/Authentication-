import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../axios'
import { setUser } from '../user';

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async ({ navigate, dispatch})=>{
        try{
            const response = await api.get('profile/')
            const data = response.data
            console.log(data.message,'data from ')
            dispatch(setUser(data.message));    
            return data.message
        }catch(error){
            console.log(error);
            navigate('/login')
        }
        
    }
)