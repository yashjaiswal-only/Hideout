import React from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import mobile from '../responsive'

const Container=styled.div`
    width:100%;
    padding:1rem;   
    display: flex;
    justify-content: space-between;
    margin:1rem;
    border-bottom:1px solid gray;  
    >div{
        display: flex;
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
`
const Name=styled.span`
    margin:0;
    font-size:1.6rem;
    color:black;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.8rem',
    })}
`
const Info=styled.span`
    margin:0;
    font-size:1.2rem;
    color:gray;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.6rem',
    })}
`
const FriendTab = ({myfriend}) => {
  return (
    <Container>
        <div>
        <Avatar src={pic} />
        <Entry>
            <Name>Yash Jaiswal</Name>
            <Info>7 Feb at 11:27pm</Info>
        </Entry>
        </div>
        <button>{myfriend?'Message':'Add Friend'}</button>
    </Container>
  )
}

export default FriendTab
