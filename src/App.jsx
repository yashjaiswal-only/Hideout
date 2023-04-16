import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import { Main, Signin, Signup ,Auth} from './Pages';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './Pages/Profile';
import Friends from './Pages/Friends';
import CreateProfile from './Pages/CreateProfile';
import MyPost from './Pages/MyPost';
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      
      <div className="App">        
            <Routes>
              <Route path='/' element={<Auth/>}/>
              <Route path='/home' element={<Main/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/profile/:uid' element={<Profile/>}/>
              <Route path='/friends' element={<Friends/>}/>
              <Route path='/myposts' element={<MyPost/>}/>
              <Route path='/create-profile' element={<CreateProfile/>}/>
            </Routes>
        
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
