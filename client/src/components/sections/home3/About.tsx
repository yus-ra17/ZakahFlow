import React from "react";
import { Link } from "@tanstack/react-router";

export default function AboutThree() {
  return (
    <section className="about-three">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-6 wow slideInLeft"
            data-wow-delay="100ms"
            data-wow-duration="2500ms"
          >
            <div className="about-three__left">
              <div className="about-three__img-box">
                <div className="about-three__img">
                  <img
                    src="/assets/images/resources/about-three-img-1.png"
                    alt="About Three"
                  />
                </div>
                <div className="about-three__shape-3">
                  {/* <div className="about-three__shape-4">
                    <img
                      src="/assets/images/shapes/about-three-shape-4.png"
                      alt=""
                    />
                  </div> */}
                </div>
                <div className="about-three__shape-1">
                  <img
                    src="/assets/images/shapes/about-three-shape-1.png"
                    alt=""
                  />
                </div>
                <div className="about-three__shape-2">
                  <img
                    src="/assets/images/shapes/about-three-shape-2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="about-three__right">
              <div className="section-title text-left sec-title-animation animation-style2">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">About Us</span>
                </div>
                <h2 className="section-title__title title-animation">
                  Together We Can Make
                  <br /> a Difference
                </h2>
              </div>

              <p className="about-three__text">
                We are dedicated to empowering communities through the
                principles of Zakah. Our mission is to facilitate the
                calculation and distribution of Zakah, ensuring that those in
                need receive the support they deserve. Join us in our journey to
                create a more equitable and compassionate world.
              </p>

              <ul className="about-three__points list-unstyled">
                <li>
                  <div className="icon">
                    <span className="icon-check" />
                  </div>
                  <p>Purifying Hearts, Healing Communities</p>
                </li>
                <li>
                  <div className="icon">
                    <span className="icon-check" />
                  </div>
                  <p>Zakah Calcuations</p>
                </li>
                <li>
                  <div className="icon">
                    <span className="icon-check" />
                  </div>
                  <p>Small Acts, Big Impact</p>
                </li>
              </ul>

              <div className="about-three__btn-and-need-help">
                <div className="about-three__btn-box">
                  <Link to="/about" className="about-three__btn thm-btn">
                    READ MORE
                    <span>
                      <i className="icon-arrow-right"></i>
                    </span>
                  </Link>
                </div>

                <div className="about-three__need-help">
                  <div className="about-three__need-help-icon">
                    <span className="icon-phone-call"></span>
                  </div>
                  <div className="content">
                    <span>Need help?</span>
                    <p>
                      <a href="tel:+251949347320">(+251) 949-347-320</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
