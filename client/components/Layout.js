import React, { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useSelector((state) => state.user);
  //console.log(user);
  const router = useRouter();
  const location = router;
  const userMenu = [
    {
      name: "Home",
      path: "/",
      query: "",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointment",
      query: "",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/applydoctor",
      query: "",
      icon: "ri-hospital-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      query: "",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/user-list",
      query: "",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/doctor-list",
      query: "",
      icon: "ri-hospital-line",
    },
    {
      name: "profile",
      path: "/profile",
      query: "",
      icon: "ri-file-user-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      query: "",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      query: "",
      icon: "ri-file-list-line",
    },
    {
      name: "profile",
      path: `/doctor-profile/`,
      query: user && `${user._id}`,
      icon: "ri-file-user-line",
    },
  ];

  const menuToBeRendered =
    user && user.isAdmin
      ? adminMenu
      : user && user.isDoctor
      ? doctorMenu
      : userMenu;
  //const menuToBeRendered = adminMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1 className={`${collapsed ? "collapsed-logo" : "logo"}`}>
              Doctor Booking
            </h1>
            <h2 className={`${collapsed ? "collapsed-role" : "role"}`}>
              Account : {role}
            </h2>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && `active-menu-item`
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && (
                    <Link
                      href={{
                        pathname: menu.path,
                        query: { path: menu.query },
                      }}
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("persist:auth");
                router.push("/login");
              }}
            >
              <i className="ri-logout-box-line"></i>
              {!collapsed && (
                <Link href="/login">
                  <a>Logout</a>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-circle-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => router.push("/notifications")}
              >
                <i className="ri-notification-2-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor" href="/profile">
                <a className="align">{user?.name}</a>
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
