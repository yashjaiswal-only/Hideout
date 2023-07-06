import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import {mobile} from '../responsive'
import { useNavigate } from 'react-router-dom';
const Container=styled.div`
  width:200px;
  height:200px;
  background-color: white;
  margin:0.5rem;
  border-radius:10%;
  position: relative;
  img{
    object-fit:cover;
    border-radius:5%;
    width:100%;
    height:100%;
  }
  ${mobile({
    width:'100px',
    height:'100px'
  })}
`
const Details=styled.div`
  position: absolute;
  bottom:0;
  width:100%;
  height:30%;
  background-color: rgba(0,0,0,0.8);
  overflow:hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  color:white;
  /* padding:0.5rem; */
  ${mobile({
    fontSize:'0.5rem'
  })}
  >span{
    font-size:0.8rem;
    text-align:center;
    ${mobile({
      fontSize:'0.4rem'
    })}
  }
`
const Option=styled.div`
  cursor: pointer;
  background:rgba(0,0,0,0.5);
  /* margin:0.5rem;  */
  width:90%;
  height:90%;
  border-radius:50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0.2rem; 
  >svg{
    /* font-size:1rem; */
    ${mobile({
      fontSize:'1rem'
    })}
  }
`
const style={
  position:'absolute',
  top:0,
  right:0,
  width:'25%',
  height:'25%',
  display:'flex',
  alignItems:'center',
  zIndex:500,
  justifyContent:'center'
}
const MenuListComposition=()=>{
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2} style={style}>
     
        <Option
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        ><MoreVertIcon sx={{color:'white'}}/></Option>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-end' ? 'right top' : 'right bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Add Friend</MenuItem>
                    <MenuItem onClick={handleClose}>Confirm request</MenuItem>
                    <MenuItem onClick={handleClose}>Message</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </Stack>
  );
}
const FriendCard = ({friend}) => {
  console.log(friend)
  const navigate=useNavigate();
  const gotoProfile=()=>{
      navigate('/profile/'+friend.uid)
  }
  return (
    <Container onClick={gotoProfile}>
      <img src={friend.photo}/>
       {/* <MenuListComposition/> */}
      <Details>
          {friend.name}
          <span>{friend.designation}</span>
      </Details>
    </Container>
  )
}

export default FriendCard
