import React from 'react';
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
import { useSelector } from 'react-redux';
import CreatePost from './Components/CreatePost';
import { Modal } from '@mui/material';
function App() {
  const fails=useSelector(state=>state.fails)
  //create post
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
  } 
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
            <Alert/>
            <Warning fails={fails}/>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
