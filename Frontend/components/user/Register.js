import { useState, useEffect } from "react";
//import { Link, Navigate } from "react-router-dom";
// import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../Layout";
import { showError, showLoading } from "../../utils/messages";
import { register } from "../../api/apiAuth";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";

const Register = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: false,
    loading: false,
    disabled: false,
    success: false,
    redirect: false,
  });
  const [load, setLoad] = useState(false);
  let window;
  //my code start
  useEffect(() => {
    setLoad(true);
  }, []);
  if (window === "undefined") {
    //console.log("Hello i am undefined");
    return <></>;
  } else if (window !== "undefined") {
    const {
      name,
      email,
      password,
      passwordConfirm,
      success,
      error,
      redirect,
      loading,
      disabled,
    } = values;

    const handleChange = (e) => {
      setValues({
        ...values,
        error: false,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setValues({ ...values, error: false, loading: true, disabled: true });

      // {
      //   name:"Najmus Shakib",
      //   email:"najmusshakib1997@gmail.com",
      //   password:"12345678"
      //   passwordConfirm:"12345678"
      // }

      register({ name, email, password, passwordConfirm })
        .then((response) => {
          authenticate(response.data.token, () => {
            setValues({
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
              success: true,
              disabled: false,
              loading: false,
              redirect: true,
            });
          });
        })
        .catch((err) => {
          let errMsg = "Something went wrong!";
          if (err.response) {
            errMsg = err.response.data.message;
          } else {
            errMsg = "Something went wrong!";
          }
          setValues({
            ...values,
            error: errMsg,
            disabled: false,
            loading: false,
          });
        });
    };

    const signUpForm = () => (
      <form onSubmit={handleSubmit} style={{ display: "block" }}>
        <div className="form-group">
          <label className="text-muted">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Confirm Password:</label>
          <input
            type="password"
            name="passwordConfirm"
            className="form-control"
            value={passwordConfirm}
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Create Account
        </button>
      </form>
    );

    // const showSuccess = () => {
    //   if (success)
    //     return (
    //       <div className="alert alert-primary">
    //         New Account Created. Please <Link href="/login">Login</Link>.
    //       </div>
    //     );
    // };

    const redirectUser = () => {
      //const router = useRouter();

      if (redirect) {
        setTimeout(() => {
          return router.push(`/${userInfo().role}/dashboard`);
        }, 200);
      }
      setTimeout(() => {
        if (isAuthenticated()) {
          return router.push(`/${userInfo().role}/dashboard`);
        }
      }, 200);
    };

    return (
      <Layout title="Register" className="container col-md-8 offset-md-2">
        {redirectUser()}
        {/* {isAuthenticated() ? router.push("/") : ""} */}
        {/* {showSuccess()} */}
        {showLoading(loading)}
        {showError(error, error)}
        <h3>Register Here,</h3>
        <hr />
        {signUpForm()}
        <hr />
      </Layout>
    );
  }
};

export default Register;
