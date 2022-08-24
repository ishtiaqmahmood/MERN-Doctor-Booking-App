import React from "react";
import Router from "next/router";

const PublicRoute = (props) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem("token");
    if (item) {
      Router.push("/");
    } else {
      return props.children;
    }
  }
};

export default PublicRoute;
