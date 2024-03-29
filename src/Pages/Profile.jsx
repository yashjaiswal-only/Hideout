import React from 'react'
import styled from 'styled-components'
import profilebg from '../assets/profileBg.jpg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedIcon from '@mui/icons-material/Verified';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Topbar from '../Components/Topbar'
import Sidebar from '../Components/Sidebar'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import mobile, { tab } from '../responsive'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noprofile from '../assets/Forgot password.gif'
import Loader from '../Components/Loader'; 
import { endLoading, startLoading, updateChatList, updateFails } from '../Redux/UserRedux';
import { getUserDetails } from '../ApiCalls/User';
import Post from '../Components/Post';
import FriendCard from '../Components/FriendCard';
import { checkFriend, checkRequestSent, getAllFriends, getAllRequest, makeRequest, removeFriend } from '../ApiCalls/Friend';
import { getMyPosts } from '../ApiCalls/Post';
import { addChat, defaultPost1, defaultPost2, defaultPost3 } from '../Service';
import { PeopleOutlineOutlined } from '@mui/icons-material';

const Container=styled.div`
    width: 100%;
    min-height: 100vh;
`
const Content=styled.div`
    width: 100%;
    top:3rem;
    height:max-content;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`
const Display=styled.div`
    width:75%;
    margin-left:20%;
    /* margin-right:25%; */
    /* display: flex;
    align-items: center;
    justify-content: space-around; */
    background-color: white;
    min-height:100vh;
    ${mobile({
      width:'85%',
      marginLeft:'15%',
      justifyContent:'center'
    })}
`
const Head=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:50vh;
  width:100%;
  position: relative;
  background-color: white;
  ${tab({
    // height:'30vh'
  })}
  ${mobile({
    height:'30vh'
  })}
  >div{
    display: flex;
    width:90%;
    flex-direction:row-reverse;
    align-items: center;
    ${mobile({
      width:'100%'
    })}
    
  }
  
`
const CoverImg=styled.img`
  width:100%;
  height:60%;
  object-fit:cover;
`
const ProfileImg=styled.img`
    position: absolute;
    width:200px;
    height:200px;
    border-radius:50%;
    bottom :1rem;
    left :3rem;
    /* top:20%; */
    border:5px solid white;
    ${mobile({
      width:'100px',
      height:'100px',
      left:'1rem',
      bottom:'1rem'
    })}
`
const Option=styled.span`
  border-radius:50%;
  border:1px solid gray;
  align-items: center;
  display: flex;
  justify-content: center;
  width:50px;
  height:50px;
  margin:20px;
  cursor: pointer;
  >a{
    color:inherit;
  }
  ${mobile({
    width:'30px',
    height:'30px',
  })}
`
const Wrapper=styled.div`

  padding:0 80px;
  ${mobile({
    padding:'0 20px'
  })}
`
const Info=styled.div`
    >span{
      display: flex;
      align-items: center;
      font-size:2rem;
      font-weight:900;
      font-family: 'Trocchi', serif;
      ${mobile({
        fontSize:'1.5rem'
      })}
    }
    >div{
      font-size:1.2rem;
      padding:1rem 0;
      font-weight: 500;
      ${mobile({
        fontSize:'1rem'
      })}
    }
    svg{
      margin:0 4px;
    }
    p{
      display: flex;
      align-items: center;
      font-size:1rem;
      font-weight:600;
      margin:0.5rem 0;
      color:#5f5d5d;
      span{
        font-weight:700;
        color:black;
        margin:4px;
      }
    }
`
const Skills=styled.div`
  display: flex;
  flex-wrap:wrap;
  span{
    cursor: pointer;
    padding:0.4rem 0.8rem;
    font-size:1rem;
    font-weight:700;
    margin:0.5rem;
    border:1px solid black;
    border-radius:20px;
    ${mobile({
      fontSize:'0.6rem',
      margin:'0.2rem'
    })}
  }
