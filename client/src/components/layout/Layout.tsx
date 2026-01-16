"use client";

import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import DataBg from "../elements/DataBg";
import Breadcrumb from "./Breadcrumb";
import SearchPopup from "./SearchPopup";
import Sidebar from "./Sidebar";

import Header3 from "./header/Header3";

// Footers

import Footer3 from "./footer/Footer3";

interface LayoutProps {
  headerStyle?: number;
  footerStyle?: number;
  headTitle?: string;
  breadcrumbTitle?: string;
  children: React.ReactNode;
  wrapperCls?: string;
}

export default function Layout({
  headerStyle,
  footerStyle,
  breadcrumbTitle,
  children,
  wrapperCls,
}: LayoutProps) {
  const [scroll, setScroll] = useState(false);

  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    document.body.classList.toggle("mobile-menu-visible", !isMobileMenu);
  };

  // Search Popup
  const [isPopup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!isPopup);

  // Sidebar
  const [isSidebar, setSidebar] = useState(false);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    // Initialize WOW.js for animations
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({ live: false });
    window.wow.init();

    // Scroll listener for sticky headers or BackToTop
    const onScroll = () => setScroll(window.scrollY > 100);
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  // Select header based on headerStyle
  const renderHeader = () => {
    switch (headerStyle) {
      case 1:
        return (
          <Header1
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        );
      case 2:
        return (
          <Header2
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        );
      case 3:
        return (
          <Header3
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        );
      case 4:
        return (
          <Header4
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        );
      case 5:
        return (
          <Header5
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        );
      default:
        return (
          <Header1
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        );
    }
  };

  // Select footer based on footerStyle
  const renderFooter = () => {
    switch (footerStyle) {
      case 1:
        return <Footer1 />;
      case 2:
        return <Footer2 />;
      case 3:
        return <Footer3 />;
      default:
        return <Footer1 />;
    }
  };

  return (
    <>
      <DataBg />
      <div className={`page-wrapper ${wrapperCls || ""}`} id="top">
        {renderHeader()}

        <Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
        <SearchPopup isPopup={isPopup} handlePopup={handlePopup} />

        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

        {children}

        {renderFooter()}
      </div>

      <BackToTop scroll={scroll} />
    </>
  );
}
