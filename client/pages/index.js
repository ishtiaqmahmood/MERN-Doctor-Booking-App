import React, { useEffect } from "react";
import Router from "next/router";

function App() {
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
    <div>
      <div>home</div>
    </div>
  );
}

export default App;
