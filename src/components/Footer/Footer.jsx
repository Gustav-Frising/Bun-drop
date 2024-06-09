import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-top">
          <img src="/Bun_drop_logo.png" alt="" />
        </div>
        <div className="footer-content-center">
          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
              esse ratione et necessitatibus excepturi reiciendis sapiente alias
              fugiat odit repudiandae in quis, dolorum quidem nostrum!
            </p>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <Link to={"/"}>
                <li className="home">Home</li>
              </Link>

              <li>Menu</li>
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
            <img src="/x_img.png" alt="" />
            <img src="/instagram_img.png" alt="" />
            <img src="facebook_img.png" alt="" />
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
