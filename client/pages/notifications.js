import { Tabs } from "antd";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { showLoading, hideLoading } from "../redux/alertSlice";
import Router from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";

const notifications = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  console.log(user);
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

  const markAllASSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/user/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllASSeen()}>
              Mark all as seen
            </h1>
          </div>
          {user.unseenNotifications.map((notification) => (
            <div
              className="card p-2 mt-2"
              onClick={() => {
                router.push(notification.onClickPath);
              }}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => deleteAll()}>
              Delete all
            </h1>
          </div>
          {user.seenNotifications.map((notification) => (
            <div
              className="card p-2 mt-2"
              onClick={() => {
                router.push(notification.onClickPath);
              }}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default notifications;
