import React from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import mobile, { tab } from '../responsive'
import { Check, Clear } from '@mui/icons-material'

const Container=styled.div`
    width:100%;
    padding-bottom:1rem;   
    display: flex;
    justify-content: space-between;
    margin:1rem;
    border-bottom:1px solid gray;  
    >div{
        display: flex;
        align-items: center;
    }
    >button{
        height:max-content; 
        margin:auto;
        font-weight:500;
        font-size:1rem;
        background-color: cornflowerblue;
        border: none;
        outline: none;
        color: white;
        padding: 0.5rem;
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
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      // width:'12%'
  })}
`
const Entry=styled.div`
    margin:0rem 30px;
    display: flex; justify-content: center; flex-direction: column;
    ${tab({
      margin:'0 15px',
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
const FriendTab = ({myfriend,request,user}) => {
  return (
    <Container>
        <div>
        <Avatar src={user.photo} />
        <Entry>
            <Name>{user.name}</Name>
            <Info>{user.designation}</Info>
        </Entry>
        </div>
        {!request?
        <button>{myfriend?'Message':'Add Friend'}</button>:
        <div>
          <Circle><Check sx={{fontSize:'40px',color:'green'}}/></Circle>
          <Circle><Clear sx={{fontSize:'40px',color:'red'}}/></Circle>
        </div>
        } 
    </Container>
  )
}

export default FriendTab
