import React, { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { uploadToCloudinary } from '../../utils/uploadToCloudnary';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/actions/createPostAction';
import { useLocation, useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const initialValues = { caption: "", mediaUrl: "" };


const CreatePostModal = ({ isOpen, onRequestClose, onPost }) => {
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMediaChange = async (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      setMediaPreview(URL.createObjectURL(file));
      setMediaType(fileType);

      setIsLoading(true);
      console.log("Uploading media...");
      const uploadedUrl = await uploadToCloudinary(file, fileType);
      setIsLoading(false);

      if (uploadedUrl) {
        setFieldValue("mediaUrl", uploadedUrl);
      } else {
        console.error("Error uploading media");
      }
    }
  };

  const handleSubmit = (values) => {
    console.log("Submitting", values);
    dispatch(createPost(values))
    .then(() => {
      // After successful post creation, navigate to the original location
      const previousLocation = location.state?.from || "/";
      navigate(previousLocation);
    })
    .catch((error) => {
      console.error("Failed to create post:", error);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Post"
      className="w-3/5 mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={user.profileImg} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="font-medium">Your Name</span>
            </div>

            <div>
              <Field
                as="textarea"
                name="caption"
                placeholder="What's on your mind?"
                className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                rows={4}
              />
              <ErrorMessage name="caption" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Media Preview Section */}
            {mediaPreview && mediaType === 'image' && (
              <div className="relative">
                <img src={mediaPreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => { setMediaPreview(null); setMediaType(null); }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            )}

            {mediaPreview && mediaType === 'video' && (
              <div className="relative">
                <video controls className="w-full h-64 object-cover rounded-lg">
                  <source src={mediaPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={() => { setMediaPreview(null); setMediaType(null); }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <span className="text-gray-600">Add Photo/Video</span>
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={(e) => handleMediaChange(e, setFieldValue)}
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                className="ml-auto bg-violet-500 text-white py-2 px-6 rounded-full hover:bg-violet-600 transition"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Post"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreatePostModal;
