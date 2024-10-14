import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { api } from "../../api/url";
import { useDispatch, useSelector } from "react-redux";
import { likeComment } from "../../redux/actions/likeCommentAction";


const initialValues = { text: "" };

const Comment = ({ comment, allComments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);

  // Initialize replies either from replyId or as an empty array
  useEffect(() => {
    const fetchedReplies = comment.replyId.length > 0
      ? comment.replyId.map((replyId) => allComments.find((c) => c.id === replyId))
      : [];
    setReplies(fetchedReplies);
  }, [allComments, comment.replyId]);

  useEffect(()=>{
    if(comment.likedUserIds.some(userId => userId === authUser.id)){
      setIsLiked(true);
    }
  } , [comment.likedUserIds])

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle like state
    dispatch(likeComment(comment.id));
  };

  const isReply = allComments.some((c) => c.replyId.includes(comment.id));

  if (isReply) {
    return null;
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Post the reply to the server
      const response = await api.put(`/api/comments/reply/${comment.id}`, values);
      const newReply = response.data; // Assuming the server returns the new reply object

      // Update replies state with the new reply
      setReplies((prevReplies) => [...prevReplies, newReply]);

      // Update the comment's replyId array with the new reply's id
      comment.replyId = [...comment.replyId, newReply.id];

      // Close the reply form and reset the form
      setReplying(false);
      resetForm();
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className="mt-4">
      {/* Parent Comment */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={comment.profileImg}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm ml-2 text-gray-600">
            <span className="font-semibold">{comment.username}</span> {comment.text}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center cursor-pointer" onClick={handleLikeClick}>
          <FontAwesomeIcon icon={isLiked ? solidHeart : faHeart} className={`text-xl ${isLiked ? 'text-pink-500' : 'text-gray-800'} hover:text-gray-600`}/> 
              <small className="text-xss text-gray-600">{comment.likedUserIds.length || <></>}</small>
          </div>
          <p
            className="text-xs ml-4 text-gray-600 cursor-pointer"
            onClick={() => setReplying(!replying)}
          >
            {replying ? "Cancel" : "Reply"}
          </p>
        </div>
      </div>

      {/* Reply Form */}
      {replying && (
        <div className="ml-12 mt-2 relative">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                type="text"
                placeholder="Write a reply..."
                name="text"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-violet-500 hover:bg-violet-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-2"
              >
                Post
              </button>
            </Form>
          </Formik>
        </div>
      )}

      {/* Show "View Replies" only for parent comments with actual replies */}
      {replies.length > 0 && (
        <p
          className="text-xs ml-11 text-gray-500 cursor-pointer"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies
            ? "Hide Replies"
            : `View ${replies.length} ${replies.length > 1 ? "replies" : "reply"}`}
        </p>
      )}

      {/* Render replies if this is a parent and we are showing them */}
      {showReplies &&
        replies.map((reply) => (
          <div key={reply.id} className="ml-14 mt-2 flex items-center justify-between">
            <div className="flex items-center">
                <img
                  src={reply.profileImg}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm ml-2">
                  <span className="font-semibold">{reply.username}</span> {reply.text}
                </p>
            </div>
            {/* <div className="flex flex-col items-center cursor-pointer" onClick={handleLikeClick}>
              <FontAwesomeIcon icon={isLiked ? solidHeart : faHeart} className={`text-xl ${isLiked ? 'text-pink-500' : 'text-gray-800'} hover:text-gray-600`}/> 
              <small className="text-xss text-gray-600">{comment.likedUserIds.length || <></>}</small>
          </div> */}
          </div>
        ))}
    </div>
  );
};

export default Comment;
