import React, { useState } from "react";
// import "./footer.css";
import Link from "next/link";
import ShortandSimple from "../icons/ShortandSimpleLogo.jpg";
import InstagramIcon from "../icons/instagram.png";
import RightArrow from "../icons/arrow-right.png";
import TwitterIcon from "../icons/twitter.png";
import EmailIcon from "../icons/email.png";
import { emailCreate } from "../../api/emailCollect";

const Footer = () => {
  const [values, setValues] = useState({
    email: "",
    disabled: false,
  });
  const { email, disabled } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, disabled: true });

    emailCreate({ email })
      .then((response) => {
        console.log("Hello i am response for email sending");
        setValues({
          email: "",
        });
      })
      .catch((err) => {});
  };
  const year = new Date().getFullYear();
  // trying to get the onClick to call this number
  // let callUs = 4049139059;
  // let callNow = () => window.open('tel:callUs');
  return (
    <footer>
      <div className="row">
        <img
          src={ShortandSimple.src}
          alt="Short and Simple Logo"
          className="footer SnS-logo"
        />

        {/* <div className='row'> */}
        <div className="col">
          <h3>
            Mission Statement
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p>
            Our objective is to be your one stop shop for All tech products.
          </p>
        </div>
        <div className="col">
          <h3>
            Contact Information
            <div className="underline"></div>
            <span></span>
          </h3>
          <p>+880 1767693543</p>
          <p className="email">najmusshakib1997&@gmail.com</p>
        </div>
        <div className="col">
          <h3>
            <Link href="/sitemap">
              <a>Site Map</a>
            </Link>
          </h3>
        </div>
        <div className="col">
          <h3>
            <Link href="/news">
              <a>Newsletter</a>
            </Link>
            <div className="underline">
              <span></span>
            </div>
          </h3>
          {/* we add the div to make it a line underneath and the span  is 
                    to introduce the line for an animated look */}

          <form onSubmit={handleSubmit}>
            <img
              src={EmailIcon.src}
              alt="Email Icon"
              className="email-icons far"
            />
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <button type="submit">
              <img
                src={RightArrow.src}
                alt="Right arrow icon"
                className="email-icons"
              />
            </button>
          </form>
          {/* <div className='social-icons'>
                            <i className="foot-icon"><img src={InstagramIcon} alt='Instagram Icon'/></i>
                            <i className="foot-icon"><img src={TwitterIcon} alt="Twitter Icon" /></i> */}

          <div className="social-icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="foot-icon"
            >
              <img src={InstagramIcon.src} alt="Instagram Icon" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="foot-icon"
            >
              <img src={TwitterIcon.src} alt="Twitter Icon" />
            </a>
          </div>
        </div>

        <div className="copyRight">
          <hr />
          {year} © Najmus Shakib
        </div>
      </div>
    </footer>
  );
};

export default Footer;
