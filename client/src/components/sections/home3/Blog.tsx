"use client";

import React from "react";
import { Link } from "@tanstack/react-router";

type Blog = {
  img: string;
  title: string;
  text: string;
};

const blogs: Blog[] = [
  {
    img: "blog-3-1.jpg",
    title: "What Is Nisab?",
    text: "Nisab is the minimum amount of wealth a Muslim must own before Zakah becomes obligatory. It is based on the value of gold or silver and ensures Zakah is only due on those who can afford it.",
  },
  {
    img: "blog-3-2.jpg",
    title: "When Does Zakah Become Obligatory?",
    text: "Zakah becomes obligatory when your wealth reaches the Nisab amount and remains in your possession for one full lunar year (Hawl). Only surplus wealth beyond basic needs is counted.",
  },
  {
    img: "blog-3-3.jpg",
    title: "How Is Zakah Calculated?",
    text: "Zakah is generally calculated as 2.5% of your eligible wealth such as cash, savings, gold, silver, and business assets. Different assets are calculated separately, then added together.",
  },
];

export const BlogThree: React.FC = () => {
  return (
    <section className="blog-three">
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Zakah Knowledge</span>
          </div>
          <h2 className="section-title__title title-animation">
            Understanding Nisab & Zakah Calculation
          </h2>
        </div>

        <div className="row">
          {blogs.map((blog, idx) => (
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
              <div className="blog-three__single">
                <div className="blog-three__img-box">
                  <div className="blog-three__img">
                    <img
                      src={`/assets/images/blog/${blog.img}`}
                      alt={blog.title}
                    />
                    <img
                      src={`/assets/images/blog/${blog.img}`}
                      alt={blog.title}
                    />
                    <Link to="/blog-details" className="blog-three__link">
                      <span className="sr-only"></span>
                    </Link>
                  </div>
                </div>

                <div className="blog-three__content">
                  <h3 className="blog-three__title">
                    <Link to="/blog-details">{blog.title}</Link>
                  </h3>
                  <p className="blog-three__text">{blog.text}</p>

                  <Link to="/blog-details" className="blog-three__read-more">
                    Learn More
                    <span className="icon-arrow-right-two"></span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogThree;
