import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Link from "next/link";
import { userInfo } from "../../utils/auth";
import { useRouter } from "next/router";
import AdminRoute from "../../protectroutes/AdminRoute";

const AdminDashboard = () => {
  const router = useRouter();

  const [load, setLoad] = useState(false);
  let window;
  const [value, setValue] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = value;
  //my code start
  useEffect(() => {
    const value = AdminRoute();
    const { name, email, role } = userInfo();
    if (role === undefined) {
      router.push("/");

      return;
    } else if (value === false || role === "user") {
      router.push("/");

      return;
    }
    setLoad(true);

    setValue({
      ...value,
      name: name,
      email: email,
      role: role,
    });
  }, []);

  if (window !== "undefined") {
    const UserLinks = () => {
      return (
        <div className="card">
          <h4 className="card-header">User Links</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link className="nav-link" href="/create/category">
                Create Category
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" href="/create/product">
                Create Product
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" href="/my/photo">
                My Photo
              </Link>
            </li>
          </ul>
        </div>
      );
    };

    const UserInfo = () => (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role}</li>
        </ul>
      </div>
    );

    return (
      <Layout title="Dashboard" className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <UserLinks />
          </div>
          <div className="col-sm-9">
            <UserInfo />
          </div>
        </div>
      </Layout>
    );
  } else if (window === "undefined") {
    return <></>;
  }
};

export default AdminDashboard;
