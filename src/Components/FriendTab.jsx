import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import mobile, { tab } from '../responsive'
import { Check, Clear } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getUserMinDetails } from '../ApiCalls/User'
import { useSelector } from 'react-redux'
import { acceptRequest, checkFriend, makeRequest, rejectRequest } from '../ApiCalls/Friend'

const Container=styled.div`
    width:100%;
    padding-bottom:1rem;   
    display: flex;
    justify-content: space-between;
    margin:1rem;
    border-bottom:1px solid gray;  
    /* transform:translateX(0%); */
    transform:${props=>props.done?'translateX(110%)':''};
    transition:transform 1s;
    &:hover{
      /* transform:translateX(100%) */
    }
    >div{
        display: flex;
        align-items: center;
        cursor: pointer;
        max-width:60%;

    }
    >button{
        max-height:40px;
        height:max-content; 
        min-width:10%;
        margin:auto 1rem;
        font-weight:500;
        font-size:1rem;
        background-color: cornflowerblue;
        border: none;
        outline: none;
        color: white;
        padding: 0.5rem;
        cursor: pointer;
        ${mobile({
          margin:'auto 1rem',
          padding:'0.4rem',
          fontSize:'0.8rem'
        })}
    }
    ${tab({
      // margin:'0.6rem',
      paddingBottom:'0.5rem',
    })}
    ${mobile({
      margin:'0.2rem',
      paddingBottom:'0.2rem'
    })}
`
const Avatar=styled.img`
  height:60px;
  width:60px;
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      width:'30px',
      height:'30px',
  })}
`
const Entry=styled.div`
    margin:0rem 30px;
    display: flex; justify-content: center; flex-direction: column;
    /* background-color: red; */
    ${tab({
      margin:'0 15px',
    })}
    ${mobile({
      margin:'0 5px'
    })}
`
const Name=styled.span`
    margin:0;
    font-size:1.6rem;
    color:black;
    font-weight:600;
    line-height:normal;
    ${mobile({
      fontSize:'1rem',
    })}
`
const Info=styled.span`
    margin:0;
    font-size:1.2rem;
    color:gray;
    font-weight:600;
    line-height:normal;
    ${mobile({
      fontSize:'0.8rem',
    })}
`
const Circle=styled.span`
  border-radius:50%;
  border:1px solid black;
  cursor: pointer;
  display: flex;align-items: center;justify-content: center;
  margin:auto 1rem;
  ${mobile({
    margin:'auto 0.4rem'
  })}
`
const FriendTab = ({myfriend,request,user,getRequests,getPossibleFriends}) => {
  const navigate=useNavigate();
  const [done,setDone]=useState(false);
  const [isFriend,setIsFriend]=useState(false);
  const handleClick=()=>{
    navigate('/profile/'+user.uid)
    // console.log(user.uid);
  }
  const token=useSelector(state=>state.token);
  //button click
  const buttonClick=async()=>{
    if(myfriend) navigate('/home');
    else{
      //sending request
      const res= await makeRequest(token,user.uid);
      console.log(res);
      if(res.status===200){
        setDone(true);
        setTimeout(() => {
            getPossibleFriends();
          
        }, 800);
      }
    }
  }
  const accept=async()=>{
      // setDone(true);
    const res=await acceptRequest(token,user.uid);
    console.log(res)
    if(res.status===200){
      setDone(true);
      setTimeout(() => {
        getRequests();
      }, 1200);
    }
  }
  const reject=async()=>{
    const res=await rejectRequest(token,user.uid);
    console.log(res)
    if(res.status===200){
      setDone(true);
      setTimeout(() => {
        getRequests();
      }, 1200);
    }
  }
  const friendCheck=async()=>{
    const res= await checkFriend(token,user.uid);
    console.log(res)
    if(res.status===200){
      setIsFriend(res.data);
    }
    else if(res.response.status===404) dispatch(updateFails(true));
  }
  useEffect(()=>{
    if(!request){
      if(myfriend)  setIsFriend(true);
      else friendCheck();
    }
  },[])
  return (
    <Container done={done}>
        <div  onClick={handleClick}>  
        <Avatar src={user.photo} />
        <Entry>
            <Name>{user.name}</Name> 
            <Info>{user.designation}</Info>
        </Entry>
        </div>
        {!request?
        <button onClick={buttonClick}>{isFriend?'Message':'Add Friend'}</button>:
        <div>
          <Circle onClick={accept}><Check sx={{fontSize:'40px',color:'green'}}/></Circle>
          <Circle onClick={reject}><Clear sx={{fontSize:'40px',color:'red'}}/></Circle>
        </div>
        }
    </Container>
  )
}

export default FriendTab
