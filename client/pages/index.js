import React, { useState, useEffect } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Row, Col } from "antd";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";
import Doctor from "../components/Doctor";

function App() {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
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
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8000/api/user/get-all-approved-doctors",
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default App;
