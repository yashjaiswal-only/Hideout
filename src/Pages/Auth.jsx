import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import bgimg from '../Data/containerbg.jpg';
import Welcome from '../Components/Welcome'
import { mobile, tab } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { endLoading, removeUser, startLoading } from '../Redux/UserRedux';
const Container=styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    /* padding:5rem 7rem; */
    min-height:100vh;
    align-items: center;
    background-image:url(${bgimg});
    ${tab({
        padding:'2rem 0',
        flexDirection:'column'
    })}
`
const Wrapper=styled.div`
    /* z-index:3;
    background-color: #fff;
    display: flex;
    ${tab({
        flexDirection:'column'
    })} */
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:url(${bgimg});
    ${mobile({
        padding:'2rem',
        flexDirection:'column'
    })}
`
const Left=styled.div`
    background-color: white;
    /* flex:1; */
    display: flex;justify-content: center;align-items: center;
    width:45%;
    height:90vh;
    ${tab({
        width:'90%',
        height:'max-content',
        padding:'3rem 0'
    })}
`
const Right=styled.div`
    /* flex:1; */
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width:45%;
    height:90vh;
   padding:1rem;
   ${tab({
        width:'90%',
        height:'max-content',
   })}
`
const Slider=styled.div`
    height:90%;
    width:80%;
    text-align: center;
    overflow: hidden;
    ${mobile({
        width:'90%'
    })}
`
const Slides=styled.div`
    display: flex;
    height:max-content;
    width:100%;
    height:100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    /* overflow-y:hidden; */
    &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
    }
    &::-webkit-scrollbar-thumb {
    background: #2ae88a;
    border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
    background: transparent;
    }

`   
const Login=styled.div`
    scroll-snap-align: start;
    flex-shrink: 0;
    transition: transform 0.5s;
    height:100%;
    width:100%;
    display: flex;
    flex-direction:column ;
    align-items: center;
    justify-content: space-between;
`
const Register=styled.div`
    scroll-snap-align: start;
    flex-shrink: 0;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;

    display: flex;
    flex-direction:column ;
    justify-content: space-between;
`
const Logo=styled.div`
    left:0; 
    font-weight:600;
    width:100%;
    text-align:left;
    `
const Message=styled.span`
    width:100%;
    text-align:${props=>props.center?"center":"left"};
    font-size:${props=>props.center?"1rem":"1.5rem"};
    color:gray;
    ${tab({
        margin:'1rem 0'
    })}
`
const ButtonGroup=styled.div`
    width:100%;
    display: flex;
    ${mobile({
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between'
    })}
`
const Button=styled.button`
    display: flex;  justify-content: space-between; align-items: center;
    padding:0.5rem;
    border-width:1px;
    background-color: ${props=>props.color};
    color:${props=>props.color=="blue"?"white":"black"};
    margin:auto;
    cursor: pointer;
    ${mobile({
        margin:'0.5rem 0',
        fontSize:'1rem',
        // padding:'1rem',
        justifyContent:'space-around',
        width:'60%'
    })}
`
const ButtonImg=styled.img`
    width:1rem;
    margin-right:0.5rem;
`

const InputGrp=styled.div`
    width:100%;
    display: flex;
    flex-direction:${props=>props.last?"row":"column"};
    ${tab({
        margin:'1rem 0',
        width:'80%'
    })}
    ${mobile({
        // margin:'1rem 0'
        width:'80%'
    })}
`
const Label=styled.span`
    /* width:100%; */
    text-align:left;
    font-size:1rem;
    color:gray;

    
`
const Input=styled.input`
    font-size:1.3rem;   
    font-weight:400;
    outline: 0;
    border-width: 0 0 2px;
    border-color: blue;
    &:focus {
        border-color: green;
    }
    
`
const Bottom=styled.div`
    display: flex;
    width:100%;
    justify-content: ${props=>props.signup?"center":"space-between"};
    font-size:0.8rem;
    font-weight:700;
    cursor: pointer;
    ${tab({
        width:'70%',
        margin:'1rem auto',
        fontSize:'1rem'
    })}
    ${mobile({
        margin:'1rem 0',
        fontSize:'1rem'
    })}
