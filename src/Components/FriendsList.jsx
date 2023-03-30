import React from 'react'
import {mobile, tab} from '../responsive'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import pic from '../Data/pic.png'
const Container=styled.div`
    width: 60%;
    margin:1rem;
    height:max-content;
    display: flex;
    flex-direction:column;
    align-items: center;
    ${tab({
      width:'50%'
    })}
    ${mobile({
      width:'90%'
    })}
`
const List=styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    margin-top:1rem;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    >div{
        width:100%;
        padding:0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        >img{
            width:50px;
        }
    }
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

const SearchBox=styled.input`
    width:50%;
    padding:0.5rem 1rem;
    /* border-radius:20px; */
    margin:1rem;
    /* border:none; */
    outline:none;
    font-size:1.2rem;
    font-weight:400;
    /* background-color: oldlace; */
`
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      sx={{color:'black',fontWeight:'500',fontSize:'1.2rem'
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
            <>
              <div>
                 <Avatar src={pic} />
                <Entry>
                    <Name>Yash Jaiswal</Name>
                    <Date>7 Feb at 11:27pm</Date>
                </Entry>
                <button>Add Friend</button>
            </div>
            <hr style={{color:'black',width:'100%'}}/>
            </>
            ))}
        </List>
    </Box>
    </Container>
  )
}

export default FriendsList
