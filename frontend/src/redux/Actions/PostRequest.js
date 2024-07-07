import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../axios'
import { setUser } from '../user';
import SetCookie from '../../Cookies/SetCookie';


export const Post=createAsyncThunk('profile/update', 
    async ({navigate, dispatch, url, updatedData})=>{
        try{
            const response = await api.post(url, updatedData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data,'lllk')
            dispatch(setUser(response.data));
            SetCookie('userInfo', JSON.stringify(response.data))
        }
        catch(error){
            console.log(error.response)
        }
    }
)

