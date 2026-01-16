import { Link as RouterLink } from "@tanstack/react-router";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";

interface Header3Props {
  scroll: boolean;
  handlePopup: () => void;
  handleMobileMenu: () => void;
}

export default function Header3({
  scroll,
  handlePopup,
  handleMobileMenu,
}: Header3Props) {
  return (
    <>
      <header className="main-header-three">
        <nav className="main-menu main-menu-three">
          <div className="main-menu-three__wrapper">
            <div className="container">
              <div className="main-menu-three__wrapper-inner">
                <div className="main-menu-three__left">
                  <div className="main-menu-three__logo">
                    <RouterLink to="/">
                      <img src="/assets/images/resources/logo-1.png" alt="" />
                    </RouterLink>
                  </div>
                </div>

                <div className="main-menu-three__main-menu-box">
                  <a
                    href="#"
                    className="mobile-nav__toggler"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileMenu();
                    }}
                  >
                    <i className="fa fa-bars"></i>
                  </a>
                  <Menu />
                </div>

                <div className="main-menu-three__right">
                  <div className="main-menu-three__user-box">
                    <a href="#" className="main-menu-three__user icon-user" />
                  </div>

                  <div className="main-menu-three__search-box">
                    <a
                      href="#"
                      className="main-menu-three__search search-toggler icon-search"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePopup();
                      }}
                    />
                  </div>

                  <div className="main-menu-three__btn-box">
                    <RouterLink
                      to="/login"
                      className="main-menu-three__btn thm-btn"
                    >
                      Sign In
                      <span>
                        <i className="icon-arrow-right"></i>
                      </span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* STICKY HEADER */}
      <div
        className={`stricky-header stricked-menu main-menu main-menu-three ${
          scroll ? "stricky-fixed" : ""
        }`}
      >
        <div className="sticky-header__content">
          <nav className="main-menu main-menu-three">
            <div className="main-menu-three__wrapper">
              <div className="container">
                <div className="main-menu-three__wrapper-inner">
                  <div className="main-menu-three__left">
                    <div className="main-menu-three__logo">
                      <RouterLink to="/">
                        <img src="/assets/images/resources/logo-1.png" alt="" />
                      </RouterLink>
                    </div>
                  </div>

                  <div className="main-menu-three__main-menu-box">
                    <a
                      href="#"
                      className="mobile-nav__toggler"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileMenu();
                      }}
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                    <Menu />
                  </div>

                  <div className="main-menu-three__right">
                    <div className="main-menu-three__user-box">
                      <a href="#" className="main-menu-three__user icon-user" />
                    </div>

                    <div className="main-menu-three__search-box">
                      <a
                        href="#"
                        className="main-menu-three__search search-toggler icon-search"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePopup();
                        }}
                      />
                    </div>

                    <div className="main-menu-three__btn-box">
                      <RouterLink
                        to="/login"
                        className="main-menu-three__btn thm-btn"
                      >
                        Sign In
                        <span>
                          <i className="icon-arrow-right"></i>
                        </span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <MobileMenu handleMobileMenu={handleMobileMenu} />
    </>
  );
}
