import "./App.css";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HowItWork from "./pages/HowItWork";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading, setUser } from "./redux/slices/auth.slice";
import axios from "axios";
import AdminRoute from "./AdminRoute";
import Admin from "./pages/Admin";
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    async function getCrrUser() {
      try {
        dispatch(setLoading(true));

        const res = await axios.get("http://localhost:4000/auth/get-me", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log("Message:", error.message);
        console.log("Response:", error.response);
      } finally {
        dispatch(setLoading(false));
      }
    }

    getCrrUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-work" element={<HowItWork />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
