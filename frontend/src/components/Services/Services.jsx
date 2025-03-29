// import React from "react";
// import "./Services.css";
// import service_1 from "/src/assets/img1.jpeg";
// import service_2 from "/src/assets/img2.jpg";

// const serviceData = [
//   { img: service_1, title: "RRSP & RESP SAVING PLAN", caption: "We help you to save for your futurew  edufbwejdfb  ahsbuyvqfji" },
//   { img: service_2, title: "MORTGAGE", caption: "We help you to get the best mortgage" },
//   { img: service_1, title: "PERSONAL LOAN", caption: "We help you to get the best personal loan" },
//   { img: service_2, title: "Service 2" },
//   { img: service_1, title: "Service 3" },
//   { img: service_2, title: "Service 4" },
//   { img: service_1, title: "Service 5" },
//   { img: service_2, title: "Service 6" },
//   { img: service_1, title: "Service 7" },
//   { img: service_2, title: "Service 8" }
// ];

// const Services = () => {
//   return (
//     <div className="services-container">
//       <div className="services">
//         {serviceData.map((service, index) => (
//           <div key={index} className="service">
//             <div className="image-wrapper">
//               <img src={service.img} alt="" />
//             </div>
//             <div className="fixed-text">{service.title}</div>
//             <div className="caption">
//               <p>{service.caption}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="button-container">
//         <button type="submit" className="btn service-btn">Explore More</button>
//       </div>
//     </div>
//   );
// };

// export default Services;


import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Services.css"; // Removed CSS import
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

  // Define reusable container and padding classes
  const sectionPadding = "py-12 md:py-16";
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8";

  return (
    // Applied section padding and background
    <div className={`bg-neutral-50 ${sectionPadding}`}> 
      <div className={containerClass}>
        {/* Applied grid layout for services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> 
          {serviceData.map((service, index) => (
            <div 
              key={index} 
              // Applied card styling with Tailwind
              className="group bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
              onClick={() => handleServiceClick(service.path)}
              role="link" // Added role for accessibility
              tabIndex={0} // Added for keyboard navigation
              onKeyPress={(e) => e.key === 'Enter' && handleServiceClick(service.path)} // Added keyboard activation
            >
              <div className="relative h-48"> 
                <img 
                    src={service.img} 
                    alt={`${service.title} service`} // Improved alt text
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy" // Added lazy loading
                />
                 {/* Optional: Add an overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Applied text styling and padding */}
              <div className="p-5"> 
                <h3 className="text-lg font-semibold text-primary-800 mb-2 truncate group-hover:text-primary-600 transition-colors"> 
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2"> 
                  {service.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered button container with top margin */}
        <div className="mt-12 text-center"> 
          <button 
            type="button" 
            // Applied primary button style
            className="btn-primary inline-flex items-center" 
            onClick={handleExploreMore}
            aria-label="Explore all our services" // Added aria-label
          >
            Explore More Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;