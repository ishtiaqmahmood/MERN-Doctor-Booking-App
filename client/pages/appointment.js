import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

const appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("token");
      if (!item) {
        return Router.push("/login");
      }
    }
  };
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8000/api/user/get-appointments-by-user-id",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  useEffect(() => {
    ProtectedRoute();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default appointment;
