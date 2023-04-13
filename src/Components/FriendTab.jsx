import React from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import mobile from '../responsive'

const Container=styled.div`
    width:100%;
    /* background-color: red; */
    padding:1rem;   
    display: flex;
    justify-content: space-between;
    margin:1rem;
    border-bottom:1px solid gray;  
    >div{
        display: flex;
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
const Date=styled.span`
    margin:0;
    font-size:1.2rem;
    color:gray;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.6rem',
    })}
`
const FriendTab = () => {
  return (
    <Container>
        <div>
        <Avatar src={pic} />
        <Entry>
            <Name>Yash Jaiswal</Name>
            <Date>7 Feb at 11:27pm</Date>
        </Entry>
        </div>
        <button>Add Friend</button>
    </Container>
  )
}

export default FriendTab
