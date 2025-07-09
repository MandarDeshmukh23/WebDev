import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        alert('Please login first');
        return;
      }

      try {
        const res = await axios.get('user/liked/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch liked videos:", err);
      }
    };

    fetchLikedVideos();
  }, []);

  return (
    <div>
      <h2>My Liked Videos</h2>
      {videos.length === 0 ? (
        <p>No liked videos.</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <video width="300" controls>
                <source src={`http://127.0.0.1:8000${video.video_file}`} type="video/mp4" />
              </video>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikedVideos;
