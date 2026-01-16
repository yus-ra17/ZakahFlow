'use client'
import Link from "next/link"

export default function Cta() {
    return (
        <>
        
        
        {/*Cta Three Start */}
        <section className="cta-three">
            <div className="container">
                <div className="cta-three__content">
                    <div className="left-box">
                        <div className="title">
                            <h2>Helping Hands, Changing Lives</h2>
                        </div>
                        <div className="text">
                            <p>Brightening Futures, One Step at a Time. Spreading Joy, Changing Lives</p>
                        </div>
                    </div>
                    <div className="right-box">
                        <div className="btn-box">
                            <Link href="index5" className="thm-btn">
                                Donate Now
                                <span><i className="icon-arrow-right"></i></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Cta Three End */}
        
      
        </>
    )
}