`
const Rem=styled.div`
    display: flex;
`
const Forgot=styled.div``
const Terms=styled.div`
    width:100%;
    text-align:left;
    font-size:0.8rem;
    margin-bottom:1rem;
    ${tab({
        fontSize:'1rem',
    })}
    ${mobile({
        fontSize:'1rem',
    })}
`
const SubmitBtn=styled.button`
    padding:0.2rem 1rem;
    cursor:pointer;
    color:black;
    border:3px solid #2ae88a;
    border-radius:50px;
    text-align:center;
    font-size:1.4rem;
    background:white ;
    /* background: padding-box fixed, linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%) border-box; */
    &:hover{
        background: linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%) border-box;
    }
`
const Auth = () => {

  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmRef = useRef();
  const emailLoginRef = useRef();
  const passwordLoginRef= useRef();
  const {signup, signin, signInWithGoogle, signInWithFacebook, currentUser} = useAuth();
  const [error, setError]= useState(null);
  const [loadin, setLoading]= useState(false);
  const loading=useSelector(state=>state.loading)
  const dispatch=useDispatch();
    // dispatch(removeUser())
  async function handleSubmitLogin(e){
    e.preventDefault();
    try{
      setError('')
      dispatch(startLoading());
      const log = await signin(emailLoginRef.current.value,passwordLoginRef.current.value)
      console.log(log)
      dispatch(endLoading());
      if(log.status){
        setLoading(false)
        if(log.found)        navigate('/home');
        else        navigate('/create-profile');
        console.log("login successful")
      }
      else{
        console.log("error at login")
        setError(log.error)
      }
    }catch(error){
      setError('Failed to sign in!! Please try again')
    }
  }

  async function handleSubmitSignUp(e){
    e.preventDefault();

    if(passwordConfirmRef.current.value!==passwordRef.current.value){
        setError('Passwords do not match')
        return ;
    }
    if(passwordConfirmRef.current.value.length<6){
        setError('Password should be atleast 6 characters')
        return ;
    }
    try {
      setError(null)
      dispatch(startLoading())
    //   console.log(emailRef.current.value)
    //   console.log(passwordRef.current.value)
      const log = await signup(emailRef.current.value,passwordRef.current.value)
      console.log(log)
      dispatch(endLoading());
      if(log.status){
        navigate('/create-profile')
        console.log("signup successful")
      }
      else{
        setError(log.error);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to sign up!! Please try again')
    }
  }

  async function googleSignin(e){
    e.preventDefault()
    setError('')
    try{
        dispatch(startLoading());
        const log = await signInWithGoogle();
        console.log(log)
        dispatch(endLoading());
      if(log.status){
        if(log.found)        navigate('/home');
        else navigate('/create-profile');
        console.log("login successful")
      }
      else{
        console.log("error at sigin with google")
        setError(log.error)
      }
    }catch(error){
        console.log("error")
        setError(error)
    }
  }
  
  async function fbSignin(e){
    e.preventDefault()
    try{
      setError('')
      setLoading(true)
      const log = await signInWithFacebook()
      console.log(log)
      dispatch(endLoading());
      if(log.status){
        if(log.found)        navigate('/home');
        else navigate('/create-profile');
        console.log("login successful")
      }
      else{
        console.log("error at sigin with google")
        setError(log.error)
      }
    }catch(error){
      setError('Failed to sign in!! Please try again')
    }
    setLoading(false)
  }

  const user=useSelector(state=>state.user);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user) navigate('/home');
  },[])
  return (
    <>
    {loading?<Loader/>:
    <Container>
        {/* <Wrapper> */}

        <Left>

        <Slider>
            <Slides>

            <Login id="login">
                <Logo>Hideout</Logo>
                <Message>
                    Welcome Back, Please login to your account
                </Message>
                    <ButtonGroup>
                    <Button color="white" onClick={googleSignin}>
                        <ButtonImg src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"/>
                        Login with google
                    </Button>
                    <Button color="blue" onClick={fbSignin}>
                        <ButtonImg src="https://www.freepnglogos.com/uploads/logo-facebook-png/logo-facebook-facebook-logo-transparent-png-pictures-icons-and-0.png" />
                        Login with facebook
                    </Button>
                    </ButtonGroup>
                    <Message center>
                    - OR -
                    </Message>

                    <InputGrp>
                    <Label>
                        Email Address
                    </Label>
                    <Input type="email" ref={emailLoginRef}>
                    </Input>
                    </InputGrp>

                    <InputGrp>
                    <Label>
                        Password
                    </Label>
                    <Input type="password" ref={passwordLoginRef} onKeyUp={(e)=>(e.key==='Enter')?handleSubmitLogin(e):""}>
                    </Input>
                    </InputGrp>

                    <Bottom>
                    <Rem >
                        <input type="checkbox"/> Remember Me 
                    </Rem>
                    <Forgot>Forgot Password?</Forgot>
                    </Bottom>
                    {error && 
                        <Bottom style={{color:'red',fontWeight:'400'}}>
                            {error}
                        </Bottom>
                    }
                    <SubmitBtn onClick={handleSubmitLogin}>Login</SubmitBtn>
                    <Bottom signup>
                        New Here? <a href="#register" style={{textDecoration:"none" ,color:"blue",margin:"0rem 1rem"}}> Create Account</a>
                    </Bottom>
                    <Terms>By signing up , you agree to Hideout's <span style={{color:"blue"}}>Terms & Conditions</span>
                    & <span style={{color:"blue"}}>Privacy Policy</span>
                    </Terms>
            </Login>


            <Register id="register">
            <Logo>Hideout</Logo>
                <Message>
                    Welcome to Hideout, Please Create your account
                </Message>
                    <ButtonGroup>
                    <Button color="white" onClick={googleSignin}>
                        <ButtonImg src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"/>
                        Sign Up with google
                    </Button>
                    <Button color="blue" onClick={fbSignin}>
                        <ButtonImg src="https://www.freepnglogos.com/uploads/logo-facebook-png/logo-facebook-facebook-logo-transparent-png-pictures-icons-and-0.png" />
                        Sign Up with facebook
                    </Button>
                    </ButtonGroup>
                    <Message center>
                    - OR -
                    </Message>
                    <InputGrp>
                    <Label>
                        Email Address
                    </Label>
                    <Input type="email" ref={emailRef}>
                    </Input>
                    </InputGrp>
                    <InputGrp>
                    <Label>
                        Password
                    </Label>
                    <Input type="password" ref={passwordRef}>
                    </Input>
                    </InputGrp>
                    <InputGrp>
                    <Label>
                        Confirm Password
                    </Label>
                    <Input type="password" ref={passwordConfirmRef} onKeyUp={(e)=>(e.key==='Enter')?handleSubmitLogin(e):""}>
                    </Input>
                    </InputGrp>
                    <Bottom>
                    <Rem >
                        <input type="checkbox"/> Remember Me 
                    </Rem>
                    </Bottom>
                    {error && 
                        <Bottom style={{color:'red',fontWeight:'400'}}>
                            {error}
                        </Bottom>
                    }
                    <SubmitBtn onClick={handleSubmitSignUp}>Sign Up</SubmitBtn>
                    <Bottom signup>
                        Already had an account? <a href="#login" 
                        style={{textDecoration:"none" ,color:"blue",margin:"0rem 1rem"}}> Login Here</a>
                    </Bottom>
                    <Terms>By signing up , you agree to Hideout's <span style={{color:"blue"}}>Terms & Conditions</span>
                    & <span style={{color:"blue"}}>Privacy Policy</span>
                    </Terms>
            </Register>

            </Slides>
        </Slider>
        </Left>
        <Right>

        <Welcome/>
        </Right>
        {/* </Wrapper> */}
        
    </Container>
     }
     </>
  )
}

export default Auth;
