import React from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png';
import cover from '../Data/cover.jfif'
import { mobile } from '../responsive';
const Container=styled.div`
  width:90%;
  min-height:20vh;
  border-radius:15px;
  margin:0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
  ${mobile({
    display:'none',
  })}
`
const Up=styled.div`
    flex-basis:50%;
    width:90%;
    margin:0.3rem 0;
    min-height:4rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CoverImg=styled.img`
    width:100%;
    height:80%;
    border-radius:10px;
`
const Image=styled.img`
  width:25%;
  aspect-ratio:1/1;
  /* height:90%; */
  border-radius:50%;
  position:absolute;
  bottom:0;
`
const Down=styled.div`
    flex-basis:50%;
    width:90%;
    margin:0.3rem 0;
    display: flex;
    flex-direction: column;
`

const Span=styled.button`
    font-size:${props=>props.name?'0.9rem':'0.7rem'};
    font-weight:${props=>props.name?'600':'600'};
    color:${props=>props.name?'black':'gray'};
    background:none;
    border:none;
`
const Button=styled.button`
    border:none;
    border-radius:10px;
    padding:0.4rem 0;
    font-size:0.7rem;
    color:white;
    background-color: blue;
`
const Mysection = () => {

  return (
    <>
    <Container>
      <Up >
        <CoverImg src={cover} />    
        <Image src={pic}/>
      </Up>
      <Down>
        <Span name={1}>Yash Jaiswal </Span>
        <Span >389 friends</Span>
        <Button>
            My Profile
        </Button>
      </Down>
    </Container>
    </>
  )
}

export default Mysection
