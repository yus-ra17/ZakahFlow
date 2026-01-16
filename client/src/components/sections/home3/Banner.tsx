"use client";

import React from "react";
import { Link } from "@tanstack/react-router"; // TanStack Link
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};

const slides = [
  {
    img: "main-slider-three-img-1.jpg",
    title: "They Need Your Help to Live",
    text: "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
  },
  {
    img: "main-slider-three-img-2.jpg",
    title: "They Need Your Help to Live",
    text: "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
  },
  {
    img: "main-slider-three-img-3.jpg",
    title: "They Need Your Help to Live",
    text: "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
  },
];

export const BannerThree: React.FC = () => {
  return (
    <section className="main-slider-three">
      <Swiper
        {...swiperOptions}
        className="main-slider-three__carousel owl-carousel owl-theme"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="item">
              <div className="main-slider-three__shape-1"></div>
              <div className="main-slider-three__shape-2">
                <img
                  src="/assets/images/shapes/main-slider-three-shape-2.png"
                  alt=""
                />
              </div>
              <div className="main-slider-three__img">
                <img
                  src={`/assets/images/resources/${slide.img}`}
                  alt={slide.title}
                />
              </div>
              <div className="container">
                <div className="main-slider-three__content">
                  <h2 className="main-slider-three__title">{slide.title}</h2>
                  <p className="main-slider-three__text">{slide.text}</p>
                  <div className="main-slider-three__btn-box">
                    <Link
                      to="/about"
                      className="thm-btn main-slider-three__btn"
                    >
                      Discover more
                      <span>
                        <i className="icon-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons (optional) */}
      <ul className="banner-slider-nav-four">
        <li
          className="banner-slider-control-four banner-slider-button-prev h1p"
          aria-label="Previous slide"
        >
          <span>
            <i className="icon-arrow-right-two" aria-hidden="true"></i>
          </span>
        </li>
        <li
          className="banner-slider-control-four banner-slider-button-next h1n"
          aria-label="Next slide"
        >
          <span>
            <i className="icon-arrow-right-two" aria-hidden="true"></i>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default BannerThree;
