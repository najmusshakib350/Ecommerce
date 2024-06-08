import React, { useState, useEffect } from "react";
import Link from "next/link";
import ShortandSimple from "../icons/ShortandSimpleLogo.jpg";
import { singout, isAuthenticated, userInfo } from "../../utils/auth";
import { useRouter } from "next/router";
import { IMAGEAPI } from "../../utils/config";
import { OneUser } from "./../../api/apiAuth";
import UserImage from "../icons/default.jpg";

const Header = () => {
  const [value, setValue] = useState(false);
  let [oneUser, setOneUser] = useState({
    photo: "",
    name: "",
  });

  useEffect(() => {
    let auth = isAuthenticated();
    setValue(auth);
    let { token } = userInfo();
    if (auth) {
      OneUser(token).then((res) => {
        setOneUser(res.data.data.doc);
      });
    }
  }, []);

  const router = useRouter();
  return (
    <nav className="nav-menu">
      <div className="SnS-logo">
        <Link href="/">
          <a>
            <img src={ShortandSimple.src} alt="Short and Simple Logo" />
          </a>
        </Link>
      </div>
      <ul style={{ display: "flex", alignItems: "center" }}>
        {value === false && (
          <>
            <li>
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}

        {value && (
          <>
            <li>
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </li>

            <li>
              <Link href={`/${userInfo().role}/dashboard`}>Dashboard</Link>
            </li>
            <li style={{ marginLeft: 0, marginRight: 0 }}>
              <span
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                className="menu_link nav-link"
              >
                <img
                  className="user_image"
                  src={`${UserImage.src}`}
                  alt={`${UserImage.src}`}
                />
                <span style={{ marginLeft: "0.3rem" }}>
                  {oneUser.name.split(" ")[0]}
                </span>
              </span>
            </li>

            <li style={{ marginLeft: 0, marginRight: 0 }}>
              <span
                style={{ cursor: "pointer" }}
                className="menu_link nav-link"
                onClick={() => {
                  singout(() => {
                    router.push("/login");
                  });
                }}
              >
                {" "}
                Log Out
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
