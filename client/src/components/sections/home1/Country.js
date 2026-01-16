'use client'
import Link from "next/link"
export default function Country() {
    return (
        <>

        {/*Country One Start */}
        <section className="country-one">
            <div className="container">
                <div className="country-one__top-title-box sec-title-animation animation-style1">
                    <h1 className="country-one__top-title title-animation">Top Distributors <span>Around </span>World</h1>
                </div>
                <div className="row">
                    {/*Country One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                        <div className="country-one__single">
                            <div className="country-one__img">
                                <img src="assets/images/country/country-1-1.jpg" alt=""/>
                            </div>
                            <h4 className="country-one__title"><Link href="#">South Africa</Link></h4>
                        </div>
                    </div>
                    {/*Country One Single End*/}
                    {/*Country One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                        <div className="country-one__single">
                            <div className="country-one__img">
                                <img src="assets/images/country/country-1-2.jpg" alt=""/>
                            </div>
                            <h4 className="country-one__title"><Link href="#">Germany</Link></h4>
                        </div>
                    </div>
                    {/*Country One Single End*/}
                    {/*Country One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                        <div className="country-one__single">
                            <div className="country-one__img">
                                <img src="assets/images/country/country-1-3.jpg" alt=""/>
                            </div>
                            <h4 className="country-one__title"><Link href="#">South Korea</Link></h4>
                        </div>
                    </div>
                    {/*Country One Single End*/}
                    {/*Country One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                        <div className="country-one__single">
                            <div className="country-one__img">
                                <img src="assets/images/country/country-1-4.jpg" alt=""/>
                            </div>
                            <h4 className="country-one__title"><Link href="#">Japan</Link></h4>
                        </div>
                    </div>
                    {/*Country One Single End*/}
                    <div className="col-xl-3"></div>
                    {/*Country One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="500ms">
                        <div className="country-one__single">
                            <div className="country-one__img">
                                <img src="assets/images/country/country-1-5.jpg" alt=""/>
                            </div>
                            <h4 className="country-one__title"><Link href="#">Turkey</Link></h4>
                        </div>
                    </div>
                    {/*Country One Single End*/}
                    {/*Country One Single Start*/}
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="600ms">
                        <div className="country-one__single">
                            <div className="country-one__img">
                                <img src="assets/images/country/country-1-6.jpg" alt=""/>
                            </div>
                            <h4 className="country-one__title"><Link href="#">Indonesia</Link></h4>
                        </div>
                    </div>
                    {/*Country One Single End*/}
                    <div className="col-xl-3"></div>
                </div>
            </div>
        </section>
        {/*Country One End */}
            
        </>
    )
}
