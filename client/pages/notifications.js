import { Tabs } from "antd";
import React, { useEffect } from "react";
import Layout from "../components/Layout";

const notifications = () => {
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
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor">Mark all as seen</h1>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor">Delete all</h1>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default notifications;
