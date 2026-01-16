import Link from "next/link"


export default function Mission() {
    return (
        <>
        {/*Mission Two Start */}
        <section className="mission-two">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style2">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">Mission & Goals</span>
                    </div>
                    <h2 className="section-title__title title-animation">Our Mission</h2>
                </div>
                <div className="row">

                    {/* Single Mission Two Start */}
                    <div className="col-xl-4">
                        <div className="single-mission-two">
                            <div className="single-mission-two__icon">
                                <i className="icon-dolor"></i>
                            </div>
                            <div className="single-mission-two__content">
                                <div className="title">
                                    <h3><Link href="#">Make a Donation</Link></h3>
                                </div>
                                <div className="text">
                                    <p>
                                        I am inspired by your tireless efforts. As a dedicated supporter of [specific
                                        mission or cause, I firmly believe that we can make a difference together.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Single Mission Two Start */}

                    {/* Single Mission Two Start */}
                    <div className="col-xl-4">
                        <div className="single-mission-two">
                            <div className="single-mission-two__icon">
                                <i className="icon-love"></i>
                            </div>
                            <div className="single-mission-two__content">
                                <div className="title">
                                    <h3><Link href="#">Become A Volunteer</Link></h3>
                                </div>
                                <div className="text">
                                    <p>
                                        I am inspired by your tireless efforts. As a dedicated supporter of [specific
                                        mission or cause, I firmly believe that we can make a difference together.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Single Mission Two Start */}
                    {/* Single Mission Two Start */}
                    <div className="col-xl-4">
                        <div className="single-mission-two">
                            <div className="single-mission-two__icon">
                                <i className="icon-support"></i>
                            </div>
                            <div className="single-mission-two__content">
                                <div className="title">
                                    <h3><Link href="#">Shelter for Homeless</Link></h3>
                                </div>
                                <div className="text">
                                    <p>
                                        I am inspired by your tireless efforts. As a dedicated supporter of [specific
                                        mission or cause, I firmly believe that we can make a difference together.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Single Mission Two Start */}

                </div>
            </div>
        </section>
        {/*Mission Two End */}
        </>
    )
}
