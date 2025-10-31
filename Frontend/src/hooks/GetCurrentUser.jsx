import { useEffect } from "react";
import API from "../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = async () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log("Failed to fetch user info", error.message);
      }
    };
    fetchUser();
  }, [userData]);
};

export default getCurrentUser;
