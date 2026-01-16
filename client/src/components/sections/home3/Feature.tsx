"use client";

import React from "react";
import { Link } from "@tanstack/react-router"; // TanStack Router Link

export const Services: React.FC = () => {
  const services = [
    {
      title: "Zakah Calculator",
      icon: "icon-love",
      description: "Calculate your Zakah amount easily with our tool",
      link: "/donation-details",
    },
    {
      title: "Donate Zakah",
      icon: "icon-dolor",
      description: "Donate your Zakah to those in need",
      link: "/donation-details",
    },
    {
      title: "Learn About Zakah",
      icon: "icon-hand",
      description: "Understand the importance and rules of Zakah",
      link: "/donation-details",
    },
  ];

  return (
    <>
      {/* Feature One Start */}
      <section className="feature-two">
        <div className="container">
          <div className="row">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`col-xl-4 col-lg-4 wow ${
                  idx === 0
                    ? "fadeInLeft"
                    : idx === 1
                    ? "fadeInUp"
                    : "fadeInRight"
                }`}
                data-wow-delay={`${(idx + 1) * 100}ms`}
              >
                <div
                  className={`feature-two__single feature-two__single-${
                    idx + 1
                  }`}
                >
                  <div className="feature-two__icon">
                    <span className={service.icon}></span>
                  </div>
                  <div className="feature-two__content">
                    <h3 className="feature-two__title">
                      <Link to="/donation">{service.title}</Link>
                    </h3>
                    <p className="feature-two__text">{service.description}</p>
                    <Link to={service.link} className="feature-two__read-more">
                      rEAD mORe
                      <span className="icon-arrow-right-two"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Feature One End */}
    </>
  );
};

export default Services;
