import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const services = [
  {
    number: '01',
    name: 'FULL-STACK WEB DEVELOPMENT',
    details: [
      'MERN Stack Architecture',
      'Scalable REST & GraphQL APIs',
      'Tailwind CSS / Micro-Interactions',
      'Database Modeling & Normalization',
    ],
  },
  {
    number: '02',
    name: 'DESKTOP APPLICATION ENGINEERING',
    details: [
      'Electron.js Software Solutions',
      'Offline-First Local Storage (SQLite)',
      'Cross-Platform Distribution',
      'Optimized Process Lifecycle',
    ],
  },
  {
    number: '03',
    name: 'AI & MACHINE LEARNING INTEGRATION',
    details: [
      'Text Normalization Pipelines',
      'TF-IDF & Payload Vectorization',
      'Custom WAF & Cybersecurity Models',
      'Random Forest Classifiers',
    ],
  },
  {
    number: '04',
    name: 'PLATFORM MAINTENANCE & TUNING',
    details: [
      'High-Concurrency Caching (Varnish/Nginx)',
      'MySQL Query Path Optimization',
      'PHP-FPM Worker Process Tuning',
      'Zero-Downtime Migration & Uptime Management',
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
      className="min-h-screen bg-black text-white pt-32 pb-24 px-8 md:px-16 max-w-[1800px] mx-auto"
    >
      {/* Header */}
      <div className="mb-20 border-b border-[rgba(255,255,255,0.1)] pb-12">
        <div className="w-8 h-[1px] bg-[#ff2a2a] mb-5"></div>
        <h3 className="text-[#ff2a2a] text-[12px] uppercase tracking-[3px] font-medium mb-3">
          CAPABILITIES
        </h3>
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight uppercase"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          SERVICES & EXPERTISE
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {services.map((service) => (
          <div
            key={service.number}
            className="service-card border border-[rgba(255,255,255,0.1)] p-8 md:p-12 relative overflow-hidden group transition-colors duration-500 hover:border-[#ff2a2a]"
          >
            <span className="text-[#ff2a2a] text-sm font-mono tracking-widest block mb-6">
              {service.number}
            </span>
            <h2 className="text-xl md:text-2xl font-bold uppercase mb-8 tracking-wider group-hover:text-[#ff2a2a] transition-colors duration-300">
              {service.name}
            </h2>
            <ul className="space-y-3">
              {service.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-[rgba(255,255,255,0.6)] text-sm font-light flex items-center space-x-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a]"></span>
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