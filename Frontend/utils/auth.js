import jwt_decode from "jwt-decode";

export const authenticate = (token, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(token));
    cb();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (window !== "undefined" && localStorage.getItem("jwt")) {
    const { exp } = jwt_decode(JSON.parse(localStorage.getItem("jwt")));
    if (new Date().getTime() <= exp * 1000) {
      return true;
    } else {
      localStorage.removeItem("jwt");
      return false;
    }
  } else return false;
};

export const userInfo = () => {
  if (typeof window !== "undefined") {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt === null) {
      return {};
    }
    const decoded = jwt_decode(jwt);
    return { ...decoded, token: jwt };
  } else {
    return {
      name: "",
      role: "",
      email: "",
    };
  }
};

export const singout = (cb) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    cb();
  }
};
