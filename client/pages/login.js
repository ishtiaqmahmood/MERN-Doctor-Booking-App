import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";

function login() {
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirect to home page");
        localStorage.setItem("token", response.data.data);
        Router.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Toaster
        position="top-center"
        //reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <div className="authentication">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Welcome back</h1>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <Button className="primary-button my-2" htmlType="submit">
              Login
            </Button>
          </Form>
          <Link href="/register">
            <a className="anchor mt-2">Click here to Register</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default login;
