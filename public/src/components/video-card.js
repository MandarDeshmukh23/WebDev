import clock from '../images/clock.png'
import heart from '../images/heart.png'
import { useState } from "react";



function Video_card({ title, thumbnail, channelName, channelPhoto, views, datePublished, isWatchLater,
    onWatchLaterToggle }) {
    const [liked, setLiked] = useState(false);

    const likecolorchange = () => {
        setLiked(prev => !prev);
    };

    return (
        <div className="w-max h-max mb-[5px]">

            <img src={thumbnail} alt="video-image" className="h-[225px] w-full rounded-[20px] hover:rounded-none transition-all"></img>

            <div className="flex mt-[5px]">
                <div className="channel-thumbnail">
                    <img src={channelPhoto} alt="channel-photo" className="h-[40px] w-[40px] rounded-full"></img>
                </div>

                <div className="ml-[10px]">
                    <p className="text-black text-[1.3rem] font-bold m-0 w-max max-w-[300px]">{title}</p>
                    <p className="mt-[10px] mb-0 w-max max-w-[300px] text-sm text-gray-700" >{channelName}</p>
                    <span className="w-max max-w-[300px] text-sm text-gray-600">{views}</span>
                    <span className="mx-[5px] w-max max-w-[300px]">.</span>
                    <span className="w-max max-w-[300px] text-sm text-gray-600">   {datePublished}</span>
                </div>

                <div className="ml-[5px] flex flex-col float-right space-y-1">
                    <button
                        className={`rounded-full p-1 transition-colors ${liked ? 'bg-red-500' : 'bg-gray-200'
                            }`}
                        onClick={likecolorchange}
                        style={{ backgroundColor: liked ? 'red' : 'white' }}
                    >
                        <img src={heart} alt="more" className="h-[30px] w-[30px]"></img>
                    </button>
                    <button
                        className={'rounded-full p-1 ' + (isWatchLater ? 'bg-blue-200' : 'bg-white')}
                        onClick={onWatchLaterToggle}
                    >
                        <img src={clock} alt="more" className="h-[30px] w-[30px]"></img>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Video_card
