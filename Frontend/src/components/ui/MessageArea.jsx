import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image, 
  Plus, 
  Video, 
  Phone,
  Smile
} from 'lucide-react';

const MessageArea = ({ selectedChat, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <MessageCircle size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your messages
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {selectedChat.name.charAt(0)}
              </span>
            </div>
            {selectedChat.isOnline && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {selectedChat.name}
            </h3>
            <p className="text-xs text-gray-500">
              {selectedChat.isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-200">
            <Video size={18} className="text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-200">
            <Phone size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-300 p-4">
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-200">
            <Plus size={18} className="text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-200">
            <Image size={18} className="text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-200">
            <Smile size={18} className="text-gray-600" />
          </button>
          
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-400 text-sm"
          />
          
          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-200 ${
              message.trim() ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-200"
            }`}
          >
            <Send size={16} className={message.trim() ? "text-white" : "text-gray-600"} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Separate component for individual messages
const MessageBubble = ({ message }) => (
  <div className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        message.sender === "me"
          ? "bg-gray-900 text-white rounded-tr-none"
          : "bg-white text-gray-900 rounded-tl-none border border-gray-200"
      }`}
    >
      <p className="text-sm">{message.text}</p>
      <p className={`text-xs mt-1 ${
        message.sender === "me" ? "text-gray-400" : "text-gray-500"
      }`}>
        {message.timestamp}
      </p>
    </div>
  </div>
);

export default MessageArea;