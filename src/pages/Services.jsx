import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const services = [
  {
    number: '01',
    name: 'FULL-STACK WEB DEVELOPMENT',
    details: [
      'MERN Stack Applications (MongoDB, Express, React, Node.js)',
      'Responsive Front-End Development with Tailwind CSS',
      'Scalable REST & GraphQL API Design',
      'Database Architecture, Normalization & Optimization',
    ],
  },
  {
    number: '02',
    name: 'DESKTOP APPLICATION ENGINEERING',
    details: [
      'Cross-Platform Desktop Apps using Electron.js',
      'Offline-First Local Storage Solutions (SQLite)',
      'Custom File Persistence & Data Backup Pipelines',
      'Zero-External-Dependency Single-Contained Software',
    ],
  },
  {
    number: '03',
    name: 'CYBERSECURITY & MACHINE LEARNING',
    details: [
      'Web Application Firewall (WAF) Development',
      'Text Preprocessing & Payload Normalization',
      'TF-IDF Vectorization & Random Forest Classification',
      'Malicious Request & Threat Detection Models',
    ],
  },
  {
    number: '04',
    name: 'PLATFORM MAINTENANCE & TUNING',
    details: [
      'High-Concurrency News Portal & E-Commerce Maintenance',
      'Edge & Server-Level Caching (Varnish & Nginx FastCGI)',
      'MySQL Query Path Optimization & Index Tuning',
      'PHP-FPM Worker Tuning & Zero-Downtime Operations',
    ],
  },
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-16 max-w-[1800px] mx-auto"
    >
      <div className="mb-12 md:mb-20 border-b border-[rgba(255,255,255,0.1)] pb-8 md:pb-12">
        <div className="w-6 md:w-8 h-[1px] bg-[#ff2a2a] mb-3 md:mb-5"></div>
        <h3 className="text-[#ff2a2a] text-[10px] md:text-[12px] uppercase tracking-[3px] font-medium mb-2 md:mb-3">
          CAPABILITIES & EXPERTISE
        </h3>
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight uppercase"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          SERVICES
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {services.map((service) => (
          <div
            key={service.number}
            className="service-card border border-[rgba(255,255,255,0.1)] p-6 sm:p-8 md:p-12 relative overflow-hidden group transition-colors duration-500 hover:border-[#ff2a2a] bg-[#0d0d0d]"
          >
            <span className="text-[#ff2a2a] text-xs md:text-sm font-mono tracking-widest block mb-4 md:mb-6">
              {service.number}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 tracking-wider group-hover:text-[#ff2a2a] transition-colors duration-300">
              {service.name}
            </h2>
            <ul className="space-y-2.5 md:space-y-3">
              {service.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-[rgba(255,255,255,0.7)] text-xs md:text-sm font-light flex items-center space-x-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] flex-shrink-0"></span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;