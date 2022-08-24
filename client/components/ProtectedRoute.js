import React from "react";
import Router from "next/router";

const ProtectedRoute = (props) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem("token");
    if (item) {
      return props.children;
    } else {
      return Router.push("/login");
    }
  }
};

export default ProtectedRoute;
