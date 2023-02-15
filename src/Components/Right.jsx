import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    width: 20%;
    display:flex;
    align-items: center;
    flex-direction:column;
`
const Block=styled.div`
    width:90%;
    height:20rem;
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
      <Block></Block>
      <Block></Block>
      <Block></Block>
      <Block></Block>
    </Container>
  )
}

export default Right;
