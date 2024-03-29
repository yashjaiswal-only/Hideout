import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import Search from './SearchChat'
import { useDispatch, useSelector } from 'react-redux'
import {ChatContext} from '../contexts/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { updateChatList } from '../Redux/UserRedux'
import { addChat } from '../Service'

const Wrapper=styled.div`
    width:95%;
    height:90%;
    overflow:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    justify-content: space-between;
    align-items: center;
    margin:0.5rem 0;
    width:100%;
    cursor:pointer;
`
const Image=styled.img`
    width:3rem;
    height:3rem;
    aspect-ratio:1/1;
    border-radius:50%;
`
const Text=styled.div`
    font-size:1rem; 
    margin:0 0.2rem;
    width:80%;
    >span{
        font-weight:600;
    }
    >div{
        font-size:0.7rem;
        display: flex;
        justify-content: space-between;
        >p{
            margin:0;
        }
        >span{
            width:20%;
            font-size:0.7rem;
            color:gray;
        }
    }
`
const Divider=styled.hr`
    width:90%;
    margin:0;
    opacity:0.2;
`
const SearchInput=styled.input`
    width:90%;
`
const ChatList = () => {
    const [chats, setChats] = useState([]);

  const currentUser=useSelector(state=>state.details);
  const chatUsers=useSelector(state=>state.chatUsers);
  const screensize=useSelector(state=>state.screensize);
  const dispatch=useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        console.log(doc.data());
      });

      return () => {
        unsub();
      };
    };
    // dispatch(updateChatList([]))
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    addChat(u,screensize,chatUsers,dispatch);
  };


  const getDate=(param)=>{
    if(!param)  return ;
    var total_miliseconds=(param.seconds+(param.nanoseconds)*0.00000001)*1000
    const messagedate=new Date(total_miliseconds);
    const now=new Date();
    var diff = now.getTime() - messagedate.getTime();
    if(diff>=60000 && diff<3.6e+6){
      return(Math.floor(diff / (1000*60))+"m ago")      
    } 
    else if(diff>=3.6e+6 && diff<8.64e+7){
      return(Math.floor(diff / (1000*60*60))+"h ago")      
    }
    else if(diff>8.64e+7 && diff<2.628e+9){
      return(Math.floor(diff / (1000*60*60*24))+"d ago")      
    }
    else if(diff>2.628e+9 && diff<3.154e+10){
      return(Math.floor(diff / (1000*60*60*24*30))+"mon ago")      
    }
    else if(diff>3.154e+10){
      return(Math.floor(diff / (1000*60*60*24*30*365))+"y ago")
    }
  }
  return (
      <Wrapper>
        <Search/>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
            <>
            <ListItem key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                <Image src={chat[1].userInfo.photoURL}/>
                <Text><span>{chat[1].userInfo.displayName}</span>
                <div><p> {chat[1].lastMessage?.message}</p>
                <span>{getDate(chat[1].date)}</span></div></Text>
            </ListItem>
            <Divider/>
            </>
            ))}
      </Wrapper>
  )
}

export default ChatList
