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
function App() {
  const fails=useSelector(state=>state.fails)
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="App">        
            <Routes>
              <Route path='/' element={<Auth/>}/>
              <Route path='/home' element={<Main/>}/>
              <Route path='/news' element={<NewsPage/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/profile/:uid' element={<Profile/>}/>
              <Route path='/friends' element={<Friends/>}/>
              <Route path='/myposts' element={<MyPost/>}/>
              <Route path='/post/:uid/:postId' element={<PostPage/>}/>
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
