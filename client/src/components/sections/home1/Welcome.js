'use client'
import Link from "next/link"
import { useState } from "react"

export default function About() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
        
        <section className="welcome-one">
            <div className="container">
                <div className="welcome-one__inner">
                    <div className="row">
                        <div className="col-xl-7 col-lg-6">
                            <div className="welcome-one__content">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <span className="section-title__tagline">Welcome To Anity</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">
                                        Every Dollar Makes <br/>a Difference.
                                    </h2>
                                </div>
                                <div className="text">
                                    <p>
                                        In a world where many face challenges, your generosity can bring hope. At
                                        [Charity Name], we’re dedicated to [insert cause or mission], but we can’t do it
                                        alone. We need the support of kind-hearted individuals like you to continue our
                                        work.
                                    </p>
                                </div>

                                <ul className="list-item row clearfix">
                                    <li className="col-xl-6 col-lg-12 col-md-6">
                                        <div className="icon">
                                            <i className="icon-help"></i>
                                        </div>
                                        <div className="title">
                                            <h4>1200</h4>
                                            <h3>Volunteers</h3>
                                        </div>
                                    </li>
                                    <li className="col-xl-6 col-lg-12 col-md-6">
                                        <div className="icon">
                                            <i className="icon-support"></i>
                                        </div>
                                        <div className="title">
                                            <h4>2200</h4>
                                            <h3>Trusted Funds
                                            </h3>
                                        </div>
                                    </li>
                                </ul>

                                <div className="btn-box">
                                    <a href="donation-details.html" className="thm-btn">
                                        Become A Volunteer
                                        <span>
                                            <i className="icon-arrow-right"></i>
                                        </span>
                                    </a>
                                </div>

                            </div>
                        </div>

                        <div className="col-xl-5 col-lg-6">
                            <div className="donation-form-one">
                                <div className="inner-title">
                                    <h3>Easy Donation</h3>
                                </div>
                                <form id="donation-form-one" name="donation_form-one" className="default-form2" action="#"
                                    method="post">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_name" id="formName" placeholder="Name...."
                                                required=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="email" name="form_email" id="formEmail" placeholder="Email...."
                                                required=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="select-box clearfix">
                                            <select className="wide">
                                                <option data-display="Select Sauses">Select Sauses</option>
                                                <option value="Charity For Food">Charity For Food</option>
                                                <option value="Charity For Education">Charity For Education</option>
                                                <option value="Charity For Water">Charity For Water</option>
                                                <option value="Charity For Natural Disaster">Charity For Natural
                                                    Disaster</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label >Amount</label>
                                        <ul>
                                            <li>
                                                <input type="radio" id="dallor1" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$10</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="dallor2" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$20</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="dallor3" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$30</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="dallor4" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$40</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="dallor5" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$50</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="dallor6" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$100</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="dallor7" name="dallor"/>
                                                <label>
                                                    <i></i>
                                                    <span>$500</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_amount" id="formAmount"
                                                placeholder="Custom Amount...." required=""/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Payment Method</label>
                                        <ul>
                                            <li>
                                                <input type="radio" id="donation1" name="donation"/>
                                                <label>
                                                    <i></i>
                                                    <span>Test Donation</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="donation2" name="donation"/>
                                                <label>
                                                    <i></i>
                                                    <span>Offline Donation</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="donation3" name="donation"/>
                                                <label>
                                                    <i></i>
                                                    <span>Credit Card</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btn-box">
                                        <button type="submit" className="thm-btn">
                                            Donate Now
                                            <span><i className="icon-arrow-right"></i></span>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        </>
    )
}
