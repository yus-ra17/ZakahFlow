"use client";

import React from "react";
import { Link } from "@tanstack/react-router";

export const Donate: React.FC = () => {
  const zakahInfo = [
    {
      title: "What Is Zakah?",
      img: "assets/images/donate/donate-3-1.jpg",
      text: "Zakah is one of the five pillars of Islam. It is a compulsory act of worship that purifies wealth by giving a fixed portion to those whom Allah has made eligible.",
    },
    {
      title: "Why Zakah Matters",
      img: "assets/images/donate/donate-3-2.jpg",
      text: "Zakah promotes social justice and compassion. It helps reduce poverty and reminds us that wealth is a trust from Allah, not something to hoard.",
    },
    {
      title: "Who Must Pay Zakah?",
      img: "assets/images/donate/donate-3-3.jpg",
      text: "Every Muslim who owns wealth above the Nisab threshold for one lunar year is required to pay Zakah, ensuring fairness and care within the Ummah.",
    },
  ];

  return (
    <>
      {/* Zakah Section Start */}
      <section className="donate-three">
        <div className="container">
          <div className="donate-three__top">
            <div className="section-title text-left sec-title-animation animation-style2">
              <div className="section-title__tagline-box">
                <span className="section-title__tagline">
                  Understanding Zakah
                </span>
              </div>
              <h2 className="section-title__title title-animation">
                A Pillar of Purification and Care
              </h2>
            </div>

            <div className="donate-three__btn-box">
              <Link
                to="/login"
                className="donate-three__btn thm-btn"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  padding: "16px 32px",
                }}
              >
                Calculate Zakah
                <span>
                  <i className="icon-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="row">
            {zakahInfo.map((item, idx) => (
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
                  className={`donate-three__single donate-three__single-${
                    idx + 1
                  }`}
                >
                  <div className="donate-three__img-box">
                    <div className="donate-three__img">
                      <img src={item.img} alt={item.title} />
                      <img src={item.img} alt={item.title} />
                    </div>
                  </div>

                  <div className="donate-three__content">
                    <h3 className="donate-three__title">{item.title}</h3>

                    <p className="donate-three__text">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Zakah Section End */}
    </>
  );
};

export default Donate;
