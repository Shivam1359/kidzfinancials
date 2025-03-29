import { useEffect, useRef, useState } from 'react';
import { FaChartLine, FaRegCalendarCheck, FaRegLightbulb, FaRegSmile } from 'react-icons/fa';
import '../../components/Stats/Stats.css';

const statsData = [
  {
    id: 1,
    value: 5000,
    suffix: '+',
    title: 'Happy Clients',
    description: 'Families who trust us with their financial future',
    icon: <FaRegSmile />
  },
  {
    id: 2,
    value: 10,
    suffix: 'M+',
    title: 'Assets Managed',
    description: 'Successfully managing client investments',
    icon: <FaChartLine />
  },
  {
    id: 3,
    value: 8,
    suffix: '+',
    title: 'Years Experience',
    description: 'Providing expert financial guidance',
    icon: <FaRegLightbulb />
  },
  {
    id: 4,
    value: 15000,
    suffix: '+',
    title: 'Consultations',
    description: 'Personalized financial planning sessions',
    icon: <FaRegCalendarCheck />
  }
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-container">
        <div className="stats-grid">
          {statsData.map((stat) => (
            <div className="stat-card" key={stat.id}>
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className={`stat-value ${isVisible ? 'animate' : ''}`} data-value={stat.value}>
                  {isVisible ? stat.value : '0'}
                  <span className="stat-suffix">{stat.suffix}</span>
                </h3>
                <h4 className="stat-title">{stat.title}</h4>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 