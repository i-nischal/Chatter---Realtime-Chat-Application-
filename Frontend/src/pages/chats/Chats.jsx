import { useState } from "react";
import Layout from "../../components/Layout/layout";
import MessageArea from "../../components/ui/MessageArea";
import { Search, Video, Phone, Info } from "lucide-react";

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you doing?",
      timestamp: "2 min ago",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "Meeting at 3 PM tomorrow",
      timestamp: "1 hr ago",
      unread: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Did you see the latest project?",
      timestamp: "3 hrs ago",
      unread: 5,
      isOnline: true,
    },
  ];

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Layout>
      {/* Left Sidebar - Chats List */}
      <div className="w-80 border-r border-gray-300 bg-white flex flex-col">
        {/* Chats Header */}
        <div className="p-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Chats</h2>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center space-x-3 p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {chat.name.charAt(0)}
                  </span>
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs text-white font-semibold">
                    {chat.unread}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <MessageArea
        selectedChat={selectedChat}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </Layout>
  );
};

export default Chats;
