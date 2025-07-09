import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Upload from './components/Upload';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import WatchLaterList from './components/WatchLaterList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access') || '');

  const handleLogout = () => {
    localStorage.removeItem('access');
    setToken('');
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <Sidebar token={token} />

      <div style={{ paddingTop: '70px', paddingLeft: '200px' }}>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/watchlater" element={<WatchLaterList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
