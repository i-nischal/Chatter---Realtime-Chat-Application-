import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Settings,
  Shield,
  HelpCircle,
  Camera,
  Edit3,
  Save,
  X,
  Lock,
  Calendar,
  CheckCircle2,
  Clock,
  Power,
  Trash2,
  Upload,
  Loader2,
} from "lucide-react";
import API from "../lib/axios";

const Profile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    bio: userData?.bio || "Hey there! I'm using Chatter.",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.name || "",
      email: userData?.email || "",
      bio: userData?.bio || "Hey there! I'm using Chatter.",
    });
    setIsEditing(false);
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await API.put("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        // Update the profile image in the UI
        // You might want to dispatch an action to update Redux state here
     
        console.log("Profile picture updated:", response.data);
        // Force reload or update state to show new image
        window.location.reload(); // Simple solution, or update Redux state
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Get profile image from userData.profile (based on your API response)
  const profileImage = userData?.profile;

  // Get first letter of name for fallback
  const getFirstLetter = () => {
    return userData?.name?.[0]?.toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleProfilePictureUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Chatter</h1>
            <button
              onClick={() => navigate("/chats")}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition duration-200"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <button
            onClick={() => navigate("/chats")}
            className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700"
          >
            <ArrowLeft size={20} />
            Back to Chats
          </button>
          <div className="w-full flex items-center gap-3 text-left p-3 rounded-lg bg-gray-100 text-gray-900 font-medium">
            <User size={20} />
            Profile
          </div>
          <button className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700">
            <Settings size={20} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700">
            <Shield size={20} />
            Privacy
          </button>
          <button className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-gray-700">
            <HelpCircle size={20} />
            Help
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
                    <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If image fails to load, hide it and show letter
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                      {/* Always show the first letter as fallback */}
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          profileImage ? "hidden" : "flex"
                        }`}
                      >
                        {getFirstLetter()}
                      </div>

                      {/* Upload overlay */}
                      {uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Loader2
                            size={24}
                            className="text-white animate-spin"
                          />
                        </div>
                      )}
                    </div>

                    {/* Upload button - always visible */}
                    <button
                      onClick={triggerFileInput}
                      disabled={uploading}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Upload size={14} />
                      )}
                    </button>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-3 py-2 text-2xl font-semibold w-full max-w-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Your name"
                        />
                      ) : (
                        userData?.name || "User Name"
                      )}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="your@email.com"
                        />
                      ) : (
                        userData?.email || "user@example.com"
                      )}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md h-20 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Tell everyone about yourself..."
                        />
                      ) : (
                        formData.bio
                      )}
                    </p>

                    {/* Upload hint text */}
                    <p className="text-xs text-gray-500 mt-2">
                      Click the upload button to change your profile picture
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
                      className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                      <Edit3 size={18} />
                      Edit Profile
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-200">
                      <Lock size={18} />
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
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={16} />
                      Member Since
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-300">
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : "January 2024"}
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <CheckCircle2 size={16} />
                      Account Status
                    </label>
                    <p className="text-green-600 bg-green-50 px-3 py-2 rounded border border-green-200">
                      ✅ Active
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <CheckCircle2 size={16} />
                      Email Verification
                    </label>
                    <p className="text-green-600 bg-green-50 px-3 py-2 rounded border border-green-200">
                      ✅ Verified
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Clock size={16} />
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
                  <button className="flex items-center gap-2 border border-red-300 hover:bg-red-100 text-red-700 px-6 py-2 rounded-lg font-medium transition duration-200">
                    <Power size={18} />
                    Deactivate Account
                  </button>
                  <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200">
                    <Trash2 size={18} />
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
