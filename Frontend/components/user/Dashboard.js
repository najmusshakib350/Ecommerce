import Layout from "../Layout";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { userInfo } from "../../utils/auth";
import PrivateRoute from "../../protectroutes/PrivateRoute";
import { useRouter } from "next/router";

const Dashboard = () => {
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
    const value = PrivateRoute();
    if (value === false) {
      router.push("/");
      return;
    }
    setLoad(true);
    const { name, email, role } = userInfo();
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
            {/* <li className="list-group-item">
              <Link className="nav-link" href="/success">
                My Product
              </Link>
            </li> */}
            <li className="list-group-item">
              <Link className="nav-link" href="/my/photo">
                My Photo
              </Link>
            </li>
          </ul>
        </div>
      );
    };

    const PurchaseHistory = () => (
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        {/* <ul className="list-group">
          <li className="list-group-item">History</li>
        </ul> */}
      </div>
    );

    const UserInfo = () => (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role}</li>{" "}
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

export default Dashboard;
