import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart , faComment, faShareFromSquare, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { api, base_api_url } from '../../api/url';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../redux/actions/likePostAction';

const Feed = ({ post, onCommentClick }) => {
  const [user, setUser] = useState(null); // Local state to hold the user for this specific post
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (post.userId) {
      // Fetch user data directly using axios
      api.get(`${base_api_url}/api/users/${post.userId}`)
        .then((response) => {
          setUser(response.data); // Set the user data in local state
        })
        .catch((error) => console.log(error));
    }
  }, [post.userId]);

  useEffect(()=>{
  
    if(post.likedUserIds.some(userId => userId === authUser.id)){
      console.log("true");
      setIsLiked(true);
    }
  } , [post.likedUserIds , authUser.id])

  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle like state
    dispatch(likePost(post.id));

    // Optimistically update the likedUserIds count
    if (isLiked) {
      post.likedUserIds = post.likedUserIds.filter(userId => userId !== authUser.id); // Remove like
    } else {
      post.likedUserIds.push(authUser.id); // Add like
    }
  };

  return (
    <div className="feed bg-white p-4 rounded-lg shadow">
      {/* Feed Header */}
      <div className="head flex items-center justify-between">
        <div className="user flex items-center space-x-4">
          {user && (
            <>
              <div className="profile-photo w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={user.profileImg}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="info">
                <h3 className="text-gray-900 font-semibold">{user.username}</h3>
              </div>
            </>
          )}
        </div>
        <span className="edit cursor-pointer">
          <i className="uil uil-ellipsis-h"></i>
        </span>
      </div>

      {/* Media (Image or Video) */}
      <div className="media mt-4">
        {isImage(post.mediaUrl) && (
          <img src={post.mediaUrl} alt="Feed" className="w-full rounded-lg" />
        )}
        {isVideo(post.mediaUrl) && (
          <video controls className="w-full rounded-lg">
            <source src={post.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons flex justify-between mt-4">
        <div className="interaction-buttons flex space-x-4">
          <span className="cursor-pointer" onClick={handleLikeClick}>
              <FontAwesomeIcon
                  icon={isLiked ? solidHeart : faHeart}
                  className={`text-xl ${isLiked ? 'text-pink-500' : 'text-gray-800'} hover:text-gray-600`}

      
                />          
            </span>
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faComment} className='text-xl text-gray-800 hover:text-gray-600' onClick={onCommentClick} />
          </span>
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faShareFromSquare} className='text-xl text-gray-800 hover:text-gray-600' />
          </span>
        </div>
        <div className="bookmark cursor-pointer">
          <span>
            <FontAwesomeIcon icon={faBookmark} className='text-xl text-gray-800 hover:text-gray-600' />
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="caption mt-2">
        <p><b>{user ? user.username : 'Loading...'}</b> {post.caption}</p>
      </div>

      {/* Comments */}
      <div className="comments text-gray-500 mt-2 cursor-pointer" onClick={onCommentClick}>
        View all {post.comments.length} comments
      </div>
    </div>
  );
};

export default Feed;

