import { useEffect } from "react";
import API from "../lib/axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        console.log("User data response:", res.data); // Debug log

        // Adjust based on your API response structure
        if (res.data.data && res.data.data.user) {
          dispatch(setUserData(res.data.data.user));
        } else if (res.data.data) {
          dispatch(setUserData(res.data.data));
        }
      } catch (error) {
        console.log(
          "Failed to fetch user info",
          error.response?.data || error.message
        );
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
