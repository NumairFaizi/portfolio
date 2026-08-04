import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
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
          BACKGROUND
        </h3>
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight uppercase"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          ABOUT NUMAIR FAIZI
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        <div className="lg:col-span-7 space-y-6 md:space-y-8 about-content">
          <p className="text-base sm:text-lg md:text-2xl font-light text-[#ffffff] leading-relaxed">
            Full-stack software developer and tech entrepreneur specializing in modern web platforms, offline-first desktop systems, and intelligent cybersecurity models.
          </p>
          <p className="text-[rgba(255,255,255,0.6)] text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Grounded in a unique engineering foundation combining Computer Science and Mechanical Engineering, I architect high-performance software with a relentless focus on precision and system longevity. My work spans constructing localized desktop tools like Inventory Pro v2, maintaining high-concurrency digital media portals like Ummid.com, and developing machine-learning Web Application Firewalls.
          </p>
          <p className="text-[rgba(255,255,255,0.6)] text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Whether engineering robust APIs, fine-tuning edge caching layers, or drafting aerodynamic concept designs, I bridge raw technical complexity with clean, modern digital experiences.
          </p>
        </div>

        <div className="lg:col-span-5 space-y-8 md:space-y-12 about-content">
          <div className="border-t border-[rgba(255,255,255,0.1)] pt-4 md:pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">
              CORE TECHNOLOGIES
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-wide leading-relaxed">
              React, Node.js, Electron.js, SQLite, MERN Stack, Python, MySQL, Tailwind CSS
            </p>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-4 md:pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">
              SPECIALIZATIONS
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-wide leading-relaxed">
              Full-Stack Engineering, Desktop Persistence, Cyber Defense (WAF), High-Concurrency Performance Tuning
            </p>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-4 md:pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">
              BACKGROUND & DISCIPLINE
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-wide leading-relaxed">
              Computer Science & Mechanical Engineering
            </p>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-4 md:pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">
              LOCATION
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-wide">Global / Remote</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;