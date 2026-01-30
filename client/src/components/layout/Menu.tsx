import { Link as RouterLink } from "@tanstack/react-router";

export default function Menu() {
  //   const homeShowcaseItems = [
  //     {
  //       title: "Home Page 01",
  //       img: "/assets/images/home-showcase/home-showcase-1-1.jpg",
  //       to: "/",
  //     },
  //     {
  //       title: "Home Page 02",
  //       img: "/assets/images/home-showcase/home-showcase-1-2.jpg",
  //       to: "/index2",
  //     },
  //     {
  //       title: "Home Page 03",
  //       img: "/assets/images/home-showcase/home-showcase-1-3.jpg",
  //       to: "/index3",
  //     },
  //     {
  //       title: "Home Page 04",
  //       img: "/assets/images/home-showcase/home-showcase-1-5.jpg",
  //       to: "/index4",
  //     },
  //   ];

  return (
    <ul className="main-menu__list">
      <li className="">
        <RouterLink to="/">Home</RouterLink>
        <div className="mega-menu-content">
          <div className="container"></div>
        </div>
      </li>

      <li>
        <RouterLink to="/about">About</RouterLink>
      </li>

      <li>
        <RouterLink to="#">Pages</RouterLink>
        <ul className="shadow-box">
          <li className="dropdown">
            <RouterLink to="#">Volunteer</RouterLink>
            <ul>
              <li>
                <RouterLink to="/volunteer">Volunteer</RouterLink>
              </li>
              <li>
                <RouterLink to="/volunteer-carousel">
                  Volunteer Carousel
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/become-volunteer">Become Volunteer</RouterLink>
              </li>
              <li>
                <RouterLink to="/volunteer-details">
                  Volunteer Details
                </RouterLink>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <RouterLink to="#">Events</RouterLink>
            <ul>
              <li>
                <RouterLink to="/events">Events</RouterLink>
              </li>
              <li>
                <RouterLink to="/events-carousel">Events Carousel</RouterLink>
              </li>
              <li>
                <RouterLink to="/events-list">Events List</RouterLink>
              </li>
              <li>
                <RouterLink to="/event-details">Event Details</RouterLink>
              </li>
            </ul>
          </li>
          <li>
            <RouterLink to="/projects">Projects</RouterLink>
          </li>
          <li>
            <RouterLink to="/project-details">Project Details</RouterLink>
          </li>
          <li>
            <RouterLink to="/cause-details">Cause Details</RouterLink>
          </li>
          <li>
            <RouterLink to="/testimonials">Testimonials</RouterLink>
          </li>
          <li>
            <RouterLink to="/faq">FAQs</RouterLink>
          </li>
          <li>
            <RouterLink to="/404">404 Error</RouterLink>
          </li>
        </ul>
      </li>

      <li>
        <RouterLink to="#">Nisab</RouterLink>
        <ul className="shadow-box">
          <li>
            <RouterLink to="/donation">Donation</RouterLink>
          </li>
          <li>
            <RouterLink to="/donation-carousel">Donation Carousel</RouterLink>
          </li>
          <li>
            <RouterLink to="/donation-details">Donation Details</RouterLink>
          </li>
        </ul>
      </li>

      <li>
        <RouterLink to="#">Donation</RouterLink>
        <ul className="shadow-box">
          <li>
            <RouterLink to="/donate">Donate</RouterLink>
          </li>
          <li>
            <RouterLink to="/donation-details">Donation Details</RouterLink>
          </li>
          <li>
            <RouterLink to="/account">My Account</RouterLink>
          </li>
        </ul>
      </li>

      <li>
        <RouterLink to="#">Projects</RouterLink>
        <ul className="shadow-box">
          <li>
            <RouterLink to="/blog">Blog</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog-carousel">Blog Carousel</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog-list">Blog List</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog-details">Blog Details</RouterLink>
          </li>
        </ul>
      </li>

      <li>
        <RouterLink to="/contact">Contact</RouterLink>
      </li>
    </ul>
  );
}
