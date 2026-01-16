"use client";
import { Link } from "@tanstack/react-router";

// Structured footer data for ZakahFlow
const footerData = {
  zakahServices: [
    { title: "Learn About Zakah", href: "/learn-zakah" },
    { title: "Zakah Calculator", href: "/calculator" },
    { title: "Eligible Recipients", href: "/recipients" },
    { title: "FAQ", href: "/faq" },
  ],
  quickLinks: [
    { title: "About ZakahFlow", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
  contact: {
    phone: "+251911123456",
    email: "support@zakahflow.com",
    social: [
      { icon: "icon-facebook", href: "https://facebook.com/zakahflow" },
      { icon: "icon-twitter", href: "https://twitter.com/zakahflow" },
      { icon: "icon-instagram", href: "https://instagram.com/zakahflow" },
      { icon: "icon-linkedin", href: "https://linkedin.com/company/zakahflow" },
    ],
  },
};

export default function FooterZakahFlow() {
  return (
    <footer className="site-footer-two">
      {/* Decorative Shape */}
      <div className="site-footer-two__shape float-bob-y-2">
        <img
          src="assets/images/shapes/site-footer-two-shape.png"
          alt="Footer Shape"
        />
      </div>

      <div className="site-footer-two__top">
        <div className="container">
          <div className="site-footer-two__top-inner">
            {/* Logo */}
            <div className="site-footer-two__top-logo">
              <Link to="/">
                <img
                  src="assets/images/resources/logo-1.png"
                  alt="ZakahFlow Logo"
                />
              </Link>
            </div>

            <div className="row">
              {/* About ZakahFlow */}
              <div
                className="col-xl-5 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div className="footer-widget-two__about">
                  <h2 className="footer-widget-two__about-title">
                    Simplify Your Zakah
                  </h2>
                  <p className="footer-widget-two__about-text">
                    ZakahFlow helps you calculate, understand, and distribute
                    your Zakah easily and correctly. Support those in need and
                    fulfill your Islamic duty.
                  </p>
                  <div className="footer-widget-two__btn-box">
                    <Link
                      to="/zakahcalculator"
                      className="footer-widget-two__btn thm-btn"
                    >
                      Calculate Zakah
                      <span>
                        <i className="icon-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Zakah Services */}
              <div
                className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div className="footer-widget-two__services">
                  <h4 className="footer-widget-two__title">Zakah Services</h4>
                  <ul className="footer-widget-two__services-list list-unstyled">
                    {footerData.zakahServices.map((service, index) => (
                      <li key={index}>
                        <Link to={service.href}>{service.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Links */}
              <div
                className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="footer-widget-two__links">
                  <h4 className="footer-widget-two__title">Quick Links</h4>
                  <ul className="footer-widget-two__services-list list-unstyled">
                    {footerData.quickLinks.map((link, index) => (
                      <li key={index}>
                        <Link to={link.href}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div
                className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="400ms"
              >
                <div className="footer-widget-two__contact">
                  <h3 className="footer-widget-two__title">Contact Info</h3>
                  <ul className="footer-widget-two__contact-list list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-call"></span>
                      </div>
                      <p>
                        <Link to={`tel:${footerData.contact.phone}`}>
                          {footerData.contact.phone}
                        </Link>
                      </p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-envelope"></span>
                      </div>
                      <p>
                        <Link to={`mailto:${footerData.contact.email}`}>
                          {footerData.contact.email}
                        </Link>
                      </p>
                    </li>
                  </ul>

                  {/* Social Icons */}
                  <div className="site-footer-two__social">
                    {footerData.contact.social.map((social, index) => (
                      <Link
                        to={social.href}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={social.icon}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="site-footer-two__bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="site-footer-two__bottom-inner">
                  <div className="site-footer-two__copyright">
                    <p>&copy; 2026 ZakahFlow. All Rights Reserved.</p>
                  </div>
                  <div className="site-footer-two__bottom-menu-box">
                    <ul className="list-unstyled site-footer-two__bottom-menu">
                      <li>
                        <Link to="/privacy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/terms">Terms of Service</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
