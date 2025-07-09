import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import './VideoPlayer.css'; 

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`video/${id}/`);
        setVideo(res.data);
        setLikes(res.data.likes);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLike = async () => {
  if (!token) return alert('Please login first');

  try {
    const response = await likeVideo(id, token);
    if (response.status === 200 || response.status === 201) {
      setLikes(prev => prev + 1);
    }
  } catch (err) {
    console.error("Error liking video:", err.response || err);
    if (err.response?.status === 401) {
      alert("Unauthorized. Please login again.");
    } else {
      alert("Something went wrong. Try again later.");
    }
  }
};

const likeVideo = (videoId, token) => {
  return axios.post(`/video/${videoId}/like/`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


  const handleWatchLater = async () => {
    if (!token) return alert("Login first");

    try {
      await axios.post(`video/${id}/watchlater/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Toggled watch later");
    } catch (err) {
      console.error("Watch Later failed", err);
    }
  };

  const handleSubscribe = async (username) => {
    if (!token) return alert("Please login first");

    try {
      const res = await axios.post(`subscribe/${username}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.subscribed ? "Subscribed!" : "Unsubscribed");
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/video/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => alert("Failed to copy link."));
  };

  if (!video) return <p className="loading">Loading video...</p>;

  return (
    <div className="video-player-container">
      <h2>{video.title}</h2>
      <video className="video-element" controls>
        <source src={`http://127.0.0.1:8000${video.video_file}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="description">{video.description}</p>
      <p className="uploader">
        Uploaded by: <strong>{video.uploader}</strong>
        <button className="subscribe-btn" onClick={() => handleSubscribe(video.uploader)}>Subscribe</button>
      </p>
      <div className="video-actions">
        <button className="like-btn" onClick={handleLike}>❤️ Like ({likes})</button>
        <button className="watchlater-btn" onClick={handleWatchLater}>Watch Later</button>
        <button className="share-btn" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
