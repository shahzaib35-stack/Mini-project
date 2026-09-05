import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import {suceessToast,failureToast} from "../utilis/Toast"

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  let handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:4000/auth/login", formdata, {
        withCredentials: true,
      });
      dispatch(setLoading(true));
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        suceessToast(res.data.message);
        navigate("/");
      }
    } catch (error) {
      failureToast(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>
            <input
              name="email"
              value={formdata.email}
              onChange={handlechange}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Password
            </label>
            <input
              name="password"
              value={formdata.password}
              onChange={handlechange}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to={"/signup"}>
            <span className="text-blue-600 font-semibold cursor-pointer ml-1">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
