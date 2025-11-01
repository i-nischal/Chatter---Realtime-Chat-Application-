import { useSelector } from "react-redux";
import Sidebar from "../ui/Sidebar";

const Layout = ({ children, showSidebar = true }) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-white flex">
      {showSidebar && <Sidebar userData={userData} />}
      <main className="flex-1 flex">
        {children}
      </main>
    </div>
  );
};

export default Layout;