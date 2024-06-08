import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { showError, showSuccess, showLoading } from "../../utils/messages";
import Link from "next/link";
import { createCategory } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";
import AdminRoute from "../../protectroutes/AdminRoute";
import { useRouter } from "next/router";
const CreateCategory = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    catname: "",
    error: false,
    success: false,
    loading: false,
  });
  useEffect(() => {
    const { role } = userInfo();
    const value = AdminRoute();
    if (role === undefined) {
      router.push("/");

      return;
    } else if (value === false || role === "user") {
      router.push("/");
      return;
    }
  }, []);

  const { catname, error, success, loading } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      success: false,
    });

    const { token } = userInfo();
    createCategory(token, { catname: catname })
      .then((response) => {
        setValues({
          ...values,
          error: false,
          success: true,
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response)
          setValues({
            ...values,
            success: false,
            error: err.response.data.message,
            loading: false,
          });
        else
          setValues({
            ...values,
            success: false,
            error: "Something went wrong!",
            loading: false,
          });
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
    });
  };

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit} style={{ display: "block" }}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            name="catname"
            type="text"
            onChange={handleChange}
            value={catname}
            autoFocus
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Category
        </button>
      </form>
    );
  };

  const goBack = () => (
    <div className="mt-5">
      <Link href="/admin/dashboard" className="text-warning">
        Go to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Add a new category">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading(loading)}
          {showError(error, error)}
          {showSuccess(success, "Category Created!")}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
