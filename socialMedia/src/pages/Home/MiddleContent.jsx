import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stories from './Stories';
import CreatePostModal from './CreatePost';
import Feed from './Feed';
import Popup from './Popup';  // Import Popup component
import { getAllPost } from '../../redux/actions/getAllPost';

const MiddleContent = ({ onCommentClick }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);  // Access posts from Redux
  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);  // For CreatePostModal
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // For Popup (post-specific comment modal)
  const [selectedPost, setSelectedPost] = useState(null);  // State to hold selected post for popup

  useEffect(() => {
    dispatch(getAllPost());  // Fetch all posts on component mount
  }, [dispatch]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);   // Open CreatePostModal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close CreatePostModal
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);  // Set selected post for Popup
    setIsPopupOpen(true);   // Open Popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);  // Close Popup
  };

  return (
    <div className="w-full">
      {/* Stories Component */}
      <Stories />

      {/* Create Post Form */}
      <form className="flex items-center justify-between mt-6 bg-white rounded-4xl px-4 py-2">
        <div className="profile-photo w-12 h-12 rounded-full overflow-hidden">
          <img src={user.profileImg} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="px-4 py-2 b bg-transparent justify-self-start"
          id="create-post"
          readOnly
          onClick={handleOpenModal}  // Open CreatePostModal on input click
        />
        <button
          value="Post"
          className="btn btn-primary bg-violet-500 text-white py-2 px-6 rounded-4xl cursor-pointer"
          onClick={handleOpenModal}  // Open CreatePostModal on button click
        >Post
        </button>
      </form>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}  // Bind modal open state
        onRequestClose={handleCloseModal}  // Close modal
      />

      {/* Feeds Section */}
      <div className="feeds mt-6 space-y-6">
        {posts.map((post) => (
          <Feed key={post.id} post={post} onCommentClick={() => handlePostClick(post)} />  // Open Popup on comment click
        ))}
      </div>

      {/* Post Popup for Comment */}
      {isPopupOpen && selectedPost && (
        <Popup post={selectedPost} onClose={handleClosePopup} />  // Pass selected post to popup
      )}
    </div>
  );
};

export default MiddleContent;
