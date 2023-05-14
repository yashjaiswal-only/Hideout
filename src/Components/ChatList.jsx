import React from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png'
import Search from './SearchChat'


const Wrapper=styled.div`
    width:95%;
    height:90%;
    overflow:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
const ListItem=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:0.5rem 0;
    width:100%;
    cursor:pointer;
`
const Image=styled.img`
    width:3rem;
    height:3rem;
    aspect-ratio:1/1;
    border-radius:50%;
`
const Text=styled.div`
    font-size:1rem; 
    margin:0 0.2rem;
    width:80%;
    >span{
        font-weight:600;
    }
    >div{
        font-size:0.7rem;
        display: flex;
        justify-content: space-between;
        >p{
            margin:0;
        }
        >span{
            width:20%;
            font-size:0.7rem;
            color:gray;
        }
    }
`
const Divider=styled.hr`
    width:90%;
    margin:0;
    opacity:0.2;
`
const SearchInput=styled.input`
    width:90%;
`
const ChatList = () => {
  return (
      <Wrapper>
        {/* <SearchInput/> */}
        <Search/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
      
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
      
            <ListItem>
                <Image src={pic}/>
                <Text><span>Sunny Graham</span>
                <div><p> he voted for  amazon Rainforest</p>
                <span>2h ago</span></div></Text>
            </ListItem>
            <Divider/>
      
      </Wrapper>
  )
}

export default ChatList
