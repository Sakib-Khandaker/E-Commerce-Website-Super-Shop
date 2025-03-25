import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block text-white bg-transparent hover:bg-gray-700 hover:text-white p-2 rounded-md transition-all duration-200"
      >
        <AlignJustify className="text-white" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 border border-transparent shadow-sm transition-all duration-200"
        >
          <LogOut className="text-white" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
