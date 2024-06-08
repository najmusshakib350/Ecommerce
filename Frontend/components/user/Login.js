import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../Layout";
import { showError, showLoading } from "../../utils/messages";
import { login } from "../../api/apiAuth";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";

const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
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
    const { email, password, loading, error, redirect, disabled } = values;

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

      login({ email, password })
        .then((response) => {
          authenticate(response.data.token, () => {
            setValues({
              email: "",
              password: "",
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

    const signInForm = () => (
      <form onSubmit={handleSubmit} style={{ display: "block" }}>
        <div className="form-group">
          <label className="text-muted">Email:</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password:</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="form-control"
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={disabled}
        >
          Login
        </button>
      </form>
    );

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
      <Layout title="Login" className="container col-md-8 offset-md-2">
        {redirectUser()}
        {showLoading(loading)}
        {showError(error, error)}
        <h3>Login Here,</h3>
        <hr />
        {signInForm()}
        <hr />
      </Layout>
    );
  }

  //my code end
};

export default Login;
