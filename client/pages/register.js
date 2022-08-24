import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";

function register() {
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        values
      );
      dispatch(hideLoading);
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirect to login page");
        Router.push("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(showLoading);
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
          <h1 className="card-title">Nice to meet you</h1>
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <Button className="primary-button my-2" htmlType="submit">
              Register
            </Button>
          </Form>

          <Link href="/login">
            <a className="anchor mt-2">Click here to login</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default register;
