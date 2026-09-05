import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setLoading,setUser} from "../redux/slices/auth.slice"
import {suceessToast,failureToast} from "../utilis/Toast"

export default function Signup() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [fordata,setFordata]=useState({
    name:"",
    email:"",
    password:""
  })
  let handleChange=(e)=>{
     setFordata({...fordata,[e.target.name]: e.target.value,});
  }
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    dispatch(setLoading(true));

    const res = await axios.post(
      "http://localhost:4000/auth/signup",
      fordata,
      { withCredentials: true }
    );

    if (res.data.success) {
      dispatch(setUser(res.data.user));

      suceessToast(res.data.message);

      navigate("/")
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
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">Join us today</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Full Name
            </label>
            <input
             value={fordata.name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>
            <input
             value={fordata.email}
               name="email"
              onChange={handleChange}
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
             value={fordata.password}
               name="password"
              onChange={handleChange}
              type="password"
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to={"/login"}>
            <span className="text-blue-600 font-semibold cursor-pointer ml-1">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
