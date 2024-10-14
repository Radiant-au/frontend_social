import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHouse, faMessage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    // Function to determine if a route is active
    const isActive = (path) => location.pathname === path;
    
  return (
    <div className="sticky">
      {/* Profile Section */}
      <a className="profile flex items-center bg-white space-x-4 rounded-2xl p-4 cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
        <div className="profile-photo w-12 h-12 rounded-full overflow-hidden">
          <img src={user.profileImg} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="handle">
          <h4 className="font-semibold text-gray-900">{user.username}</h4>
          <p className="text-gray-500 text-sm"><em>@{user?.username?.substring(0, 3) || 'guest'}</em></p>
        </div>
      </a>
      
      {/* Sidebar Menu */}
      <div className="sidebar bg-white mt-8 rounded-lg">
        <Link
            to="/"
            className={`flex items-center h-16 font-semibold rounded-lg relative cursor-pointer 
            ${isActive('/') ? 'text-violet-500' : 'text-slate-800'} 
            ${isActive('/') && 'bg-gray-100'}`} // Add background change on active
        >
            {isActive('/') && <div className="w-2 h-full absolute top-0 left-0 rounded-tl-lg  bg-violet-500"></div>}
            <span>
                <FontAwesomeIcon icon={faHouse}  className={`text-2xl ml-8 ${isActive('/') ? 'text-violet-500' : 'text-gray-500'}`} />
            </span>
            <h3 className="text-base ml-6">Home</h3>
        </Link>

        <Link
            to="/noti"
            className={`flex items-center h-16 font-semibold rounded-lg relative cursor-pointer hover:bg-gray-100
            ${isActive('/noti') ? 'text-violet-500' : 'text-slate-800'} 
            ${isActive('/noti') && 'bg-gray-100'}`} // Add background change on active
        >
            {isActive('/noti') && <div className="w-2 h-full absolute top-0 left-0  bg-violet-500"></div>}
            <span>
              <FontAwesomeIcon icon={faBell} className={`text-2xl ml-8 ${isActive('/noti') ? 'text-violet-500' : 'text-gray-500'}`} />
            </span>
            <h3 className="text-base ml-6">Notifications</h3>
        </Link>

        <Link
            to="/rells"
            className={`flex items-center h-16 font-semibold rounded-lg relative cursor-pointer hover:bg-gray-100
            ${isActive('/reels') ? 'text-violet-500' : 'text-slate-800'} 
            ${isActive('/reels') && 'bg-gray-100'}`} // Add background change on active
        >
            {isActive('/reels') && <div className="w-2 h-full absolute top-0 left-0  bg-violet-500"></div>}
            <span>
              <FontAwesomeIcon icon={faFilm} className={`text-2xl ml-8 ${isActive('/noti') ? 'text-violet-500' : 'text-gray-500'}`} />
            </span>
            <h3 className="text-base ml-6">Reels</h3>
        </Link>

        <Link
            to="/create-reels"
            className={`flex items-center h-16 font-semibold rounded-lg relative cursor-pointer hover:bg-gray-100
            ${isActive('/create-reels') ? 'text-violet-500' : 'text-slate-800'} 
            ${isActive('/create-reels') && 'bg-gray-100'}`} // Add background change on active
        >
            {isActive('/create-reels') && <div className="w-2 h-full absolute top-0 left-0  bg-violet-500"></div>}
            <span>
              <FontAwesomeIcon icon={faVideo} className={`text-2xl ml-8 ${isActive('/noti') ? 'text-violet-500' : 'text-gray-500'}`} />
            </span>
            <h3 className="text-base ml-6">Create Reels</h3>
        </Link>

        <Link
            to="/message"
            className={`flex items-center h-16 font-semibold rounded-lg relative cursor-pointer hover:bg-gray-100
            ${isActive('/message') ? 'text-violet-500' : 'text-slate-800'} 
            ${isActive('/message') && 'bg-gray-100'}`} // Add background change on active
        >
            {isActive('/message') && <div className="w-2 h-full absolute top-0 left-0  bg-violet-500"></div>}
            <span>
              <FontAwesomeIcon icon={faMessage} className={`text-2xl ml-8 ${isActive('/noti') ? 'text-violet-500' : 'text-gray-500'}`} />
            </span>
            <h3 className="text-base ml-6">Message</h3>
        </Link>

      </div>

      {/* Create Post Button */}
      <label className="btn btn-primary bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 block text-center cursor-pointer">
        Create Post
      </label>
    </div>
  );
};

export default SideBar;
