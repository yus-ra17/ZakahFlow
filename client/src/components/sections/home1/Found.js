import Link from "next/link"
export default function Found() {
    return (
        <>
        {/*Found One Start */}
        <section className="found-one">
            <div className="found-one__bg">
                <div className="found-one__shape-1 float-bob-y">
                    <img src="assets/images/shapes/found-one-shape-1.png" alt=""/>
                </div>
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">Charity Fund</span>
                    </div>
                    <h2 className="section-title__title title-animation">Together We Can <br/> <span>Make</span> a Difference
                    </h2>
                </div>
                <div className="row">
                    {/*Found One Single Start*/}
                    <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="100ms">
                        <div className="found-one__single">
                            <div className="found-one__img-box">
                                <div className="found-one__img">
                                    <img src="assets/images/resources/found-1-1.jpg" alt=""/>
                                    <img src="assets/images/resources/found-1-1.jpg" alt=""/>
                                </div>
                            </div>
                            <div className="found-one__content">
                                <h4 className="found-one__title"><Link href="donation-details">Help For Ecosystem</Link></h4>
                                <p className="found-one__text">Charity and Donation is a categorys that involves giving
                                    financial </p>
                                <div className="found-one__goals">
                                    <div className="found-one__raised">
                                        <p>Raised</p>
                                        <span>40,802$</span>
                                    </div>
                                    <div className="found-one__raised">
                                        <p>Goal</p>
                                        <span>100,000$</span>
                                    </div>
                                </div>
                                <div className="found-one__progress">
                                    <div className="bar">
                                        <div className="bar-inner count-bar" data-percent="75%" style={{ width: '75%' }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="found-one__btn-box">
                                    <Link href="donation-details" className="found-one__btn thm-btn">Donate Now<span><i
                                                className="icon-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Found One Single End*/}
                    {/*Found One Single Start*/}
                    <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="200ms">
                        <div className="found-one__single">
                            <div className="found-one__img-box">
                                <div className="found-one__img">
                                    <img src="assets/images/resources/found-1-2.jpg" alt=""/>
                                    <img src="assets/images/resources/found-1-2.jpg" alt=""/>
                                </div>
                            </div>
                            <div className="found-one__content">
                                <h4 className="found-one__title"><Link href="donation-details">Water For All</Link></h4>
                                <p className="found-one__text">Charity and Donation is a categorys that involves giving
                                    financial </p>
                                <div className="found-one__goals">
                                    <div className="found-one__raised">
                                        <p>Raised</p>
                                        <span>40,802$</span>
                                    </div>
                                    <div className="found-one__raised">
                                        <p>Goal</p>
                                        <span>100,000$</span>
                                    </div>
                                </div>
                                <div className="found-one__progress">
                                    <div className="bar">
                                        <div className="bar-inner count-bar" data-percent="75%" style={{ width: '75%' }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="found-one__btn-box">
                                    <Link href="donation-details" className="found-one__btn thm-btn">Donate Now<span><i
                                                className="icon-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Found One Single End*/}
                    {/*Found One Single Start*/}
                    <div className="col-xl-4 col-lg-4 wow fadeInRight" data-wow-delay="300ms">
                        <div className="found-one__single">
                            <div className="found-one__img-box">
                                <div className="found-one__img">
                                    <img src="assets/images/resources/found-1-3.jpg" alt=""/>
                                    <img src="assets/images/resources/found-1-3.jpg" alt=""/>
                                </div>
                            </div>
                            <div className="found-one__content">
                                <h4 className="found-one__title"><Link href="donation-details">Vaccine Aid Camp</Link></h4>
                                <p className="found-one__text">Charity and Donation is a categorys that involves giving
                                    financial </p>
                                <div className="found-one__goals">
                                    <div className="found-one__raised">
                                        <p>Raised</p>
                                        <span>40,802$</span>
                                    </div>
                                    <div className="found-one__raised">
                                        <p>Goal</p>
                                        <span>100,000$</span>
                                    </div>
                                </div>
                                <div className="found-one__progress">
                                    <div className="bar">
                                        <div className="bar-inner count-bar" data-percent="75%" style={{ width: '75%' }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="found-one__btn-box">
                                    <Link href="donation-details" className="found-one__btn thm-btn">Donate Now<span><i
                                                className="icon-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Found One Single End*/}
                </div>
            </div>
        </section>
        {/*Found One End */}
       
        </>
     )
}