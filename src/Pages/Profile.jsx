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
import { useNavigate } from 'react-router-dom'; 
import mobile, { tab } from '../responsive'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noprofile from '../assets/Forgot password.gif'
import Loader from '../Components/Loader'; 
import { endLoading, startLoading } from '../Redux/UserRedux';
import { getUserDetails } from '../ApiCalls/User';

const Container=styled.div`
  width:100vw;
  height:100vh;
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
    span{
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
      margin:0.5rem 0;
      span{
        margin-right:4px;
      font-size:1rem;
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
const Profile = () => {
  const loading=useSelector(state=>state.loading);
  const token=useSelector(state=>state.token);
  const dispatch=useDispatch();
  // const history=useHistory();
  const [profileFetched,setProfileFetched]=useState(1);
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
 const loadProfile=async()=>{
  dispatch(startLoading());
  const res=await getUserDetails(token);  //put await here to stop further execution untill you get response
  console.log(res);
  if(res.code!="ERR_BAD_RESPONSE"){
    setProfileFetched(true);
    console.log(res.data[0])
    setDetails(res.data[0]);
  }
  else{  setProfileFetched(false);}
  dispatch(endLoading());
}
useEffect(()=>{  
  //  dispatch(endLoading());
    // loadProfile();
 },[])

  return (
   <>
   {
    !loading?     
    <Container>
      {
        profileFetched?
        <>
         {/* <Topbar/> */}
         {/* <Sidebar/> */}
          <Head>
            <CoverImg src={profilebg}/>
            <ProfileImg src={'https://play-lh.googleusercontent.com/CKHLf6wwlacMnjuG730pY4cwJbUMoHDtFfoeVKuOxRmPwGXGkzzBfvB9jCJjBqhMSic'}/>
            <div>
              <Option><MoreHorizIcon/></Option>
              <Option><a href={`mailto:${details.email}`}><MailOutlineIcon/></a></Option>
              <button onClick={()=>history('/dashboard')}>
                Dashboad
              </button>
            </div>
          </Head>

          <Wrapper>
            <Info>
              <span>{`${details.name}`}<CheckCircleIcon sx={{color:'blue'}}/></span>
              <div style={{padding:'1rem 0',}}>{details.about}</div>
              <div style={{fontSize:'1.2rem',color:'#5f5d5d'}}>
              <FmdGoodIcon />{details.address.city} &bull; {details.address.state} &bull; {details.address.country} &emsp;
              <CalendarMonthIcon /> Joined {details.createdAt.slice(0,10)}</div>
              <p><span>425</span> WorkedWith</p>
            </Info>

            {/* <Skills>{
                details.skills.map(s=>(
                  <span>{s}</span>
                ))
              }
            </Skills> */}

            <Links>
            <a target="_blank" href={`${details.social_links.linkedin}`}><span><i className="fa-brands fa-linkedin-in"></i>LinkedIn</span></a>
            <a target="_blank" href=""><span><i className="fa-brands fa-github"></i> Github</span></a>
            <a target="_blank" href=""> <span><i className="fa-solid fa-pen-to-square"></i> Resume</span></a>
            <a target="_blank" href=""><span><i className="fa-solid fa-briefcase"></i> Portfolio</span></a>
            </Links>

            {/* <h1>Work Experience</h1>
            <WorkList>
                {details.works.map(ele=>(
                    <Work>
                        <h3>{ele.title}</h3> 
                        <h6>{ele.company}</h6>
                        <span>{ele.description}</span>
                    </Work>
                ))}
            </WorkList> */}
          </Wrapper>
        </>:
        <Error>
         No Profile Available , Kindly  <span 
         style={{color:'blue',textDecoration:'underline',cursor:'pointer'}} onClick={()=>history.push('/signin')}>Login</span> 
            <img src={noprofile}/>
        </Error>
      }
      
    </Container>:<Loader/>
   }
   </>
  )
}

export default Profile
