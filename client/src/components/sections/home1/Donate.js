import Link from "next/link"
export default function Donate() {
    return (
        <>
       
       {/*Donate One Start */}
       <section className="donate-one pdt">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                        <div className="donate-one__single">
                            <div className="donate-one__single-bg"
                                style={{ backgroundImage: ' url(assets/images/backgrounds/donate-one-single-bg.jpg)' }} >
                            </div>
                            <h3 className="donate-one__title"><Link href="donation-details">Help Them With Donation</Link>
                            </h3>
                            <p className="donate-one__text">Dicta sunt explicabo. Nemo enim ipsam voluptatem<br/> quia
                                voluptas
                                sit aspernaturaut odit aut fugit, sed<br/> quia consequuntur. Dicta sunt explicabo. Nemo
                            </p>
                            <div className="donate-one__btn-box">
                                <Link href="donation-details" className="donate-one__btn thm-btn">Donate Now<span><i
                                            className="icon-arrow-right"></i></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                        <div className="donate-one__single donate-one__single-2">
                            <div className="donate-one__single-bg"
                                style={{ backgroundImage: ' url(assets/images/backgrounds/donate-one-single-bg-two.jpg)' }} >
                            </div>
                            <h3 className="donate-one__title"><Link href="become-volunteer">Join With Us To Serve As
                                    Volenteer</Link></h3>
                            <p className="donate-one__text">Dicta sunt explicabo. Nemo enim ipsam voluptatem<br/> quia
                                voluptas
                                sit aspernaturaut odit aut fugit, sed<br/> quia consequuntur. Dicta sunt explicabo. Nemo
                            </p>
                            <div className="donate-one__btn-box">
                                <Link href="become-volunteer" className="donate-one__btn thm-btn">Join Now<span><i
                                            className="icon-arrow-right"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Donate One End */}
           
        </>
    )
}
