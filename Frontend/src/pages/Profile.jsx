import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    bio: userData?.bio || "Hey there! I'm using Chatter.",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    console.log("Saving profile:", formData);
    setIsEditing(false);
    // dispatch(updateProfile(formData));
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.name || "",
      email: userData?.email || "",
      bio: userData?.bio || "Hey there! I'm using Chatter.",
    });
    setIsEditing(false);
  };

  // Default profile picture if none exists
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Similar to Messenger */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Chatter</h1>
            <button
              onClick={() => navigate("/chats")}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition duration-200"
            >
              <span className="text-gray-600">←</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <button
            onClick={() => navigate("/chats")}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700"
          >
            ← Back to Chats
          </button>
          <div className="w-full text-left p-3 rounded-lg bg-gray-100 text-gray-900 font-medium">
            👤 Profile
          </div>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700">
            ⚙️ Settings
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700">
            🛡️ Privacy
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700">
            ❓ Help
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-300 p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile</h2>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
              {/* Profile Picture Section */}
              <div className="p-8 border-b border-gray-300">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                      {userData?.profilePic ? (
                        <img
                          src={userData.profilePic}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        getInitials(userData?.name)
                      )}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm hover:bg-gray-700 transition duration-200">
                        📷
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-3 py-2 text-2xl font-semibold w-64 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      ) : (
                        userData?.name || "User Name"
                      )}
                    </h3>
                    <p className="text-gray-600">
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      ) : (
                        userData?.email || "user@example.com"
                      )}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-3 py-2 w-64 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Tell everyone about yourself..."
                        />
                      ) : (
                        formData.bio
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                      Edit Profile
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-200">
                      Change Password
                    </button>
                  </div>
                )}
              </div>

              {/* Additional Info Section */}
              <div className="p-8 border-t border-gray-300">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Information
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-300">
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : "January 2024"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Status
                    </label>
                    <p className="text-green-600 bg-green-50 px-3 py-2 rounded border border-green-200">
                      ✅ Active
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Verification
                    </label>
                    <p className="text-green-600 bg-green-50 px-3 py-2 rounded border border-green-200">
                      ✅ Verified
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Active
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-300">
                      Just now
                    </p>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-8 border-t border-gray-300 bg-red-50">
                <h4 className="text-lg font-semibold text-red-800 mb-4">
                  Danger Zone
                </h4>
                <div className="flex space-x-3">
                  <button className="border border-red-300 hover:bg-red-100 text-red-700 px-6 py-2 rounded-lg font-medium transition duration-200">
                    Deactivate Account
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
