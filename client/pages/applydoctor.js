import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Router from "next/router";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response);
        Router.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.log(error);
    }
  };
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
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
};

export default ApplyDoctor;
