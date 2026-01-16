import { useState } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

interface MobileMenuProps {
  isSidebar?: boolean;
  handleMobileMenu: () => void;
  handleSidebar?: () => void;
}

export default function MobileMenu({ handleMobileMenu }: MobileMenuProps) {
  const [isActive, setIsActive] = useState({
    key: 0,
    subKey: 0,
  });

  const toggle = (key: number, subKey = 0) => {
    setIsActive({
      key: isActive.key === key ? 0 : key,
      subKey: isActive.subKey === subKey ? 0 : subKey,
    });
  };

  return (
    <div className="mobile-nav__wrapper">
      <div className="mobile-nav__overlay" onClick={handleMobileMenu} />
      <div className="mobile-nav__content">
        <span className="mobile-nav__close" onClick={handleMobileMenu}>
          ✕
        </span>

        <div className="logo-box">
          <RouterLink to="/">
            <img src="/assets/images/resources/logo-2.png" width="150" />
          </RouterLink>
        </div>

        <ul className="main-menu__list">
          <li className={isActive.key === 1 ? "dropdown current" : "dropdown"}>
            <RouterLink to="/">Home</RouterLink>
            <ul style={{ display: isActive.key === 1 ? "block" : "none" }}>
              <li>
                <RouterLink to="/">Home One</RouterLink>
              </li>
              <li>
                <RouterLink to="/index2">Home Two</RouterLink>
              </li>
              <li>
                <RouterLink to="/index3">Home Three</RouterLink>
              </li>
              <li>
                <RouterLink to="/index4">Home Four</RouterLink>
              </li>
            </ul>
            <button onClick={() => toggle(1)}>
              <span className="fa fa-angle-right" />
            </button>
          </li>

          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>

          <li className={isActive.key === 2 ? "dropdown current" : "dropdown"}>
            <RouterLink to="#">Pages</RouterLink>
            <ul style={{ display: isActive.key === 2 ? "block" : "none" }}>
              <li>
                <RouterLink to="/projects">Projects</RouterLink>
              </li>
              <li>
                <RouterLink to="/events">Events</RouterLink>
              </li>
              <li>
                <RouterLink to="/faq">FAQs</RouterLink>
              </li>
            </ul>
            <button onClick={() => toggle(2)}>
              <span className="fa fa-angle-right" />
            </button>
          </li>

          <li>
            <RouterLink to="/donation">Donation</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog">Blog</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
