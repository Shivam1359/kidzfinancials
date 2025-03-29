import SEO from "../components/common/SEO";
import Title from "../components/common/Title";
import About from "../components/sections/About";
import Appointment from "../components/sections/Appointment";
import Blogs from "../components/sections/Blogs";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Testimonials from "../components/sections/Testimonials";
import Services from "../components/Services/Services";

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="KidzFinancials provides expert financial services including RRSP, RESP savings plans, and investment advice. Schedule a free consultation today."
      />
      
      <Hero />
      <div className="container">
        <Title subTitle="Our Service" title="What sWe Offer" />
        <Services />
        <About />
        <Testimonials />
        <Title subTitle="Blogs" title="Explore" />
        <Blogs />
        <Title title="Online Appointment" />
        <Appointment />
        <Title subTitle="Contact Us" title="Get in Touch" />
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
