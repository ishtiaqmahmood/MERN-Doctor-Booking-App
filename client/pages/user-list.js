import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment/moment";

const userList = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("token");
      if (!item) {
        return Router.push("/login");
      }
    }
  };
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8000/api/admin/get-all-users",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    ProtectedRoute();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Users List</h1>
      <hr />
      <Table columns={columns} dataSource={user} />
    </Layout>
  );
};

export default userList;
