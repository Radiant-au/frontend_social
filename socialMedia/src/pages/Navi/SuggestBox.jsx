import React, { useEffect, useState } from "react";
import { api, base_api_url } from "../../api/url";
import { useSelector } from "react-redux";

const SuggestBox = () => {
    const [users, setUsers] = useState([]); // Initialize as an empty array
    const currentUser = useSelector((state) => state.auth);

    // Fetch users data and filter out users already followed by currentUser
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`${base_api_url}/api/users`);
                const updatedUsers = response.data
                    .filter(user => !user.followers.includes(currentUser.id) || !currentUser) // Only include users not followed by currentUser
                    .map(user => ({
                        ...user,
                        followed: user.followers.includes(currentUser.id) // Check if current user is in followers
                    }));
                setUsers(updatedUsers); // Set the user data in local state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); // Fetch users on mount
    }, [currentUser.id]);

    // Function to toggle follow/unfollow
    const toggleFollow = async (index) => {
        const selectedUser = users[index];
        const updatedUsers = [...users]; // Create a copy of users array
        const originalFollowedState = selectedUser.followed; // Save original follow state for revert in case of failure

        // Optimistically update the UI
        updatedUsers[index].followed = !originalFollowedState;
        setUsers(updatedUsers);

        try {
            // Make the API call to toggle follow/unfollow
            await api.put(`${base_api_url}/api/users/${selectedUser.id}`);

            if (originalFollowedState) {
                // If was followed, remove currentUser from followers
                updatedUsers[index].followers = updatedUsers[index].followers.filter(
                    followerId => followerId !== currentUser.id
                );
            } else {
                // If was not followed, add currentUser to followers
                updatedUsers[index].followers.push(currentUser.id);
            }

            // Reapply state to ensure it is correct after API call
            setUsers(updatedUsers);

        } catch (error) {
            // If API fails, revert the UI state
            console.error("Error toggling follow status:", error);
            updatedUsers[index].followed = originalFollowedState; // Revert state
            setUsers(updatedUsers); // Reapply the reverted state
        }
    };

    return (
        <div className="max-w-sm p-4 bg-transparent">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Suggested for you</h3>
                <a href="#" className="text-sm text-blue-500">See All</a>
            </div>

            <ul className="space-y-4">
                {users.map((user, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={user.profileImg || 'https://via.placeholder.com/100'}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-semibold">
                                    {user.username}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Followers: {user.followers.length} | Following: {user.followings.length}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleFollow(index)}
                            className={`text-sm ${user.followed ? 'text-gray-500' : 'text-blue-500'}`}
                        >
                            {user.followed ? 'Unfollow' : 'Follow'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SuggestBox;
