import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
const Container=styled.div`
    width: 25%;
    display:flex;
    align-items: center;
    flex-direction:column;
    position: fixed;
    right:0;
    height:90vh;
    ${mobile({
      display:'none'
    })}
`
const Wrapper=styled.div`
    width:100%;
    height:100%;
    overflow-y:auto;
    overflow-x:hidden;
    direction: rtl; 
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
const Block=styled.img`
    width:90%;
    height:200px;
    border:2rem;
    margin:1rem;
    border-radius:15px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
`
const Right = () => {
  return (
    <Container>
      <Wrapper>
        <Block style={{height:'300px'}} src='https://media.sproutsocial.com/uploads/2018/05/Facebook-Ad-Examples.png'/>
        <Block style={{height:'350px'}} src='https://blog.hubspot.com/hs-fs/hubfs/298_Social%20Media%20Campaign%20Ideas.jpg?width=595&height=400&name=298_Social%20Media%20Campaign%20Ideas.jpg'/>
        <Block style={{height:'350px'}} src='https://images.pexels.com/photos/5361247/pexels-photo-5361247.jpeg?auto=compress&cs=tinysrgb&w=600'/>
        <Block style={{height:'300px'}} src='https://smartblogger.com/wp-content/uploads/2222/12/social-media-advertising-700.png'/>
    </Wrapper>
    </Container>
    
  )
}

export default Right;
