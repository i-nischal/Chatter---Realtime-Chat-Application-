import { useEffect } from "react";
import API from "../lib/axios";
import { useDispatch } from "react-redux";
import { setUserData, clearUserData, setLoading } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      // Set loading to true at the start
      dispatch(setLoading(true));

      try {
        const res = await API.get("/auth/me");
        console.log("User data response:", res.data);

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
        // Important: Clear user data on error
        dispatch(clearUserData());
      } finally {
        // Always set loading to false when done (success or error)
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
