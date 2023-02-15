import React from 'react'
import styled from 'styled-components';
import pic from '../Data/pic.png'

const Wrapper=styled.div`
    width:95%;
    height:90%;
    overflow:auto;
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
    margin:1rem 0;
`
const Image=styled.img`
    width:2rem;
    height:2rem;
    aspect-ratio:1/1;
    border-radius:50%;
`
const Text=styled.div`
    font-size:0.8rem; 
    font-weight:600;
    margin:0 0.2rem;
    >p{
        margin:0;
    }
    >span{
        font-size:0.7rem;
        color:gray;
    }
`
// const Wrapper=styled.div``

const NotificationList = () => {
  return (
   
      <Wrapper>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
            <ListItem>
                <Image src={pic}/>
                <Text><p>Sunny Graham voted for Reforest the amazon Rainforest</p><span>2h ago</span></Text>
            </ListItem>
      </Wrapper>
  )
}

export default NotificationList
