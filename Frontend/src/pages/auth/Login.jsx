import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../lib/axios";
import { setUserData } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  ;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation (optional - you can remove this too if you want)
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      dispatch(setUserData(res.data.data));
      console.log("Login successful:", res.data);

      // Navigate to chats on successful login
      navigate("/chats");
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Logo Only */}
      <div className="bg-white border-b border-gray-300 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-gray-900">Chatter</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left Side - Welcome Message */}
            <div className="w-1/2 pr-12">
              <h2 className="text-4xl font-light text-gray-800 mb-6 leading-tight">
                Connect and chat with people around the world
              </h2>
              <div className="space-y-4 mt-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-600 text-xl">💬</span>
                  </div>
                  <span className="text-gray-700 text-lg">
                    Real-time messaging with anyone, anywhere
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-600 text-xl">👥</span>
                  </div>
                  <span className="text-gray-700 text-lg">
                    Join communities and group chats
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-600 text-xl">🔒</span>
                  </div>
                  <span className="text-gray-700 text-lg">
                    Secure and private conversations
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Box */}
            <div className="w-1/2 max-w-md">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Log in to Chatter
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay connected with your conversations
                </p>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-900 hover:bg-gray-800"
                    } text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>

                  <div className="text-center">
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                    >
                      Forgotten password?
                    </a>
                  </div>

                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-4">
                        Don't have an account?
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition duration-200"
                      >
                        Create New Account
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By logging in, you agree to our Terms, Privacy Policy and
                  Cookies Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Chatter &copy; {new Date().getFullYear()} - Connect, Chat,
              Communicate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
