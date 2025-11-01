import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import API from "../../lib/axios";
import {
  Rocket,
  Globe,
  Briefcase,
  User,
  Mail,
  Key,
  Loader2,
  ArrowRight,
  LogIn,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", res.data);

      // Dispatch user data to Redux store
      dispatch(setUserData(res.data.data));

      // Navigate to chats on successful registration
      navigate("/chats");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
                Join the conversation and connect with the world
              </h2>
              <div className="space-y-4 mt-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <Rocket size={24} className="text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-lg">
                    Get started in seconds with easy registration
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <Globe size={24} className="text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-lg">
                    Connect with people from around the globe
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <Briefcase size={24} className="text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-lg">
                    Professional networking and personal chats
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Register Box */}
            <div className="w-1/2 max-w-md">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Create an account
                </h3>
                <p className="text-gray-600 mb-6">
                  Join Chatter today and start connecting
                </p>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="relative">
                    <Key
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="text-xs text-gray-600">
                    By clicking Sign Up, you agree to our Terms, Privacy Policy
                    and Cookies Policy.
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-900 hover:bg-gray-800"
                    } text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-4">
                        Already have an account?
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition duration-200 flex items-center gap-2 mx-auto"
                      >
                        <LogIn size={16} />
                        Log In
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Chatter &copy; {new Date().getFullYear()} - Connect, Chat,
                  Communicate
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

export default Register;
