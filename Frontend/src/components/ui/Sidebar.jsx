import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Gamepad2,
  Calendar,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useSelector((state) => state.user);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [{ path: "/chats", icon: MessageCircle, label: "Chats" }];

  const shortcuts = [
    { icon: ShoppingCart, label: "Marketplace" },
    { icon: Gamepad2, label: "Gaming" },
    { icon: Calendar, label: "Events" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-white border-r border-gray-300 flex flex-col h-screen transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      }`}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-300">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1
              className="text-2xl font-bold text-gray-900 cursor-pointer"
              onClick={() => navigate("/chats")}
            >
              Chatter
            </h1>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition duration-200"
            >
              {isCollapsed ? (
                <ChevronRight size={18} className="text-gray-600" />
              ) : (
                <ChevronLeft size={18} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-3 border-b border-gray-300">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Chatter"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-400 text-sm"
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full transition duration-200 flex items-center ${
                  isCollapsed
                    ? "justify-center p-3"
                    : "p-2 rounded-lg space-x-3"
                } ${
                  isActive(item.path)
                    ? "bg-gray-200 text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <IconComponent
                  size={22}
                  className={
                    isActive(item.path) ? "text-gray-900" : "text-gray-600"
                  }
                />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Shortcuts Section */}
        {!isCollapsed && (
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">
              Shortcuts
            </h3>
            <div className="space-y-1">
              {shortcuts.map((shortcut, index) => {
                const IconComponent = shortcut.icon;
                return (
                  <button
                    key={index}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition duration-200 flex items-center space-x-3 text-gray-700"
                  >
                    <IconComponent size={18} className="text-gray-600" />
                    <span className="text-sm">{shortcut.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* User Profile Footer */}
      <div className="p-2 border-t border-gray-300">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center p-2" : "p-2 rounded-lg space-x-2"
          } hover:bg-gray-100 cursor-pointer transition duration-200`}
          onClick={() => navigate("/profile")}
        >
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shrink-0">
            {userData?.profilePic ? (
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-semibold">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-gray-900 flex-1 truncate">
              {userData?.name || "User"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
