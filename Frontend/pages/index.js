import React from "react";
import Link from "next/link";
import ShortandSimpleLogo from "./../components/icons/ShortandSimpleLogo.jpg";

const Landing = () => {
  return (
    <div id="the-start">
      <section className="hero">
        <div className="innerContainer">
          <img
            className="landing-logo"
            src={ShortandSimpleLogo.src}
            alt="Short and Simple Logo"
          />
        </div>
        <div className="innerContainer">
          <h1 className="hero-title">
            The Best choice is you, so {`let\'s`} do this Naturally. Please do
            make a selection below to begin.
          </h1>
        </div>
        <nav className="navbar">
          <ul>
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
          </ul>
        </nav>
        <div className="innerContainer">
          <p>
            All natural products made to bring out the beauty of you, naturally.
            Our products help make your skin softer and more vibrant.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
