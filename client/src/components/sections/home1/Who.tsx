"use client";

import React from "react";
import { Link } from "@tanstack/react-router";

export default function WhatIsNisab() {
  return (
    <>
      {/* What Is Nisab Start */}
      <section className="who-we-are">
        <div className="who-we-are__shape-3 float-bob-y">
          <img src="assets/images/shapes/who-we-are-shape-3.png" alt="" />
        </div>
        <div className="who-we-are__shape-4 float-bob-x">
          <img src="assets/images/shapes/who-we-are-shape-4.png" alt="" />
        </div>

        <div className="container">
          <div className="row">
            {/* Left Content */}
            <div className="col-xl-6 wow fadeInLeft" data-wow-delay="300ms">
              <div className="who-we-are__left">
                <div className="section-title text-left sec-title-animation animation-style2">
                  <div className="section-title__tagline-box">
                    <span className="section-title__tagline">
                      Zakah Essentials
                    </span>
                  </div>
                  <h2 className="section-title__title title-animation">
                    What Is Nisab?
                  </h2>
                </div>

                <p className="who-we-are__text">
                  Nisab is the minimum amount of wealth a Muslim must have
                  before Zakah becomes obligatory. It ensures that only those
                  with sufficient wealth are required to pay.
                </p>

                <p className="who-we-are__text">
                  The Nisab is usually based on the current value of gold or
                  silver. If your total Zakatable assets reach or exceed this
                  amount and stay with you for a full lunar year, Zakah becomes
                  due.
                </p>

                <p className="who-we-are__text">
                  Once you reach Nisab, you give 2.5% of your eligible wealth,
                  including cash, savings, gold, business goods, and
                  investments, to help those in need.
                </p>

                <div className="who-we-are__progress-box">
                  <ul className="who-we-are__progress-list list-unstyled">
                    <li>
                      <div className="who-we-are__progress-single">
                        <p>
                          Nisab Standard:
                          <span> Gold or Silver Value</span>
                        </p>
                        <div className="who-we-are__progress">
                          <div className="bar">
                            <div
                              className="bar-inner count-bar"
                              data-percent="75%"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="who-we-are__progress-single">
                        <p>
                          Zakah Rate:
                          <span> 2.5% of Eligible Wealth</span>
                        </p>
                        <div className="who-we-are__progress">
                          <div className="bar">
                            <div
                              className="bar-inner count-bar"
                              data-percent="80%"
                              style={{ width: "80%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="who-we-are__btn-box">
                  <Link to="/login" className="who-we-are__btn thm-btn">
                    Check Your Nisab & Calculate Zakah
                    <span>
                      <i className="icon-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div
              className="col-xl-6 wow slideInRight"
              data-wow-delay="100ms"
              data-wow-duration="2500ms"
            >
              <div className="who-we-are__right">
                <div className="who-we-are__img-box">
                  <div className="who-we-are__img">
                    <img
                      src="assets/images/resources/who-we-are-img-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="who-we-are__img-2">
                    <img
                      src="assets/images/resources/who-we-are-img-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="who-we-are__shape-1 img-bounce"></div>
                  <div className="who-we-are__shape-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What Is Nisab End */}
    </>
  );
}
