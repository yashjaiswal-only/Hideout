import React, { useEffect, useState } from 'react'
import {mobile, tab} from '../responsive'
import {Box} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import FriendTab from './FriendTab';
import { useSelector } from 'react-redux';
import { getAllRequest } from '../ApiCalls/Friend';
const Container=styled.div`
    width: 50%;
    margin:1rem;
    height:max-content;
    display: flex;
    flex-direction:column;
    align-items: center;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    align-items: center;
    ${tab({
      width:'90%',
      maxHeight:'50vh'
    })}
    >h1{
      text-align:center;
      margin:1rem;
      ${tab({
        fontSize:'1.2rem'
      })}
    }
`
const List=styled.div`
    width:100%;
    display: flex;
    flex-wrap: wrap;
    min-height:30vh;
    max-height:80vh;
    overflow-y:scroll;
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

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      sx={{color:'black',fontWeight:'500',fontSize:'1.5rem'
        }}
      {...props}
    />
  );  
}
const FriendsRequest = ({setFails}) => {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //get all requests
  const [requests,setRequests]=useState([]);
  const token=useSelector(state=>state.token);
  const getRequests=async()=>{
    const res=await getAllRequest(token);
    if(res.status===200){
      console.log(res.data)
      setRequests(res.data);  
    }
    else{
      console.log(res)
      setFails(true)
    }
  }
  useEffect(()=>{
    getRequests();
  },[])
  return (
    <Container>
        <h1>Friend Requests</h1>
        <List>
         {requests.length?requests.map(f=>(
           <FriendTab request myfriend={false} user={f} key={f._id}/>
           ))
           :
           <div style={{margin:'auto',fontSize:'1.5rem'}}>No Request to show</div>
           }
        </List>
    </Container>
  )
}

export default FriendsRequest
