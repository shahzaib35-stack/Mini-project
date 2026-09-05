import React from "react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { suceessToast } from "../utilis/Toast";
import { setUser } from "../redux/slices/auth.slice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/auth/logout",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        suceessToast(res.data.message);
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              Property
              <span className="text-blue-600">Connect</span>
            </h1>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="hidden items-center gap-9 text-sm font-medium text-slate-600 md:flex">

            <Link
              to="/"
              className="relative py-1 transition-colors hover:text-blue-600
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-blue-600 after:transition-all
              hover:after:w-full"
            >
              Home
            </Link>

            <Link
              to="/how-it-work"
              className="relative py-1 transition-colors hover:text-blue-600
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-blue-600 after:transition-all
              hover:after:w-full"
            >
              How It Works
            </Link>

            {/* ADMIN LINK */}
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="relative py-1 transition-colors hover:text-blue-600
                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:w-0 after:bg-blue-600 after:transition-all
                hover:after:w-full"
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="hidden items-center gap-3 md:flex">

            {/* SUBMIT REQUIREMENT */}
            <Link
              to="/form"
              className="inline-flex items-center gap-1.5 rounded-lg
              bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white
              shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Submit Requirement
            </Link>

            {/* LOGOUT / LOGIN */}
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-lg
                bg-red-600 px-5 py-2.5 text-sm font-semibold text-white
                shadow-sm transition-all hover:-translate-y-0.5
                hover:bg-red-700 hover:shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center rounded-lg
                bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white
                shadow-sm transition-all hover:-translate-y-0.5
                hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;