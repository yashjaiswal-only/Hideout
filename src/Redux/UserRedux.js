import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        user: null, 
        email:"",
        token:null,
        loading:false,
        details:null,
        alert:null,
        fails:null,
        chatUsers:[],
        screensize:null
    },
    reducers:{
        updateScreenSize:(state,action)=>{
            state.screensize=action.payload
        },
        updateFails:(state,action)=>{
            state.fails=action.payload
        },
        updateChatList:(state,action)=>{
            state.chatUsers=action.payload;
        },
        addAlert:(state,action)=>{
            state.alert=action.payload;
        },
        deleteAlert:(state,action)=>{
            state.alert=null;
        },
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
            state.chatUsers=[]
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


export const {updateScreenSize,updateFails,addUser,removeUser,startLoading,endLoading,addUserDetails,addAlert,deleteAlert,updateChatList}=userSlice.actions;
export default userSlice.reducer;