import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import bgimg from '../Data/containerbg.jpg';
import Welcome from '../Components/Welcome'
import { mobile, tab } from '../responsive';
const Container=styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding:5rem 7rem;
    align-items: center;
    background-image:url(${bgimg});
    ${tab({
        padding:'2rem',
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
    flex:1;
    display: flex;justify-content: center;align-items: center;
    width:50%;
    height:80vh;
    ${tab({
        width:'100%',
        padding:'3rem 0'
    })}
`
const Right=styled.div`
    flex:1;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width:50%;
    height:80vh;
   padding:1rem;
   ${tab({
    width:'100%'
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
    const navigate=useNavigate();

  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmRef = useRef();
  const emailLoginRef = useRef();
  const passwordLoginRef= useRef();
  const {signup, signin, signInWithGoogle, signInWithFacebook, currentUser} = useAuth();
  const [error, setError]= useState('');
  const [loading, setLoading]= useState(false);

  async function handleSubmitLogin(e){
    e.preventDefault();

    try{
      setError('')
      setLoading(true)
      const log = await signin(emailLoginRef.current.value,passwordLoginRef.current.value)
      if(log){
        setLoading(false)
        navigate('/home')
      }
    }catch(error){
      setError('Failed to sign in!! Please try again')
    }
    setLoading(false)

  }

  async function handleSubmitSignUp(e){
    e.preventDefault();

    if(passwordConfirmRef.current.value!==passwordRef.current.value){
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      console.log(emailRef.current.value)
      console.log(passwordRef.current.value)
      const log = await signup(emailRef.current.value,passwordRef.current.value)
      if(log){
        setLoading(false)
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
      setError('Failed to sign up!! Please try again')
    }
    setLoading(false)
  }

  async function googleSignin(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
        await signInWithGoogle();
        console.log("signedin")
        setLoading(false)
        navigate('/home')
    }catch(error){
        console.log("first00")
        setLoading(false)
        setError('Failed to sign in!! Please try again')
    }
    console.log("first")
  }
  
  async function fbSignin(e){
    e.preventDefault()
    try{
      setError('')
      setLoading(true)
      const log = await signInWithFacebook()
      if(log){
        setLoading(false);
        navigate('/home');
      }
    }catch(error){
      setError('Failed to sign in!! Please try again')
    }
    setLoading(false)
  }


  return (
    <Container>
        {/* <Wrapper> */}

        <Left>

        <Slider>
            <Slides>

            <Login id="login">
                <Logo>OCTOCHAT</Logo>
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
                    <Input type="password" ref={passwordLoginRef}>
                    </Input>
                    </InputGrp>

                    <Bottom>
                    <Rem >
                        <input type="checkbox"/> Remember Me 
                    </Rem>
                    <Forgot>Forgot Password?</Forgot>
                    </Bottom>
                    <SubmitBtn onClick={handleSubmitLogin}>Login</SubmitBtn>
                    <Bottom signup>
                        New Here? <a href="#register" style={{textDecoration:"none" ,color:"blue",margin:"0rem 1rem"}}> Create Account</a>
                    </Bottom>
                    <Terms>By signing up , you agree to OctoChat's <span style={{color:"blue"}}>Terms & Conditions</span>
                    & <span style={{color:"blue"}}>Privacy Policy</span>
                    </Terms>
            </Login>


            <Register id="register">
            <Logo>OCTOCHAT</Logo>
                <Message>
                    Welcome to Octochat, Please Create your account
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
                    <Label>
                        Confirm Password
                    </Label>
                    <Input type="password" ref={passwordConfirmRef}>
                    </Input>
                    </InputGrp>
                    <Bottom>
                    <Rem >
                        <input type="checkbox"/> Remember Me 
                    </Rem>
                    </Bottom>
                    <SubmitBtn onClick={handleSubmitSignUp}>Sign Up</SubmitBtn>
                    <Bottom signup>
                        Already had an account? <a href="#login" 
                        style={{textDecoration:"none" ,color:"blue",margin:"0rem 1rem"}}> Login Here</a>
                    </Bottom>
                    <Terms>By signing up , you agree to OctoChat's <span style={{color:"blue"}}>Terms & Conditions</span>
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
  )
}

export default Auth;
