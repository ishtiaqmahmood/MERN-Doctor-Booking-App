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
import { Col, DatePicker, Row, TimePicker, Button } from "antd";
import Image from "next/image";

const bookAppointment = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const router = useRouter();
  const params = router.query.name;
  //console.log(params);

  const dispatch = useDispatch();
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

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params,
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

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8000/api/user/book-appointment",
        {
          doctorId: params,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
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
        router.push("/appointment");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response =
        date &&
        time &&
        time > doctor.timings[0] &&
        time < doctor.timings[1] &&
        (await axios.post(
          "http://localhost:8000/api/user/check-booking-availability",
          {
            doctorId: params,
            date: date,
            time: time,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ));
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getDoctorData();
    }
  }, [router.isReady]);
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
      {doctor && (
        <div>
          <h1 className="page-title container d-flex align-items-center justify-content-center">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5">
            <Col span={12} sm={24} xs={24} lg={8}>
              {/* <Image
                src="https://media.istockphoto.com/vectors/hand-pointer-or-cursor-mouse-clicking-on-book-online-button-linear-vector-id1319058954?k=20&m=1319058954&s=612x612&w=0&h=qXOYOr29EuZvzXNh6KLjtPg8UP4MybqNmuYt1SrUkrg="
                alt=""
                width={400}
                height={400}
              /> */}
            </Col>
            <Col span={12} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings : </b>
                {doctor.timings[0]} - {doctor.timings[1]}
                <hr />
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctor.feePerConsultation}
              </p>
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}
                {/* <Button
                  className="primary-button mt-3"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button> */}
                {isAvailable && (
                  <Button className="primary-button mt-3" onClick={bookNow}>
                    Book now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default bookAppointment;
