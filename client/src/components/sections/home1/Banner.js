'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },



}


export default function Banner() {
    return (
        <>
    

        <section className="main-slider">
            <Swiper {...swiperOptions} className="main-slider__carousel">
                <SwiperSlide>
                <div className="swiper-slide">
                        <div className="image-layer"
                            style={{ backgroundImage: ' url(assets/images/slider/slider-v1-img-1.jpg)' }}>
                        </div>
                        <div className="image-layer__left-gradient"
                            style={{ backgroundImage: ' url(assets/images/shapes/slider-bg1.jpg)' }}></div>
                        <div className="container">
                            <div className="main-slider-content">
                                <div className="main-slider-content__inner">
                                    <div className="sub-title">
                                        <h4>We help companies</h4>
                                    </div>
                                    <div className="big-title">
                                        <h2>
                                            Together, we can<br/> make the world<br/> better
                                        </h2>
                                    </div>
                                    <div className="btn-box">
                                        <a href="donation-details.html" className="thm-btn">
                                            Donate Now
                                            <span>
                                                <i className="icon-arrow-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-slide">
                        <div className="image-layer"
                            style={{ backgroundImage: ' url(assets/images/slider/slider-v1-img-2.jpg)' }}>
                        </div>
                        <div className="image-layer__left-gradient"
                            style={{ backgroundImage: ' url(assets/images/shapes/slider-bg1.jpg)' }}></div>
                        <div className="container">
                            <div className="main-slider-content">
                                <div className="main-slider-content__inner">
                                    <div className="sub-title">
                                        <h4>We help companies</h4>
                                    </div>
                                    <div className="big-title">
                                        <h2>
                                            Give a little<br/> change you <br/>a lot
                                        </h2>
                                    </div>
                                    <div className="btn-box">
                                        <a href="donation-details.html" className="thm-btn">
                                            Donate Now
                                            <span>
                                                <i className="icon-arrow-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-slide">
                        <div className="image-layer"
                            style={{ backgroundImage: ' url(assets/images/slider/slider-v1-img-3.jpg)' }}>
                        </div>
                        <div className="image-layer__left-gradient"
                            style={{ backgroundImage: ' url(assets/images/shapes/slider-bg1.jpg)' }}></div>
                        <div className="container">
                            <div className="main-slider-content">
                                <div className="main-slider-content__inner">
                                    <div className="sub-title">
                                        <h4>We help companies</h4>
                                    </div>
                                    <div className="big-title">
                                        <h2>
                                            Every gift counts<br/> your Every life<br/> matters
                                        </h2>
                                    </div>
                                    <div className="btn-box">
                                        <a href="donation-details.html" className="thm-btn">
                                            Donate Now
                                            <span>
                                                <i className="icon-arrow-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <ul className="banner-slider-nav-four">
                <li className="banner-slider-control-four banner-slider-button-prev h1p"
                    aria-label="Previous slide">
                    <span><i className="icon-arrow-right-two" aria-hidden="true"></i></span>
                </li>
                <li className="banner-slider-control-four banner-slider-button-next h1n" aria-label="Next slide">
                    <span><i className="icon-arrow-right-two" aria-hidden="true"></i></span>
                </li>
            </ul>
            </Swiper>
        </section>
        {/*Main Sllider Start */}
        
        </>
    )
}
