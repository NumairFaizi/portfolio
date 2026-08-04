import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-24 px-8 md:px-16 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-20 border-b border-[rgba(255,255,255,0.1)] pb-12">
        <div className="w-8 h-[1px] bg-[#ff2a2a] mb-5"></div>
        <h3 className="text-[#ff2a2a] text-[12px] uppercase tracking-[3px] font-medium mb-3">
          BACKGROUND
        </h3>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
          ABOUT THE FIRM
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Bio Column */}
        <div className="lg:col-span-7 space-y-8 about-content">
          <p className="text-lg md:text-2xl font-light text-[#ffffff] leading-relaxed">
            Engineering robust web, desktop, and machine learning systems with precision and high-performance aesthetics.
          </p>
          <p className="text-[rgba(255,255,255,0.6)] text-sm md:text-base font-light leading-relaxed">
            We focus on constructing robust offline-first software solutions, intelligent cybersecurity firewalls, and custom full-stack web applications. Grounded in strong engineering principles across Computer Science and Mechanical engineering disciplines, every deliverable balances performance with visual impact.
          </p>
        </div>

        {/* Right Stats & Highlights Column */}
        <div className="lg:col-span-5 space-y-12 about-content">
          <div className="border-t border-[rgba(255,255,255,0.1)] pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">CORE TECHNOLOGIES</h4>
            <p className="text-sm font-medium tracking-wide">React, Electron.js, SQLite, MERN, Python, Machine Learning</p>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">SPECIALIZATIONS</h4>
            <p className="text-sm font-medium tracking-wide">Desktop Persistence, Cyber Defense, Payload Classification, Aero Drafting</p>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-6">
            <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">LOCATION</h4>
            <p className="text-sm font-medium tracking-wide">Global / Remote</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;