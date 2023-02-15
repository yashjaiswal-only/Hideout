import React from 'react'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import pic from '../Data/pic.png'

const Component=styled.div`
    height:${props=>props.on==true?'85vh':'0'};
    background-color: white;
    /* background:none; */
    width:${props=>props.on==true?'25%':'0'};
    position:absolute;
    left:${props=>props.on==true?'20%':'5%'};
    top:10%;
    position:fixed;
    z-index:8;
    border-radius:15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    transition: left 1s ease,height 0.5s linear,width 0.5s linear;  
`
const Top=styled.div`
    width:90%;
    height:6%;
    margin:0.6rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight:700;
`
const Wrapper=styled.div`
    width:95%;
    height:90%;
    overflow:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::-webkit-scrollbar {
        width: 1px;
        color:red;
    }
    
`
const ListItem=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:0.5rem 0;
    width:100%;
    /* border-top:1px solid gray;
    border-bottom:1px solid gray; */
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
const ChatList = ({on,togChat}) => {
  return (
    <Component on={on}>
      <Top><span>Chats</span><ClearIcon onClick={()=>togChat(false)} style={{cursor:'pointer'}}/></Top>
      <Wrapper>
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
    </Component>
  )
}

export default ChatList
