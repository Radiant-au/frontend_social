import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { upadteUser } from '../../redux/actions/editProfileAction'; // Ensure correct import of the action
import { uploadToCloudinary } from '../../utils/uploadToCloudnary';


const ProfileModal = ({ isOpen, onClose }) => {
  const authUser = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(authUser.profileImg);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: authUser.username,
      profileImg: authUser.profileImg, // Store only the URL
    },
    onSubmit: async (values) => {

        setIsLoading(true);
        const uploadedUrl = await uploadToCloudinary(values.profileImg, "image");
        values.profileImg = uploadedUrl; // Set the uploaded URL in profileImg
        setIsLoading(false);
      
      // Dispatch the updateUser action
      dispatch(upadteUser(values));

      onClose(); // Close the modal after submission
    },
  });

  // Handle profile image change and preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Show image preview
      formik.setFieldValue('profileImg', file); // Set the file for upload in profileImg
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Profile Image Preview */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Image</label>
            <div className="flex items-center justify-between">
              <img
                src={previewImage || 'https://via.placeholder.com/100'}
                alt="profile preview"
                className="w-24 h-24 rounded-full object-cover mr-4"
              />
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="upload-profile"
              />
              {/* Button to trigger file input */}
              <label
                htmlFor="upload-profile"
                className="px-4 py-2 bg-violet-500 text-white rounded-lg cursor-pointer"
              >
                Upload Profile
              </label>
            </div>
          </div>

          {/* Username Update */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
