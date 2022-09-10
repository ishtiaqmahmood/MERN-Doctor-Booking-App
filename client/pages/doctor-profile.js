import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import DoctorForm from "../components/DoctorForm";
import moment from "moment/moment";

const doctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const router = useRouter();
  const params = router.query.path;
  console.log(params);
  // const keys = Object.keys(params);
  // console.log(keys);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/doctor/update-doctor-profile",
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
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/doctor/get-doctor-info-by-user-id",
        {
          userId: params,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getDoctorData();
    }
  }, [router.isReady]);

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
      <h1 className="page-title">Doctor profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  );
};

export default doctorProfile;
