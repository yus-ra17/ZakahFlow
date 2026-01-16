"use client";

import React from "react";
import { Link } from "@tanstack/react-router";

export const Cta: React.FC = () => {
  return (
    <>
      {/* CTA Two Start */}
      <section className="cta-two">
        <div className="container">
          <div className="cta-two__inner">
            <div
              className="cta-two__bg"
              style={{
                backgroundImage: `url(/assets/images/backgrounds/cta-two-bg.jpg)`,
              }}
            ></div>
            <h2 className="cta-two__title">
              Purify Your Soul
              <br />
              and Wealth
            </h2>
            <div className="cta-two__btn-box">
              <Link
                to="/login"
                className="cta-two__btn thm-btn"
                style={{
                  fontSize: "30px",
                  fontWeight: 1000,
                  letterSpacing: "0.6px",
                }}
              >
                Calculate Zakah
                <span>
                  <i className="icon-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Two End */}
    </>
  );
};

export default Cta;
