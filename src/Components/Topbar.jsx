import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HouseIcon from '@mui/icons-material/House';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import WorkIcon from '@mui/icons-material/Work';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import React from 'react'
import styled from 'styled-components';
import pic from '../Data/pic.png'
import hideout from '../Data/hideout.png'
import {mobile} from '../responsive'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar=styled.div`
    width: inherit;
    height:3rem;
    background-color:white;
    position: fixed;
    z-index:100;
    top:0;
    left:0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Icons=styled.div`
    display: flex;
    width:40%;
    height:90%;
    align-items: center;
    justify-content: space-between;
    ${mobile({
      width:'60%',
    })}
`
const IconItem=styled.div`
  height:100%;
  display: flex; align-items: center; justify-content: center;
  min-width:  18%;
  &:hover{
    opacity:0.5;
    cursor:pointer;
    background-color: white;
  }
`
const Right=styled.div`
   height:100%;
   width:15%;
   display: flex; align-items: center; justify-content: center;
`
const Logo=styled.div`
  flex-basis:15%;
  height:100%;
  display: flex; align-items: center; 
  ${mobile({
      display:'none'
    })}
  >img{
    width:90%;
    height:70%;
  }
`
const Search=styled.input`
  width:10%;
  ${mobile({
    width:'20%',
    height:'2rem'
  })}
  outline:none;
  border:none;
  border-radius:28px;
  height:2.5rem;
  padding:0rem 1rem;
  background-color: #e1f2f7;
  `

const Topbar = ({handleOpen}) => {
  // ---------profilemenu--------------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ---------profilemenu--------------------
  
  //use details
  const details=useSelector(state=>state.details)
  const navigate=useNavigate();
  return (
    <Navbar>  
      <Logo><img src={hideout}/></Logo>
      <Search type='text' placeholder='Search' />

      <Icons>
      <IconItem onClick={()=>navigate('/home')}><HouseIcon/></IconItem>
      <IconItem><NewspaperIcon/></IconItem>
      <IconItem><OndemandVideoIcon/></IconItem>
      <IconItem><WorkIcon/></IconItem>
      <IconItem onClick={()=>handleOpen()}> <AddBoxIcon/> </IconItem>
      </Icons>

      <Right>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}><img style={{width:'100%'}} src={details.photo}/></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>navigate('/profile/'+details.uid)}>
          <Avatar><img style={{width:'100%'}} src={details.photo}/></Avatar> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </Right>

    </Navbar>
  )
}

export default Topbar;
 