import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { api, base_api_url } from '../../api/url';
import Comment from "./Comment";
import { Field, Form, Formik } from 'formik';
import { likePost } from '../../redux/actions/likePostAction';
import { useSelector } from 'react-redux';

const initialValues = { text: "" };

function Popup({ post, onClose }) {
  const [user, setUser] = useState(null); // Local state to hold the user for this specific post
  const [comments, setComments] = useState(post.comments); // Initialize state with existing comments
  const [isLiked, setIsLiked] = useState(false);
  const authUser = useSelector((state) => state.auth.user);

  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  useEffect(() => {
    setComments(post.comments); // Whenever `post.comments` changes, update the state
  }, [post.comments]);

  useEffect(() => {
    if (post.userId) {
      api.get(`${base_api_url}/api/users/${post.userId}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.log(error));
    }

    if(post.likedUserIds.some(userId => userId === authUser.id)){
        console.log("true");
        setIsLiked(true);
      }

  }, [post.userId , post.likedUserIds]);

  

  // Handle top-level comment submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await api.post(`${base_api_url}/api/comments/${post.id}`, values);
      setComments((prevComments) => [...prevComments, response.data]); // Append new top-level comment to comments
      resetForm(); // Clear the form
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle like state
    dispatch(likePost(post.id));
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-start justify-center z-50'>
      <div className="bg-white flex shadow-lg w-2/3 h-102 mt-10 overflow-y-scroll no-scrollbar">
        <div className="w-1/2 h-full flex items-center px-2 border-r-2 border-gray-400 bg-black">
          
          {isImage(post.mediaUrl) && (
          <img src={post.mediaUrl} alt="Feed" className="sm:block hidden rounded-2xl" />
            )}
            {isVideo(post.mediaUrl) && (
            <video controls className="sm:block hidden rounded-2xl">
                <source src={post.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            )}
        </div>
        <div className="sm:w-1/2 px-2 flex flex-col justify-between">
          <div className='overflow-y-scroll no-scrollbar'>
            {/* Profile Info */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center">
                {user && (
                  <>
                    <img src={user.profileImg} alt="profile" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                      <p className="text-sm font-semibold">{user.username}</p>
                    </div>
                  </>
                )}
              </div>
              <FontAwesomeIcon icon={faTimes} className="text-gray-500 cursor-pointer" onClick={onClose} />
            </div>

            {/* Post Caption */}
            <div className="px-4 pb-4">
              <p className="text-sm">
                <b>{post.user?.username}</b> {post.caption}
              </p>
            </div>

            {/* Interactions (likes, comments) */}
            <div className="flex justify-between items-center p-4">
              <div className="flex space-x-4">
                <FontAwesomeIcon icon={isLiked ? solidHeart : faHeart} className={`text-xl ${isLiked ? 'text-pink-500' : 'text-gray-800'} hover:text-gray-600`}/> 
                <FontAwesomeIcon icon={faComment} className="text-xl text-gray-800" />
                <FontAwesomeIcon icon={faBookmark} className="text-xl text-gray-800" />
              </div>
              <p className="text-sm text-gray-500">{post.likedUserIds.length} likes</p>
            </div>

            {/* Comments Section */}
            <div className="px-4 pb-4">
              {comments.map((comment) => (
                <Comment 
                  key={comment.id} 
                  comment={comment} 
                  allComments={comments} 
                
                />
              ))}
            </div>
          </div>

          {/* Add a form for top-level comments */}
          <div className="p-4 border-t-2">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="max-w-full mb-3">
                <div className="relative">
                  <Field
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    name="text"
                    placeholder="Add a comment..."
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-violet-500 hover:bg-violet-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-2"
                  >
                    Post
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Popup;