`
const Links=styled.div`
  color:white;
  display: flex;
  flex-wrap:wrap;
  margin:1rem 0;
  >a{
    text-decoration:none;
    color:white;
  }
  span{
    cursor:pointer;
    background-color: black;
    margin:0.5rem;
    padding:0rem 0.6rem;
    align-items: center;display: flex; justify-content: center;
    height:40px;
    width:max-content;  
    border-radius:40px;
    ${mobile({
      fontSize:'0.8rem',
      height:'30px',
      margin:'0.2rem'
    })}
  }
  i{
    color:white;
    margin:2px;
    ${mobile({
      fontSize:'0.8rem'
    })}
  }
`
const Work=styled.div`
    background-color: #e8cde1;
    width:max-content;
    padding:1rem;
    color:black;
    font-weight:600;  
    border-radius:10px;
    margin:1rem;
    position: relative;
    h3{
        margin:0;
        font-weight:600;
        font-size:1.2rem;
    }
    h6{
        margin:0;
        font-weight:600;
        font-size:1rem;
    }
    span{
        font-weight:400;
    }
    &:hover{
        opacity:0.5;
        cursor:pointer;
        transform:scale(1.1);
        transition:transform 0.5s ease;
        >div{
            display:flex;
        }
    }
`
const WorkList=styled.div`
    display: flex;
    flex-wrap:wrap;
   
`
const Error=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:1rem;
`
const Tabs=styled.div`
  display: flex;
  justify-content: space-around;
  `
