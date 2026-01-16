'use client'
import Link from "next/link"

export default function Ctatwo() {
    return (
        <>
        
        
        {/*CTA One Start */}
        <section className="cta-one">
            <div className="cta-one__bg" style={{ backgroundImage: ' url(assets/images/backgrounds/cta-one-bg.jpg)' }} ></div>
            <div className="container">
                <div className="cta-one__inner">
                    <div className="cta-one__title-box sec-title-animation animation-style1">
                        <h2 className="cta-one__title title-animation">Creating Lasting Change in <br/>Communities Worldwide
                        </h2>
                    </div>
                    <div className="cta-one__btn-box">
                        <Link href="donation-details" className="cta-one__btn-1 thm-btn">Donate Now<span><i
                                    className="icon-arrow-right"></i></span></Link>
                        <Link href="become-volunteer" className="cta-one__btn-2 thm-btn">Become A volunteer<span><i
                                    className="icon-arrow-right"></i></span></Link>
                    </div>
                </div>
            </div>
        </section>
        {/*CTA One End */}
        
      
        </>
    )
}
