import React from 'react'
import styled from 'styled-components'
import profilebg from '../assets/profileBg.jpg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Topbar from '../Components/Topbar'
import Sidebar from '../Components/Sidebar'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import mobile, { tab } from '../responsive'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noprofile from '../assets/Forgot password.gif'
import Loader from '../Components/Loader'; 
import { endLoading, startLoading } from '../Redux/UserRedux';
import { getUserDetails } from '../ApiCalls/User';
import Post from '../Components/Post';
import FriendCard from '../Components/FriendCard';
import { getAllFriends, getAllRequest } from '../ApiCalls/Friend';
import { getMyPosts } from '../ApiCalls/Post';

const Container=styled.div`
    width: 100%;
    min-height: 100vh;
`
const Content=styled.div`
    width: 100%;
    position: relative;
    top:3rem;
    min-height: 100vh;
    /* background-color: #e1f2f7; */
    background-color: #fff;
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
  button{
    padding:0.3rem 0.6rem;
    height:50px;
    margin:1rem;
    background-color: #3b5998 ;
    color:white;
    cursor: pointer;
    font-size:1rem;
    border:none;
    border-radius:10px;
    ${mobile({
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
  background-color: white;
  ${mobile({
    padding:'0 30px'
  })}
`
const Info=styled.div`
    >span{
      font-size:1.5rem;
      font-weight:700;
      display: flex;
      align-items: center;
    }
    div{
      display: flex;align-items: center;
      font-size:1.2rem;
      font-weight:500;
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
  `
const Tab=styled.div`
  padding:1rem;
  /* background-color: blue; */
  color:${props=>props.index===props.myIndex?'black':'gray'};
  font-weight:600;
  font-size:1.5rem;
  cursor:pointer;
  position: relative;
  &::after{
    content:'';
    width:${props=>props.index===props.myIndex?'100%':'0%'};
    height:5px;
    background:#3c75de;
    position:absolute;
    left:0rem;
    bottom:1rem;
    transition :0.5s;
  }
    
`
const ShowFriends=styled.div`
  display: flex;
  flex-direction: column;
  max-height:80vh;
  flex-wrap:wrap;
  overflow:auto;
  ${mobile({maxHeight:'50vh'})}
` 
const Show=styled.div`
  width: 50%;
  /* background-color: blue; */
  display: flex;
  flex-direction:column;
  align-items: center;
  ${mobile({
    width:'100%'
  })}
`
const Profile = () => {
  //show index ,post vs friends
  const [index,setIndex]=useState(0);

  const navigate=useNavigate()
  const location=useLocation();
  const profileUID=location.pathname.slice(9);
  const loading=useSelector(state=>state.loading);
  const token=useSelector(state=>state.token);
  const dispatch=useDispatch();
  const [profileFetched,setProfileFetched]=useState(1);
  const [friends,setFriends]=useState([]);
  const [posts,setPosts]=useState([]);
  const [details,setDetails]=useState({
    about:"wqwerty",
    address:{city: 'New ', country: 'India', state: 'Delhi', pincode: '110092'},
    coverPhoto:"",
    createdAt:"2023-04-04T18:10:49.579Z",
    designation:"mnit",
    dob:"2023-04-02T00:00:00.000Z",
    email:"jigar@jigar.com",
    isAdmin:false,
    name: "yash_jaiswal11",
    phone: "8130060493",
    photo:"https://avatars.githubusercontent.com/u/77572477?s=400&u=d9f7570507aedfc8cfbda0a13fa98913fdfd1d17&v=4",
    social_links:{github: 'huio', instagram: 'yuio', linkedIn: 'poiu', otherLinks: Array(0)},
    uid:"6fXyEKfReeP7KLWmhrnGDSFtEhD3",
    updatedAt:"2023-04-04T20:08:53.210Z",
    __v:0,
    _id:"642c6829185c6ea9fdf4c3ab"
  });
  const mydetails=useSelector(state=>state.details)


  //load profile details
 const loadProfile=async()=>{
  dispatch(startLoading());
  if(profileUID && details.uid!=profileUID){
    //get profile
    let res=await getUserDetails(token,profileUID);
    if(res.status==200){
      setDetails(res.data)
      console.log(res.data)
    }
    else{
      console.log(res);
      setProfileFetched(0);
    }
  }
  else{
    setDetails(mydetails);
  }
  //get posts
  var res=await getMyPosts(token,profileUID);
  // console.log(res);
  if(res.status==200){
    setPosts(res.data);
    console.log(res.data);
  }
  else{
    console.log(res);
    setProfileFetched(0);
  }

  //get friends
  res=await getAllFriends(token,profileUID);
  // console.log(res)
  if(res.status==200){
    setFriends(res.data)
    console.log(res.data) 
  }
  else{
    console.log(res);
    setProfileFetched(0);
  }
  dispatch(endLoading());
}
useEffect(()=>{  
   dispatch(endLoading());
    loadProfile();
 },[])

  return (
   <>
   {
    !loading? 
    <Container>
      {
        profileFetched?
        <>
         <Topbar/>
         <Content>
         {/* <Sidebar/> */}

         {/* <Display> */}
          <Head>
            <CoverImg src={profilebg}/>
            <ProfileImg src={details.photo}/>
            <div>
              <Option><MoreHorizIcon/></Option>
              <Option><a href={`mailto:${details.email}`}><MailOutlineIcon/></a></Option>
              <button onClick={()=>navigate('/home')}>
                Message
              </button>
            </div>
          </Head>

          <Wrapper>
            <Info>
              
              <span>{`${details.name}`}<CheckCircleIcon sx={{color:'blue'}}/></span>
              <div style={{padding:'1rem 0',}}>{details.about}</div>
              <div style={{fontSize:'1rem',color:'#5f5d5d'}}>
              {/* <FmdGoodIcon />{details.address.city} &bull; {details.address.state} &bull; {details.address.country} &emsp; */}
              <CalendarMonthIcon /> Joined {details.createdAt.slice(0,10)}
              </div>
              <p>
                <span>{friends.length}</span> Friends &bull; <span> 45</span> Mutual Friends
              </p>
            </Info>

            <Links>
            <a target="_blank" href={`${details.social_links.linkedIn}`}><span><i className="fa-brands fa-linkedin-in"></i>LinkedIn</span></a>
            <a target="_blank" href={`${details.social_links.github}`}><span><i className="fa-brands fa-github"></i> Github</span></a>
            <a target="_blank" href={`${details.social_links.instagram}`}> <span><i className="fa-solid fa-pen-to-square"></i> Instagram</span></a>
            </Links>

            <Tabs>
              <Tab index={index} myIndex={0} onClick={()=>setIndex(0)}>Posts</Tab>
              <Tab index={index} myIndex={1} onClick={()=>setIndex(1)}>Friends</Tab>
            </Tabs>
            {index===0?
            <Show>
              {posts.map((p)=>(
                <Post post={p}  key={p._id}/>
              ))
              }
            </Show>:
            <ShowFriends> 
              {friends.map(f=>(
                <FriendCard friend={f} key={f._id}/>
              ))}
            </ShowFriends>}
          </Wrapper>
         {/* </Display> */}
         </Content>

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