const Tab=styled.div`
  padding:1rem;
  width:20%;
  text-align:center;
  background-color:${props=>props.index===props.myIndex?'#e5e5e5':''};
  color:${props=>props.index===props.myIndex?'black':'gray'};
  transition:background 0.5s ease;
  font-weight:600;
  font-size:2rem;
  cursor:pointer;
  position: relative;
  width:max-content;
  &::after{
    content:'';
    width:${props=>props.index===props.myIndex?'100%':'0%'};
    height:3px;
    background:#3c75de;
    position:absolute;
    left:0rem;
    bottom:0rem;
    transition :0.5s;
  }
  ${mobile({
    fontSize:'1.5rem'
  })}
    
`
const ShowFriends=styled.div`
  display: flex;
  height:max-content;
  flex-wrap:wrap;
  width:100%;
  overflow:auto;
` 
const Bottom=styled.div`
  position: relative;
`
const Points=styled.section`
  display: flex;
  ${tab({
    flexDirection:'column',
    alignItems:'flex-start'
  })}
`
const Point=styled.span`
  display: flex;
  align-items: center;
  margin:1rem 0.5rem;
  font-size:1.2rem;
  color:#5f5d5d;
  font-weight: 500;
  cursor: pointer;
  a{
    display: flex;
    color:inherit;
    text-decoration:none;
  }
  ${mobile({
    fontSize:'1rem'
  })}
`
const Show=styled.div`
  width: 50%;
  margin:auto;
  display: flex;
  flex-direction:column;
  align-items: center;
  ${tab({
    width:'80%'
  })}
  ${mobile({
    width:'100%'
  })}
`
const Button1=styled.button`
  padding:0.3rem 0.6rem;
  height:50px;
  margin:1rem;
  background-color: #3b5998 ;
  color:white;
  cursor: pointer;
  font-size:1rem;
  border:none;
  border-radius:10px;
  background: rgb(22,9,240);
  background: linear-gradient(0deg, rgba(22,9,240,1) 0%, rgba(49,110,244,1) 100%);
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  font-family: 'Lato', sans-serif;
  ${tab({
    margin:'0.5rem',
    fontSize:'0.8rem',
    padding:'0.1rem 0.4rem',
    height:'40px'
  })}
  ${mobile({
    margin:'0.5rem',
    fontSize:'0.6rem',
    padding:'0 0.3rem',
    height:'30px'
  })}
`
const Button2=styled.button`
  padding:0.3rem 0.6rem;
  height:50px;
  margin:1rem;
  background-color: #3b5998 ;
  color:white;
  cursor: pointer;
  font-size:1rem;
  font-family: 'Lato', sans-serif;
  border:none;
  border-radius:10px;
  background-color: #89d8d3;
  background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  border: none;
  z-index: 1;
  ${tab({
    margin:'0.5rem',
    fontSize:'0.8rem',
    padding:'0.1rem 0.4rem',
    height:'40px'
  })}
  ${mobile({
    margin:'0.5rem',
    fontSize:'0.6rem',
    padding:'0 0.3rem',
    height:'30px'
  })}
`
const style={
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
}
const MenuListComposition=({friend,uid})=>{
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
  
  //make request
  const token=useSelector(state=>state.token)
  const addFriend=async()=>{
    const res=await makeRequest(token,uid);
    console.log(res)
    
  }
  const deleteFriend=async()=>{
    const res=await removeFriend(token,uid);
    console.log(res)
  }
  return (
    <Stack direction="row" spacing={2} style={style}>
     
        <Option
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        ><MoreVertIcon sx={{}}/></Option>
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
                    {friend?
                    <>
                        <MenuItem onClick={deleteFriend}>Remove Friend</MenuItem>
                    </>:
                    <>
                        <MenuItem  onClick={addFriend}>Add Friend</MenuItem>
                    </>}

                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </Stack>
  );
}
const Profile = ({handleOpen}) => {
  //show index ,post vs friends
  const [index,setIndex]=useState(0);
  const navigate=useNavigate()
  const location=useLocation();
  const token=useSelector(state=>state.token)
  const screensize=useSelector(state=>state.screensize)
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch();
  const [profileFetched,setProfileFetched]=useState(0);
  const [friends,setFriends]=useState([]);
  const [isFriend,setIsFriend]=useState(false);
  const [isRequestSent,setIsRequestSent]=useState(false);
  const [posts,setPosts]=useState([]);
  const [details,setDetails]=useState(null);
  const mydetails=useSelector(state=>state.details);

  const fetchAllPosts=async(profileUID)=>{
    //get posts
    var res=await getMyPosts(token,profileUID);
    // console.log(res);
    if(res.status==200){
      setPosts(res.data);
      console.log(res.data);
    }
    else if(res.response.status===404)  dispatch(updateFails(true))
    else{
      console.log(res);
      setProfileFetched(0);
    }
  }
  const getFriends=async(profileUID)=>{
    const res=await getAllFriends(token,profileUID);
    // console.log(res)
    if(res.status==200){
      setFriends(res.data)
      console.log(res.data)
    }
    else if(res.response.status===404)  dispatch(updateFails(true))
    else{
      console.log(res); 
      setProfileFetched(0);
    }
  }
  //load profile details
 const loadProfile=async(profileUID)=>{
  setFriends([])
  setPosts([])
  setLoading(true)
  if(profileUID && mydetails.uid!=profileUID){
    //get profile
    let res=await getUserDetails(token,profileUID);
    console.log('userdetalis')
    console.log(res)
    if(res.status==200){
      setDetails(res.data)
      setProfileFetched(1);
    }
    else if(res.response.status===404)  dispatch(updateFails(true))
    else{
      console.log(res);
      setProfileFetched(0);
    }
  }
  else{
    console.log('already exist')
    setDetails(mydetails);
    setProfileFetched(1);
  }
  getFriends(profileUID)
  fetchAllPosts(profileUID);    //get all posts 
  setLoading(false)
}
useEffect(()=>{  
  const profileUID=location.pathname.slice(9);
  console.log(profileUID)
    loadProfile(profileUID);
    friendCheck(profileUID);
    requestCheck(profileUID)
    window.scrollTo(0,0)
 },[location])

 const chatUsers=useSelector(state=>state.chatUsers)
 const sendMessage=()=>{
    const x={
      uid:details.uid,
      photoURL:details.photo,
      displayName:details.name
    }
    addChat(x,screensize,chatUsers,dispatch);
  }
  const friendCheck=async(id)=>{
    if(id==mydetails.uid){
      setIsFriend(-1);
      return ;
    }
    const res= await checkFriend(token,id);
    if(res.status===200){
      setIsFriend(res.data);
    }
    else if(res.response.status===404) dispatch(updateFails(true));
  }
  const requestCheck=async(id)=>{
    if(id==mydetails.uid){
      setIsRequestSent(-1);
      return ;
    }
    console.log('checking request')
    const res= await checkRequestSent(token,id);
    console.log(res)
    if(res.status===200){
      setIsRequestSent(res.data);
    }
    // else if(res.response.status===404) dispatch(updateFails(true));
  }
  return (
   <>
   {
    !loading? 
    <Container>
      {
        profileFetched?
        <>
         <Topbar handleOpen={handleOpen}/>
         <Content>

          <Head>
            <CoverImg src={profilebg}/>
            <ProfileImg src={details.photo}/>
            {isFriend!==-1?<div>
              {/* <MenuListComposition uid={details.uid}/> */}
              <Button1 onClick={sendMessage}>
                Message
              </Button1>
              {!isFriend?<Button2>Add Friend</Button2>:''}
            </div>:''}
          </Head>

          <Wrapper>
            <Info>
              <span>{`${details.name}`}
              <VerifiedIcon sx={{color:'blue'}}/>
              </span>
              <div>{details.about}</div>
              <Points >
                <Point>
                  <FmdGoodIcon />{details.address.city} &bull; {details.address.state} &bull; {details.address.country} &emsp;
                </Point>
                <Point>
                   <CalendarMonthIcon /> Joined {details.createdAt.slice(0,10)} 
                </Point>
                <Point>
                <a href={`mailto:${details.email}`}><MailOutlineIcon/> {details.email}</a>
                </Point>
              </Points>
              <p>
                <span>{friends.length}</span> Friends <PeopleOutlineOutlined/> 
                {/* <span> 45</span> Mutual Friends */}
              </p>
            </Info>
     
            <Links>
            <a target="_blank" href={`${details.social_links.linkedIn}`}><span><i className="fa-brands fa-linkedin-in"></i>LinkedIn</span></a>
            <a target="_blank" href={`${details.social_links.github}`}><span><i className="fa-brands fa-github"></i> Github</span></a>
            <a target="_blank" href={`${details.social_links.instagram}`}> <span><i className="fa-solid fa-pen-to-square"></i> Instagram</span></a>
            </Links>
            </Wrapper>
         </Content>
            <Tabs>
              <Tab index={index} myIndex={0} onClick={()=>setIndex(0)}>Posts</Tab>
              <Tab index={index} myIndex={1} onClick={()=>setIndex(1)}>Friends</Tab>
            </Tabs>
            <Bottom>
            {index===0?
            <Show>
              {posts.length?posts.map((p)=>(
                <Post post={p}  key={p._id} fetchAllPosts={fetchAllPosts}/>
              )): 
                (mydetails.uid===details.uid?
                <Post post={defaultPost1}/>:
                <div style={{fontSize:'2rem',fontWeight:'600'}}>
                No Posts to Show
                </div>
                )
              }
            </Show>:
              (
                  friends.length?
                  <ShowFriends> 
                  {friends.map(f=>(
                    <FriendCard friend={f} key={f._id}/>
                  ))}
                </ShowFriends>:
                (mydetails.uid===details.uid?<Show>
                  <Post post={defaultPost3}/>
                </Show>:
                <div style={{fontSize:'2rem',fontWeight:'600'}}>
                No Friends to Show
                </div>
                )
              )
            }
            </Bottom>
        </>:
        <Error>
         No Profile Available , Kindly  <span 
         style={{color:'blue',textDecoration:'underline',cursor:'pointer'}} onClick={()=>navigate('/')}>Login</span> 
            <img src={noprofile}/>
        </Error>
      }
      
    </Container>:
    <Loader/>
   }
   </>
  )
}

export default Profile
