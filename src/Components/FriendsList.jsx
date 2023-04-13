import React, { useEffect, useState } from 'react'
import {mobile, tab} from '../responsive'
import {Box} from '@mui/material';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import FriendTab from './FriendTab';
import { getAllFriends } from '../ApiCalls/Friend';
import { useSelector } from 'react-redux';
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
    })}
    
`
const List=styled.div`
    width:100%;
    display: flex;
    flex-wrap: wrap;
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

const SearchBox=styled.input`
    width:50%;
    outline:none;
    font-weight:500;
    font-size: 1.5rem;
    line-height: normal;
    padding: 1rem;
    border: 1px solid black;
    width: 80%;
    margin: 2rem;
    border-radius: 2rem;
    background-color: #e1f2f7;
`

// const TabStyled=styled(Tab)`
//   color:black!important;
//   font-weight:600!important;
//   font-size:1.6rem!important;
//   margin:0;
//   padding:0.5rem!important;
//   ${tab({
//     fontSize:'1rem!important'
//   })}
// `
const Tabs=styled.div`
  display: flex;
  justify-content: space-around;
  width:100%;
  `
const Tab=styled.div`
  padding:1rem 0;
  /* background-color: blue; */
  color:${props=>props.index===props.myIndex?'black':'gray'};
  font-weight:600;
  font-size:2rem;
  cursor:pointer;
  position: relative;
  &::after{
    content:'';
    width:${props=>props.index===props.myIndex?'100%':'0%'};
    height:3px;
    background:#3c75de;
    position:absolute;
    left:0rem;
    bottom:1rem;
    transition :0.5s;
  }
  ${tab({
    fontSize:'1.3rem'
  })}
    
`

const FriendsList = () => {
  const [index, setIndex] = React.useState(0);
  const handleChange = (event, newIndex) => {
    setIndex(newIndex);
  };

  //list of friends
  const list=['Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal',]

  //get my friends
  const [friends,setFriends]=useState();
  const token=useSelector(state=>state.token);
  const getFriends=async()=>{
    const res=await getAllFriends(token);
    // console.log(res)
    if(res.status==200){
      setFriends(res.data)
      console.log(res.data) 
    }
    else{
      console.log(res);
      setProfileFetched(0);
    }
  }
  useEffect(()=>{
    if(index===0)    getFriends();
  },[index])
  return (
    <Container>
      <Tabs>
        <Tab index={index} myIndex={0} onClick={()=>setIndex(0)}>My Friends</Tab>
        <Tab index={index} myIndex={1} onClick={()=>setIndex(1)}>Find Friends</Tab>
      </Tabs>
      {index===1 && <SearchBox placeholder='Find Friend'/>}
      <List>
      {list.map(f=>(
          <FriendTab myfriend={index?false:true}/>
          ))}
      </List>
    </Container>
  )
}

export default FriendsList
