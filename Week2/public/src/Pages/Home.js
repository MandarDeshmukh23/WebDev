import Navbar from '../components/navbar';
import Video_card from '../components/video-card';
import { videos } from '../data/dummyVideos';
import TimeSpent from '../components/timer';

function Youtube({ watchLaterTitles, toggleWatchLater, watchLaterCount }) {


  return (
    <div className='flex'>

      <Navbar watchLaterCount={watchLaterCount} />
      <TimeSpent />
      <div className='flex flex-wrap justify-evenly pt-[90px]'>
        
        {videos.map((video, index) => (
          <Video_card
            key={index}
            title={video.title}
            thumbnail={video.thumbnail}
            channelName={video.channelName}
            channelPhoto={video.channelPhoto}
            views={video.views}
            datePublished={video.datePublished}
            isWatchLater={watchLaterTitles.includes(video.title)}
            onWatchLaterToggle={() => toggleWatchLater(video.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default Youtube;
