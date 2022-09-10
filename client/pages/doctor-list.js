import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import toast, { Toaster } from "react-hot-toast";

const doctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("token");
      if (!item) {
        return Router.push("/login");
      }
    }
  };
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8000/api/admin/get-all-doctors",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/admin/change-doctor-status",
        { doctorId: record._id, userId: record.userId, status: status },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorData();
      }
    } catch (error) {
      toast.error("Error chainging doctor account status");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(() => {
    ProtectedRoute();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
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
      <h1 className="page-header">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default doctorList;
