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
        firebaseUser:null
    },
    reducers:{
        updateFails:(state,action)=>{
            state.fails=action.payload
        },
        setFirebaseUser:(state,action)=>{
            state.firebaseUser=action.payload
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


export const {updateFails,addUser,removeUser,startLoading,endLoading,addUserDetails,addAlert,deleteAlert,updateChatList,setFirebaseUser}=userSlice.actions;
export default userSlice.reducer;