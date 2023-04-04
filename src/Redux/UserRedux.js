import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        user: null, 
        email:"",
        loading:true
    },
    reducers:{
        createUser:(state,action)=>{
            state.user=true;
            state.email=action.payload;
        },
        removeUser:(state)=>{
            state.user=null;
            state.email="";
        },
        startLoading:(state)=>{
            state.loading=true;
        },
        endLoading:(state)=>{
            state.loading=false;
        }
    }
});


export const {createUser,removeUser,startLoading,endLoading}=userSlice.actions;
export default userSlice.reducer;