import styled from "styled-components"
import NotificationList from "./NotificationList"
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import ChatList from "./ChatList";

const Component=styled.div`
    background-color: white;
    position:absolute;
    height:${props=>props.list!=''?'85vh':'10vh'};
    width:${props=>props.list!=''?'30%':'5%'};
    left:${props=>props.list!=''?'20%':'5%'};
    top:10%;
    position:fixed;
    z-index:8;
    border-radius:15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    transition: left 0.5s ease,height 0.3s linear,width 0.3s linear;  
   
    @media  (max-width:600px){
      top:3.5rem;
      height:100%;
      width:${props=>props.list!=''?'80%':'5%'};
      left:${props=>props.list!=''?'17.5%':'5%'};
      transition: left 0.5s ease,width 0.3s linear;  
      position: fixed;
    }
`
const Top=styled.div`
    width:90%;
    height:6%;
    margin:0.6rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight:700;
`
const Block = ({list,showList}) => {
    const [title,setTitle]=useState('');
    useEffect(()=>{
        if(list!=''){
            setTitle(list[0].toUpperCase()+list.slice(1))
        }
        else setTitle(list);
    },[list])
  return (
    <Component list={list}>
      <Top><span>{title!=='' && title}</span>
      <ClearIcon onClick={()=>showList('')} style={{cursor:'pointer'}}/>
      </Top>
      {list==='chats'?<ChatList/>:""}
      {list==='notifications'?<NotificationList/>:""}
    </Component>

  )
}

export default Block
