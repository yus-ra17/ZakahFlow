import Cta from "../components/sections/home3/Cta";
import Donate from "../components/sections/home3/Donate";
import About from "../components/sections/home3/About";
import Services from "../components/sections/home3/Feature";
import Header from "../components/layout/header/Header3";
import Who from "../components/sections/home1/Who";
import Footer3 from "../components/layout/footer/Footer3";

export function HomePage() {
  return (
    <>
      <Header />
      <Cta />
      <About />
      <Services />
      <Donate />
      <Who />
      <Footer3 />
    </>
  );
}
