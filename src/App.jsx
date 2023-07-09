import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import { Main,Auth} from './Pages';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './Pages/Profile';
import Friends from './Pages/Friends';
import CreateProfile from './Pages/CreateProfile';
import MyPost from './Pages/MyPost';
import PostPage from './Pages/Post';
import Alert from './Components/Alert';
import NewsPage from './Pages/NewsPage';
import Warning from './Components/Warning';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from './Components/CreatePost';
import { Modal } from '@mui/material';
import styled from 'styled-components';
import ChatBox from './Components/ChatBox';
import { updateChatList, updateScreenSize } from './Redux/UserRedux';
const Chats=styled.div`
  background-color: black;
`
function App() {
  const fails=useSelector(state=>state.fails)
  const chatUserList=useSelector(state=>state.chatUsers);
  //create post
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
  }

  //to save screen size in redux
  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
  const screenSize=useSelector(state=>state.screensize)
  const dispatch=useDispatch();
  useEffect(() => {
    const updateDimension = () => {
        dispatch(updateScreenSize(getCurrentDimension()))
      }
      window.addEventListener('resize', updateDimension);
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [screenSize])
  console.log(chatUserList)
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="App">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <CreatePost handleClose={handleClose}/>
      </Modal>
            <Routes>
              <Route path='/' element={<Auth/>}/>
              <Route path='/home' element={<Main handleOpen={handleOpen}/>}/>
              <Route path='/news' element={<NewsPage/>}/>
              <Route path='/profile' element={<Profile handleOpen={handleOpen}/>}/>
              <Route path='/profile/:uid' element={<Profile handleOpen={handleOpen}/>}/>
              <Route path='/friends' element={<Friends handleOpen={handleOpen}/>}/>
              <Route path='/myposts' element={<MyPost handleOpen={handleOpen}/>}/>
              <Route path='/post/:uid/:postId' element={<PostPage handleOpen={handleOpen}/>}/>
              <Route path='/create-profile' element={<CreateProfile/>}/>
            </Routes>
            <Chats>
              {chatUserList.length?chatUserList.map((chat,index)=>(
              <ChatBox count={index} chat={chat}/>
              )):""}
            </Chats>
            <Alert/>
            <Warning fails={fails}/>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
