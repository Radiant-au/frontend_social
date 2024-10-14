import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPost } from '../../redux/actions/getUserPost';
import ProfileModal from './ProfileModal';

const User = () => {
  const { id } = useParams(); // Get user ID from route params
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const authUser = useSelector((state) => state.auth.user); // Get authenticated user data
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id == authUser.id) {
      setProfile(authUser);
      dispatch(getUserPost());
    } 
  }, [dispatch, id]);

  return (
    <div>
      {/* Profile Info */}
      <div className="flex justify-between items-center py-4">

        <div className="flex items-center">
          <img src={authUser.profileImg || 'https://via.placeholder.com/100'} alt="profile" className="w-36 h-36 rounded-full" />
          <div className="ml-8">
            <div className="flex space-x-12 mt-2">
              <h2 className="font-semibold">{profile.username}</h2>
              <button className="border border-gray-400 px-4 py-1 rounded-lg text-sm" onClick={() => setModalOpen(true)}>
                Edit profile
              </button>
              <button className="ml-2 border border-gray-400 px-4 py-1 rounded-lg text-sm">
                View archive
              </button>
            </div>

            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />

            <div className="flex space-x-16 mt-2">
              <p>
                <span className="font-semibold">{posts.length}</span> posts
              </p>
              <p>
                <span className="font-semibold">{profile.followers?.length || 0}</span> followers
              </p>
              <p>
                <span className="font-semibold">{profile.followings?.length || 0}</span> following
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-0.5 bg-slate-500 mt-6"></div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-2 mt-8 cursor-pointer">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            {/* Check the file extension of mediaUrl to determine whether it's an image or a video */}
            {post.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img src={post.mediaUrl} alt={post.caption} className="w-64 h-60 object-cover" />
            ) : post.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video className="w-64 h-60 object-cover" controls>
                <source src={post.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        ))}
      </div>

    </div>
  );
};

export default User;
