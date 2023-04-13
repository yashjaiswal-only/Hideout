import React from 'react'
import {mobile, tab} from '../responsive'
import {Box} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import FriendTab from './FriendTab';
const Container=styled.div`
    width: 50%;
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
`
const List=styled.div`
    width:90%;
    display: flex;
    flex-wrap: wrap;
`

const SearchBox=styled.input`
    width:50%;
    outline:none;
    font-weight:500;
    font-size: 1.5rem;
    line-height: normal;
    padding: 1rem;
    border: 1px solid black;
    width: 80%;
    margin: 2rem;
    border-radius: 2rem;
    background-color: #e1f2f7;
`
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      sx={{color:'black',fontWeight:'600',fontSize:'2rem'
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
  const list=['Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal','Yash Jaiswal',]

  return (
    <Container>
    <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <LinkTab label="My Friends" href="/drafts" />
            <LinkTab label="Find Friends" href="/trash" />
        </Tabs>
        {value===1 && <SearchBox placeholder='Find Friend'/>}
        <List>
        {list.map(f=>(
           <FriendTab myfriend={value?false:true}/>
            ))}
        </List>
    </Box>
    </Container>
  )
}

export default FriendsList
