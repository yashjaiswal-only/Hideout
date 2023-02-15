import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import { Main, Signin, Signup ,Auth} from './Pages';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      
      <div className="App">        
            <Routes>
              <Route path='/' element={<Auth/>}/>
              <Route path='/home' element={<Main/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/signin' element={<Signin/>}/>
            </Routes>
        
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
