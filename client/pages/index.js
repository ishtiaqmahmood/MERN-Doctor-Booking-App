import React, { useEffect } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        Router.push("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      Router.push("/login");
    }
  };
  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("token");
      if (!item) {
        return Router.push("/login");
      }
    }
  };
  useEffect(() => {
    ProtectedRoute();
  }, []);
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  return (
    <div>
      <Layout>
        <div>home</div>
      </Layout>
    </div>
  );
}

export default App;
