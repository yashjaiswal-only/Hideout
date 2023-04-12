import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        user: null, 
        email:"",
        token:null,
        loading:false,
        details:null
    },
    reducers:{
        
        addUser:(state,action)=>{
            state.user=true;
            state.email=action.payload.email;
            state.token=action.payload.token;
        },
        removeUser:(state)=>{
            state.user=null;
            state.email="";
            state.token=null;
            state.details=null;
        },
        startLoading:(state)=>{
            state.loading=true;
        },
        endLoading:(state)=>{
            state.loading=false;
        },
        addUserDetails:(state,action)=>{
            state.details=action.payload;
        },
        // addFriendList
    }
});


export const {addUser,removeUser,startLoading,endLoading,addUserDetails}=userSlice.actions;
export default userSlice.reducer;