import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-top">
          <img src="/Bun_drop_logo.png" alt="" />
        </div>
        <div className="footer-content-center">
          <div>
            <p>
              Welcome to Bun Drop, where we’re revolutionizing the way you enjoy
              your favorite burgers! Founded on the belief that great food
              should be fast, fresh, and fun, Bun Drop combines cutting-edge
              drone technology with culinary excellence to bring you a unique
              dining experience.
            </p>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <Link to={"/"}>
                <li className="home">Home</li>
              </Link>

              <a href="#category-menu">Menu</a>
            </ul>
          </div>
          <div>
            <h2>Get in touch</h2>
            <ul>
              <li>+46892345287</li>
              <li>contact@bundrop.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-content-bottom">
          <div className="footer-icons">
            <a href="https://twitter.com">
              <img src="/x_img.png" alt="" />
            </a>
            <a href="https://www.instagram.com">
              {" "}
              <img src="/instagram_img.png" alt="" />
            </a>
            <a href="https://www.facebook.com">
              <img src="facebook_img.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <p className="footer-copyright">
          copyright 2024 Bundrop.com - All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
