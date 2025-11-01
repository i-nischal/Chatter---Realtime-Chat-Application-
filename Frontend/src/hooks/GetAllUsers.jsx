import { useEffect } from "react";
import API from "../lib/axios";
import { useDispatch } from "react-redux";
import { clearUserData, setLoading, setAllUsers } from "../redux/userSlice";

const useGetAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      // Set loading to true at the start
      dispatch(setLoading(true));

      try {
        const res = await API.get("/users/all");
        console.log("User data response:", res.data);

        if (res.data.data && res.data.data.user) {
          dispatch(setAllUsers(res.data.data.user));
        } else if (res.data.data) {
          dispatch(setAllUsers(res.data.data));
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

    fetchAllUsers();
  }, [dispatch]);
};

export default useGetAllUsers;
