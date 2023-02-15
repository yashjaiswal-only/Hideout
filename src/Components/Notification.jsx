import React from 'react'
import styled from 'styled-components';
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
    &::-webkit-scrollbar {
        width: 1px;
        color:red;
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

const Notification = ({on,togNot}) => {
  return (
    <Component on={on}>
      <Top><span>Notification</span><ClearIcon onClick={()=>togNot(false)} style={{cursor:'pointer'}}/></Top>
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
    </Component>
  )
}

export default Notification
