'use client'
import Link from "next/link"
export default function Event() {
    return (
        <>

        {/**Event One Start */}
        <section className="event-one">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">Our Events</span>
                    </div>
                    <h2 className="section-title__title title-animation">Join Us in the Fight <br/>Against Poverty</h2>
                </div>
                <div className="row">
                    {/**Event One Single Start*/}
                    <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="100ms">
                        <div className="event-one__single">
                            <div className="event-one__img-box">
                                <div className="event-one__img">
                                    <img src="assets/images/event/event-1-1.jpg" alt=""/>
                                </div>
                                <div className="event-one__date">
                                    <p><span className="icon-clock"></span>20th Dec, 2024</p>
                                </div>
                            </div>
                            <div className="event-one__content">
                                <h4 className="event-one__title"><Link href="event-details">Donation Drive</Link></h4>
                                <p className="event-one__text">Lorem Ipsum is simply dummy a of the printing and type
                                    setting industry Loreaim Ipsum has</p>
                                <p className="event-one__location"><span className="icon-pin"></span>6391 Elgin St. Celina,
                                    10299</p>
                                <div className="event-one__btn-box">
                                    <Link href="donation-details" className="event-one__btn thm-btn">Donate Now<span><i
                                                className="icon-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**Event One Single End*/}
                    {/**Event One Single Start*/}
                    <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="200ms">
                        <div className="event-one__single">
                            <div className="event-one__img-box">
                                <div className="event-one__img">
                                    <img src="assets/images/event/event-1-2.jpg" alt=""/>
                                </div>
                                <div className="event-one__date">
                                    <p><span className="icon-clock"></span>15th nov, 2023</p>
                                </div>
                            </div>
                            <div className="event-one__content">
                                <h4 className="event-one__title"><Link href="event-details">win-win survival</Link></h4>
                                <p className="event-one__text">Lorem Ipsum is simply dummy a of the printing and type
                                    setting industry Loreaim Ipsum has</p>
                                <p className="event-one__location"><span className="icon-pin"></span>6391 Elgin St. Celina,
                                    10299</p>
                                <div className="event-one__btn-box">
                                    <Link href="donation-details" className="event-one__btn thm-btn">Donate Now<span><i
                                                className="icon-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**Event One Single End*/}
                    {/**Event One Single Start*/}
                    <div className="col-xl-4 col-lg-4 wow fadeInRight" data-wow-delay="100ms">
                        <div className="event-one__single">
                            <div className="event-one__img-box">
                                <div className="event-one__img">
                                    <img src="assets/images/event/event-1-3.jpg" alt=""/>
                                </div>
                                <div className="event-one__date">
                                    <p><span className="icon-clock"></span>19th Feb, 2024</p>
                                </div>
                            </div>
                            <div className="event-one__content">
                                <h4 className="event-one__title"><Link href="event-details">Children Education.</Link></h4>
                                <p className="event-one__text">Lorem Ipsum is simply dummy a of the printing and type
                                    setting industry Loreaim Ipsum has</p>
                                <p className="event-one__location"><span className="icon-pin"></span>6391 Elgin St. Celina,
                                    10299</p>
                                <div className="event-one__btn-box">
                                    <Link href="donation-details" className="event-one__btn thm-btn">Donate Now<span><i
                                                className="icon-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**Event One Single End*/}
                </div>
            </div>
        </section>
        {/**Event One End */}
    
            

        </>
    )
}
