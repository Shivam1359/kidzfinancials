import { useNavigate } from "react-router-dom";
import "../../components/Services/Services.css";
import service_1 from "/src/assets/img1.jpeg";
import service_2 from "/src/assets/img2.jpg";

const serviceData = [
  { 
    img: service_1, 
    title: "RRSP & RESP SAVING PLAN", 
    caption: "We help you to save for your future", 
    path: "/services/rrsp-resp"
  },
  { 
    img: service_2, 
    title: "MORTGAGE", 
    caption: "We help you to get the best mortgage", 
    path: "/services/mortgage"
  },
  { 
    img: service_1, 
    title: "PERSONAL LOAN", 
    caption: "We help you to get the best personal loan", 
    path: "/services/personal-loan"
  },
  { 
    img: service_2, 
    title: "INSURANCE", 
    caption: "Protect your future with our insurance plans",
    path: "/services/insurance"
  },
  { 
    img: service_1, 
    title: "TAX PLANNING", 
    caption: "Expert tax planning services",
    path: "/services/tax-planning"
  },
  { 
    img: service_2, 
    title: "RETIREMENT PLANNING", 
    caption: "Plan your retirement with confidence",
    path: "/services/retirement"
  }
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (path) => {
    navigate(path);
  };

  const handleExploreMore = () => {
    navigate('/services');
  };

  return (
    <div className="services-container">
      <div className="services">
        {serviceData.map((service, index) => (
          <div 
            key={index} 
            className="service" 
            onClick={() => handleServiceClick(service.path)}
          >
            <div className="image-wrapper">
              <img src={service.img} alt={service.title} />
            </div>
            <div className="fixed-text">{service.title}</div>
            <div className="caption">
              <p>{service.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button 
          type="button" 
          className="btn service-btn"
          onClick={handleExploreMore}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Services;
