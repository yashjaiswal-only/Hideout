import React from 'react'
import styled from 'styled-components'
import profilebg from '../assets/profileBg.jpg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Container=styled.div`
  width:100vw;
  height:100vh;
`

const Header=styled.div`
  display: flex;
  flex-direction: column;
  height:50vh; 
  width:100%;
  position: relative;
  background-color: white;
  >img{
    width:100%;
    height:60%;
    object-fit:cover;
  }
  >div{
    display: flex;
    width:90%;
    flex-direction:row-reverse;
    align-items: center;
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
  }
`
const ProfileImg=styled.img`
    position: absolute;
    width:15% !important;
    border-radius:50%;
    bottom :20px;
    left :3rem;
    /* border:10px solid white; */
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
`
const Wrapper=styled.div`
  padding:0 80px;
  background-color: white;
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
      font-size:0.8rem;
      font-weight:500;
      color:gray;
    }
    svg{
      margin:0 4px;
    }
    p{
      display: flex;
      align-items: center;
      font-size:1rem;
      margin:0.5rem 0;
      font-weight:500;
      color:gray;
      span{
        color:black;
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
  }
`
const Links=styled.div`
  color:white;
  display: flex;
  flex-wrap:wrap;
  span{
    cursor:pointer;
    background-color: black;
    margin:0.5rem;
    padding:0rem 0.6rem;
    align-items: center;display: flex; justify-content: center;
    height:40px;
    width:max-content;  
    border-radius:40px;
  }
  i{
    color:white;
    margin:2px;
    /* font-size:0.8rem; */
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
const Profile = () => {
  const navigate=useNavigate();
  const [details,setDetails]=useState({
    "first_name":"Varendra",
    "last_name":"Maurya",
     "phone": "8924873973",
     "email": "yash@yash.com",
     "is_available": true,
     skills: [ "Python",
     "Flutter",
     "React Native",
     "Frontend",
     "Backend",
     "Fullstack",
     "Graphic Designer",
     "UI/UX",
     "content writer",
     "social media",
     "digital marketing"],
     "preferred_roles": ["Front-End Developer", "Back-end Developer"],
     "address":{
         "country":"India",
         "state": "Uttar Prades",
         "city": "Allahabad",
         "zip_code":"211019"
     },
     social:{
         "github": "https://github.com/varendra007",
         "linkedin": "https://www.linkedin.com/in/varendra-maurya-4179901bb/",
         "resume": "https://drive.google.com/file/d/1HZQPRn9aRgeth-So-XW8MAZhZMGh_cZM/view?usp=share_link",
         "portfolio": "https://varendra-maurya.netlify.app"
     },
     works:[
        {
         "company": "OWASP Foundation",
         "title": "Front end Developer",
         "description": "Developed something"
        },
         {
         "company": "OWASP Foundation",
         "title": "Front end Developer",
         "description": "Developed something"
        }
     ]
 
 })
  return (
    <Container>
      <Header>
        <img src={profilebg}/>
        <ProfileImg src={'https://play-lh.googleusercontent.com/CKHLf6wwlacMnjuG730pY4cwJbUMoHDtFfoeVKuOxRmPwGXGkzzBfvB9jCJjBqhMSic'}/>
        <div>
          <Option><MoreHorizIcon/></Option>
          <Option><MailOutlineIcon/></Option>
          <button >
            Message
          </button>
          <button >
            Add Friend
          </button>
        </div>
      </Header>
      <Wrapper>
        <Info>
          <span>User Name <CheckCircleIcon sx={{color:'blue'}}/></span>
          <div><CalendarMonthIcon sx={{fontSize:'0.8rem'}}/> Joined Jul 2022</div>
          <p><span>425</span> Friends</p>
        </Info>
        <Skills>{
            details.skills.map(s=>(
              <span>{s}</span>
            ))
          }
        </Skills>
        <Links>
          <span><i className="fa-brands fa-linkedin-in"></i> LinkedIn</span>
          <span><i className="fa-brands fa-github"></i> Github</span>
          <span><i className="fa-solid fa-pen-to-square"></i> Resume</span>
          <span><i className="fa-solid fa-briefcase"></i> Portfolio</span>
        </Links>
            <h1>Work Experience</h1>
        <WorkList>
            {details.works.map(ele=>(
                <Work>
                    <h3>{ele.title}</h3> 
                    <h6>{ele.company}</h6>
                    <span>{ele.description}</span>
                </Work>
            ))}
        </WorkList>
      </Wrapper>
    </Container>
  )
}

export default Profile
