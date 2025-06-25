import Video_card from "../components/video-card";
import { videos } from '../data/dummyVideos';
import TimeSpent from "../components/timer";
import { Link } from "react-router-dom";

function Watchlater({ watchLaterTitles, toggleWatchLater }) {
  const savedVideos = videos.filter(video => watchLaterTitles.includes(video.title));
  let count = savedVideos.length;

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-20">
        <TimeSpent/>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Watch Later</h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          View and manage your saved videos. Click the clock icon to remove any from this list.
        </p>
        <Link to="/" className="text-red-500">Home Page</Link>
      </div>


      <div className="flex flex-wrap justify-evenly">
        {savedVideos.length > 0 ? (
        <div className="flex flex-wrap justify-evenly">
          {savedVideos.map((video, index) => (
              <Video_card
                title={video.title}
                thumbnail={video.thumbnail}
                channelName={video.channelName}
                channelPhoto={video.channelPhoto}
                views={video.views}
                datePublished={video.datePublished}
                isWatchLater={true}
                onWatchLaterToggle={() => toggleWatchLater(video.title)}
              />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
            alt="No videos"
            className="w-32 h-32 mb-4 opacity-80"
          />
          <p className="text-gray-500 text-lg text-center">
            No videos in Watch Later yet.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Watchlater;
