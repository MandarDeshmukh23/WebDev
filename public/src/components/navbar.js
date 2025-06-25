
import threelines from '../images/threelines.png'
import youtube from '../images/youtube.png'
import search from '../images/search.png'
import mic from '../images/mic.png'
import bell from '../images/bell.png'
import user from '../images/user.png'
import { Link } from "react-router-dom";

function Navbar({ watchLaterCount }) {
    return (
        <header className="fixed top-0 flex items-center bg-white h-[56px] w-full text-black z-50">
            <div className="flex items-center ml-[10px]">
                <img src={threelines} alt="threelines" className="h-6 w-6 ml-[10px] mt-[15px] hover:bg-gray-300 rounded-full cursor-pointer mb-[25px]" />
            </div>

            <div className="flex items-center ml-[30px] h-[100px]">
                <img src={youtube} alt="youtube" className="h-10 w-[33px] mt-[10px] mb-[18px]"></img>
                <p className="text-center text-[1.3rem] font-bold mb-[5px] h-10 w-[93px]">YouTube</p>
                <p className="text-[0.7rem] mb-[27px]">IN</p>
            </div>

            <div className="flex justify-center ml-[250px]">
                <input type="text" placeholder="search..." className="h-[30px] w-[500px] mt-[10px] rounded-l-[15px] text-sm placeholder:px-[10px] placeholder:text-[1rem] border"></input>
                <img src={search} alt="search" className="w-[54px] h-[35.2px] mt-[10px] ml-[3px] bg-[#F8F8F8] rounded-r-[15px] hover:bg-gray-400 cursor-pointer"></img>
                <img src={mic} alt="mic" className="w-[35.2px] h-[35.2px] mt-[10px] ml-[5px] hover:bg-gray-400 rounded-full cursor-pointer"></img>
            </div>

            <div className="flex items-center bg-gray-200 hover:bg-gray-400 rounded-[15px] h-[35px] w-[130px] mt-[10px] ml-[220px] cursor-pointer">
                <Link to="/watchlater" className="ml-[7px] mr-[7px] text-[1rem]">Watch Later</Link>
                {watchLaterCount > 0 && (
                    <span className="ml-[7px] mr-[7px] text-[1rem] ">
                        {watchLaterCount}
                    </span>
                )}
            </div>

            <div className="flex items-center">
                <img src={bell} alt="bell" className="ml-[25px] hover:bg-gray-400 rounded-full cursor-pointer"></img>
            </div>

            <div className="flex items-center ml-[25px]">
                <img src={user} alt="user" className="w-8 h-8 hover:bg-gray-400 rounded-full cursor-pointer"></img>
            </div>

        </header>
    )

}

export default Navbar