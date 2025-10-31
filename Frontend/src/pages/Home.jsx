import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate("/")}>
                Chatter
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 hover:text-gray-900 font-medium transition duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition duration-200 shadow-sm"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-800 mb-6 leading-tight">
              Welcome to <span className="font-bold">Chatter</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect, communicate, and collaborate with people around the world in real-time.
            </p>
          </div>

          {/* About Chatter Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 mb-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
              About Chatter
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Features */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xl">💬</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Real-time Messaging</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Experience seamless, instant messaging with friends, family, and colleagues from anywhere in the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xl">👥</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Group Chats</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Create and manage group conversations for teams, communities, or special interest groups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xl">🔒</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Your conversations are protected with end-to-end encryption and advanced privacy controls.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - More Features */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xl">🌍</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Global Connectivity</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Connect with people across different time zones and locations without any barriers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xl">📱</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Cross-Platform</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Access Chatter from any device - desktop, tablet, or mobile - with a consistent experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Built with performance in mind, ensuring your messages are delivered instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center bg-gray-900 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-semibold mb-4">Ready to Start Chatting?</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already connecting through Chatter. Sign up now and experience the future of messaging.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">
              Chatter &copy; {new Date().getFullYear()} - Connect, Chat, Communicate
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-200">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-200">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-200">Help</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;