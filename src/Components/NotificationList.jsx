import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import pic from '../Data/pic.png'
import { CircularProgress } from '@mui/material';
import { getNotificationsOfUser } from '../ApiCalls/Notification';
import { useSelector } from 'react-redux';
import Notification from './Notification';

const Wrapper=styled.div`
    width:100%;
    height:90%;
    overflow-y:auto;
    overflow-x:hidden;
    &::-webkit-scrollbar {
      width: 0.3rem;               /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: outset;        /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b6b6e4;    /* color of the scroll thumb */
      border-radius: 50px;       /* roundness of the scroll thumb */
      border: 1px solid white;  /* creates padding around scroll thumb */
    }
`
const ListItem=styled.div`
    display: flex;
    margin:1rem 0;
`
const Image=styled.img`
    width:2rem;
    height:2rem;
    aspect-ratio:1/1;
    border-radius:50%;
`
const Text=styled.div`
    font-size:0.8rem; 
    font-weight:600;
    margin:0 0.2rem;
    >p{
        margin:0;
    }
    >span{
        font-size:0.7rem;
        color:gray;
    }
`
// const Wrapper=styled.div``

const NotificationList = () => {
    const [allNotifications,setAllNotifications]=useState([]);
    const [load,setLoad]=useState(false);
    const token=useSelector(state=>state.token)

    const getNotification=async()=>{
        setLoad(true)
        const res=await getNotificationsOfUser(token)
        // console.log(res)
        if(res.status===200){
            setAllNotifications(res.data.notifications)
            console.log(res.data.notifications)
        }   
        setLoad(false)
    }
    useEffect(()=>{
        getNotification();
    },[])
  return (
   <>{load?<CircularProgress/>:
     <Wrapper>           
        {
            allNotifications.map((not)=>(
                <Notification not={not}/>
            ))
        }
      </Wrapper>}
    </>
  )
}

export default NotificationList
