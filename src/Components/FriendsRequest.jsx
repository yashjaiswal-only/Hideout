import React from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import { mobile, tab } from '../responsive'
import FriendTab from './FriendTab'
const Container=styled.div`
    width:35%;
    height:max-content;
    margin:1rem;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    >h1{
      text-align:center;
    }
    ${tab({
      width:'50%'
    })}
    ${mobile({
      width:'90%'
    })}
`
const List=styled.div`
    width:90%;
    display: flex;
    flex-wrap: wrap;
`

const Avatar=styled.img`
  width:50px;
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      // width:'12%'
  })}
`
const Entry=styled.div`
    margin:0rem 10px;
    display: flex; justify-content: center; flex-direction: column;
`
const Name=styled.span`
    margin:0;
    font-size:1.2rem;
    color:black;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.8rem',
    })}
`
const Date=styled.span`
    margin:0;
    font-size:0.8rem;
    color:gray;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.6rem',
    })}
`
const FriendsRequest = () => {
  //list of friends
  const list=['Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal',]
  return (
    <Container>
      <h1>Friend Requests</h1>
      <List>
        {list.map(f=>(
           <FriendTab/>
            ))}
        </List>
    </Container>
  )
}

export default FriendsRequest
