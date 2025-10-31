import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./ui/Loading";


const PublicRoute = () => {
  const { userData, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <Loading message="Loading..." variant="dots" size="md" />;
  }

  if (userData) {
    return <Navigate to="/chats" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
