import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Link from "next/link";
import { showError, showSuccess, showLoading } from "../../utils/messages";
import { getCategories, createProduct } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";
import { useRouter } from "next/router";
import AdminRoute from "../../protectroutes/AdminRoute";

const CreateProduct = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    loading: false,
    error: false,
    success: false,
    disabled: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    quantity,
    loading,
    error,
    success,
    formData,
    disabled,
  } = values;
  useEffect(() => {
    const value = AdminRoute();
    const { role } = userInfo();
    if (role === undefined) {
      router.push("/");
      return;
    } else if (value === false || role === "user") {
      router.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    const value = AdminRoute();
    const { role } = userInfo();
    if (role === undefined) {
      router.push("/");
      return;
    } else if (value === false || role === "user") {
      router.push("/");
      return;
    }
    getCategories()
      .then((response) => {
        setValues({
          ...values,
          categories: response.data.categories,
          formData: new FormData(),
        });
      })
      .catch((error) => {
        setValues({
          ...values,
          error: "Failed to load categories!",
          formData: new FormData(),
        });
      });
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({
      ...values,
      [e.target.name]: value,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      disabled: true,
      success: false,
    });
    const { token } = userInfo();
    createProduct(token, formData)
      .then((response) => {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          loading: false,
          disabled: false,
          success: true,
          error: false,
        });
      })
      .catch((error) => {
        let errMsg = "Something went wrong!";
        if (error.response) {
          console.log("Hello i am response");
          console.log(error.response);
          errMsg = error.response.data.message;
        }
        setValues({
          ...values,
          error: errMsg,
          loading: false,
          success: false,
          disabled: false,
        });
      });
  };

  const productForm = () => (
    <form className="mb-3" onSubmit={handleSubmit} style={{ display: "block" }}>
      <h4>Photo:</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          className="form-control"
          value={description}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price:</label>
        <input
          name="price"
          onChange={handleChange}
          className="form-control"
          type="number"
          value={price}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity:</label>
        <input
          name="quantity"
          onChange={handleChange}
          className="form-control"
          type="number"
          value={quantity}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category:</label>
        <select
          name="category"
          value={category}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">----Select Category----</option>
          {categories &&
            categories.map((item) => (
              <option value={item._id} key={item._id}>
                {item.catname}
              </option>
            ))}
        </select>
      </div>
      <button
        className="btn btn-outline-primary"
        type="submit"
        disabled={disabled}
      >
        Create Product
      </button>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link href="/admin/dashboard" className="text-warning">
        Go to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Add a new product">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError(error, error)}
          {showLoading(loading)}
          {showSuccess(success, "Product Added Successfully!")}
          {productForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
