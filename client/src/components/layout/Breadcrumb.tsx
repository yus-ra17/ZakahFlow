"use client";

interface BreadcrumbProps {
  breadcrumbTitle: string;
}

export default function Breadcrumb({ breadcrumbTitle }: BreadcrumbProps) {
  return (
    <section className="page-header">
      {/* Shapes */}
      <div className="page-header__shape-1 float-bob-y">
        <img src="assets/images/shapes/page-header-shape-1.png" alt="Shape 1" />
      </div>
      <div className="page-header__shape-2 float-bob-x">
        <img src="assets/images/shapes/page-header-shape-2.png" alt="Shape 2" />
      </div>

      {/* Background */}
      <div
        className="page-header__bg"
        style={{
          backgroundImage: "url(assets/images/backgrounds/page-header-bg.jpg)",
        }}
      ></div>

      {/* Content */}
      <div className="container">
        <div className="page-header__inner">
          <h2>{breadcrumbTitle}</h2>
          <div className="thm-breadcrumb__box">
            <ul className="thm-breadcrumb list-unstyled">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span className="fas fa-angle-right"></span>
              </li>
              <li>{breadcrumbTitle}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
