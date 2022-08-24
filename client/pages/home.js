import React, { useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute";

function home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>home</div>;
}

export default home;
