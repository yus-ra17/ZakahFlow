
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
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

        {/* Main Slider Five */}
        <section className="main-slider-five">
            <div className="swiper-container banner-slider">
                <Swiper {...swiperOptions} className="swiper-wrapper">
                    <SwiperSlide>

                    {/* Slide Item Start*/}
                    <div className="swiper-slide">
                        <div className="image-layer"
                            style={{ backgroundImage: ' url(assets/images/slider/slider-v5-img-1.jpg)' }} >
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-content">
                                        <div className="main-slider-content__inner">
                                            <div className="big-title">
                                                <h2>Helping Hands, <br/>Changing <span>Lives</span></h2>
                                            </div>
                                            <div className="text">
                                                <p>
                                                    Empowering Communities, Changing Tomorrow Wildlife Conservation,
                                                    Human Compassion. Changing the world, one act of kindness at a time
                                                </p>
                                            </div>
                                            <div className="btn-box">
                                                <Link href="index5" className="thm-btn">
                                                    Donate Now
                                                    <span><i className="icon-arrow-right"></i></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Slide Item End*/}
                    </SwiperSlide>
                    <SwiperSlide>
                    {/* Slide Item Start*/}
                    <div className="swiper-slide">
                        <div className="image-layer"
                            style={{ backgroundImage: ' url(assets/images/slider/slider-v5-img-2.jpg)' }} >
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-content">
                                        <div className="main-slider-content__inner">
                                            <div className="big-title">
                                                <h2>Helping Hands, <br/>Changing <span>Lives</span></h2>
                                            </div>
                                            <div className="text">
                                                <p>
                                                    Empowering Communities, Changing Tomorrow Wildlife Conservation,
                                                    Human Compassion. Changing the world, one act of kindness at a time
                                                </p>
                                            </div>
                                            <div className="btn-box">
                                                <Link href="index5" className="thm-btn">
                                                    Donate Now
                                                    <span><i className="icon-arrow-right"></i></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Slide Item End*/}
                    </SwiperSlide>
                    <SwiperSlide>
                    {/* Slide Item Start*/}
                    <div className="swiper-slide">
                        <div className="image-layer"
                            style={{ backgroundImage: ' url(assets/images/slider/slider-v5-img-3.jpg)' }} >
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-content">
                                        <div className="main-slider-content__inner">
                                            <div className="big-title">
                                                <h2>Helping Hands, <br/>Changing <span>Lives</span></h2>
                                            </div>
                                            <div className="text">
                                                <p>
                                                    Empowering Communities, Changing Tomorrow Wildlife Conservation,
                                                    Human Compassion. Changing the world, one act of kindness at a time
                                                </p>
                                            </div>
                                            <div className="btn-box">
                                                <Link href="index5" className="thm-btn">
                                                    Donate Now
                                                    <span><i className="icon-arrow-right"></i></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Slide Item End*/}
                    </SwiperSlide>

                 </Swiper>

            </div>
        </section>
        {/* End Main Slider Five */}

        
        
            
        </>
    )
}
