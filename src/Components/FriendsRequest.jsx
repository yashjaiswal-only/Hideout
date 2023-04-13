import React from 'react'
import {mobile, tab} from '../responsive'
import {Box} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import FriendTab from './FriendTab';
const Container=styled.div`
    width: 40%;
    margin:1rem;
    height:max-content;
    display: flex;
    flex-direction:column;
    align-items: center;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    align-items: center;
    ${tab({
      width:'50%'
    })}
    ${mobile({
      width:'90%'
    })}
    >h1{
      text-align:center;
    }
`
const List=styled.div`
    width:100%;
    display: flex;
    flex-wrap: wrap;
`

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      sx={{color:'black',fontWeight:'500',fontSize:'1.5rem'
        }}
      {...props}
    />
  );  
}
const FriendsList = () => {
    const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //list of friends
    const list=['Yash Jaiswal','Yash Jaiswal','Yash Jaiswal',]

  return (
    <Container>
    {/* <Box sx={{ width: '100%' }}> */}
        <h1>Friend Requests</h1>
        <List>
        {list.map(f=>(
           <FriendTab/>
            ))}
        </List>
    {/* </Box> */}
    </Container>
  )
}

export default FriendsList
