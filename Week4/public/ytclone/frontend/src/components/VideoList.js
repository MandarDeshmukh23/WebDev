import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link, useLocation } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  // Extract search query from URL if present
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // If search query exists, append it to the request
        const url = searchQuery ? `videos/?search=${encodeURIComponent(searchQuery)}` : 'videos/';
        const res = await axios.get(url);
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div style={{ padding: '20px 20px 20px 140px' }}>
      <h2 style={{ textAlign: 'center' }}>All Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-evenly' }}>
        {videos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          videos.map(video => (
            <div
              key={video.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '300px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              }}
            >
              <video width="100%" height="180" controls>
                <source src={`http://127.0.0.1:8000${video.video_file}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h4>{video.title}</h4>
              <p>{video.description?.slice(0, 100)}...</p>
              <Link to={`/video/${video.id}`}>Watch</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoList;

