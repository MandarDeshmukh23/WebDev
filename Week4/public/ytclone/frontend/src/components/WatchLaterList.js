import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import './WatchLaterList.css'; 


const WatchLaterList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    axios.get('user/watchlater/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setVideos(res.data));
  }, []);

  return (
    <div className="watch-later-container">
      <h2>📺 Watch Later</h2>
      {videos.length === 0 ? (
        <p className="no-videos">No videos added.</p>
      ) : (
        <div className="watch-later-grid">
          {videos.map(v => (
            <div key={v.id} className="watch-later-card">
              <video className="watch-later-video" controls>
                <source src={`http://127.0.0.1:8000${v.video_file}`} type="video/mp4" />
              </video>
              <h4>{v.title}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLaterList;

