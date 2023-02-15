import React from 'react'
import styled from 'styled-components'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import TelegramIcon from '@mui/icons-material/Telegram';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {mobile} from '../responsive'
import logosm from '../Data/logo sm.png'
const Container=styled.div`
    width: 90%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    border-radius:15px;
    ${mobile({
        height:'100%',
        borderRadius:'0px',
        width:'100%'
    })}
`
const Option=styled.div`
    width:90%;
    border-radius:10px;
    margin:0.4rem 0;
    display: flex;
    align-items: center;
    justify-content:center;
    overflow:hidden;
    cursor:pointer;
    >div{
        display: flex;
        align-items: center;
        justify-content:center;
        padding:0.4rem 0.6rem;
        width:90%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        >span{
            margin-left:1rem;
            color:#736161;
            font-weight:600;
            text-align:center;
            ${mobile({
                fontSize:'0.5rem',
                marginLeft:'0'
            })}
        }
        ${mobile({
            flexDirection:"column"
        })}
    }
  
    &:hover{
        background-color:#e1f2f7;
    }
    ${mobile({
        borderRadius:'5px',
        margin:'0.8rem 0'
    })}
`
const Logo=styled.img`
    object-fit:cover;
    width:90%;
`
const SideMenu = ({togChat,togNot}) => {
    let width = window.innerWidth;  
  return (
    <Container>
        {width<500 && <Option><Logo src={logosm}/></Option>}
        <Option><div><DynamicFeedIcon sx={{color:'gray' }}/><span>My Posts</span></div></Option>
        <Option><div><DataThresholdingIcon sx={{color:'gray' }}/><span>Activity</span></div></Option>
        <Option onClick={()=>togChat(true)}><div><TelegramIcon sx={{color:'gray' }}/><span>Chats</span></div></Option>
        <Option onClick={()=>togNot(true)}><div><NotificationsNoneIcon sx={{color:'gray' }}/><span>Notification</span></div></Option>
        <Option><div><SettingsIcon sx={{color:'gray' }}/><span>Settings</span></div></Option>
        <Option><div><ConnectWithoutContactIcon sx={{color:'gray' }}/><span>Contact Us</span></div></Option>
        <Option><div><RateReviewIcon sx={{color:'gray' }}/><span>Feedback </span></div></Option>
    </Container>
  )
}

export default SideMenu
