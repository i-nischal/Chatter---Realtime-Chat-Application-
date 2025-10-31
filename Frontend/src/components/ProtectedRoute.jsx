import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./ui/Loading";

const ProtectedRoute = () => {
  const { userData, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return (
      <Loading
        message="Checking authentication..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
