"use client";

import React from "react";
import { Link } from "@tanstack/react-router"; // TanStack Router Link
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const brands = [
  "brand-v1-img1.png",
  "brand-v1-img2.png",
  "brand-v1-img3.png",
  "brand-v1-img4.png",
  "brand-v1-img5.png",
  "brand-v1-img6.png",
];

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".srn",
    prevEl: ".srp",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 2 },
    991: { slidesPerView: 3 },
    1199: { slidesPerView: 5 },
    1350: { slidesPerView: 5 },
  },
};

export const Brand: React.FC = () => {
  return (
    <section className="brand-one">
      <div className="container">
        <Swiper
          {...swiperOptions}
          className="brand-one__carousel owl-carousel owl-theme"
        >
          {brands.map((brand, idx) => (
            <SwiperSlide key={idx}>
              <div className="brand-one__single">
                <div className="brand-one__single-inner">
                  <Link to="#">
                    <img
                      src={`/assets/images/brand/${brand}`}
                      alt={`Brand ${idx + 1}`}
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brand;
