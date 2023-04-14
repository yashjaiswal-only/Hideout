import React from 'react'
import {Box, CircularProgress} from '@mui/material';
import styled from 'styled-components';
import mobile from '../responsive';
const Container=styled.section`
    position: absolute;
    width:100%;
    height:100%;
    margin:auto;
    background-color: rgba(0,0,0,0.05);
    z-index:1000;
    top:0;
    display: flex;align-items: center;justify-content: center;
    display:${props=>(props.fails===true)?'flex':'none'};
    transition:display 3s ease;
    >div{
        width:50%;
        height:50%;
        background-color: #fff;
        display: flex; flex-direction: column;justify-content: center;align-items: center;
        font-family:'Ubuntu', Helvetica, Arial, sans-serif;
        font-size:2rem;
        justify-content: space-evenly;
        ${mobile({
            fontSize:'1.5rem',
            width:'70%'
        })}
    }
    
`
const Warning = ({fails}) => {
    console.log(fails)
  return (
    <Container fails={fails}>
        <div>
            <span>Your session expired!</span>
            <span>Redirecting to login page</span>
            <CircularProgress/>
        </div>
    </Container>
  )
}

export default Warning;
