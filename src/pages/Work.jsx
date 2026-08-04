import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { projectsData } from './ProjectDetails';

const Work = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-30 min-h-screen w-full bg-black text-white pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-16"
    >
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-12 md:mb-20 border-b border-[rgba(255,255,255,0.1)] pb-8 md:pb-12 flex flex-col md:flex-row justify-between md:items-end gap-4 md:gap-6">
          <div>
            <div className="w-6 md:w-8 h-[1px] bg-[#ff2a2a] mb-3 md:mb-5"></div>
            <h3 className="text-[#ff2a2a] text-[10px] md:text-[12px] uppercase tracking-[3px] font-medium mb-2 md:mb-3">
              SELECTED PORTFOLIO
            </h3>
            <h1
              className="text-3xl md:text-6xl font-black tracking-tight uppercase"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              FEATURED WORK
            </h1>
          </div>
          <p className="text-white/70 text-[11px] md:text-xs uppercase tracking-[2px] max-w-xs">
            EXPLORING THE INTERSECTION OF ENGINEERING, DESIGN, AND ARTIFICIAL INTELLIGENCE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/work/${project.id}`)}
              className="work-card group cursor-pointer flex flex-col justify-between border border-[rgba(255,255,255,0.15)] bg-[#0d0d0d] p-5 md:p-8 rounded-sm transition-all duration-300 hover:border-[#ff2a2a]"
            >
              <div className="relative overflow-hidden w-full h-[220px] sm:h-[280px] md:h-[380px] mb-6 md:mb-8 bg-[#111]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover origin-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-100"
                />
                <span className="absolute top-3 left-3 md:top-4 md:left-4 z-10 text-[#ff2a2a] text-[10px] md:text-xs font-mono font-bold tracking-widest bg-black/90 px-2.5 py-1 border border-[rgba(255,42,42,0.4)] shadow-md">
                  {project.number}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] md:text-[11px] uppercase tracking-[2px] text-white/80 mb-2 md:mb-3">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>

              <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase mb-3 md:mb-4 transition-colors duration-300 group-hover:text-[#ff2a2a]">
                {project.title}
              </h2>

              <p className="text-white text-xs md:text-sm font-light leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] md:text-[10px] uppercase tracking-[1px] text-white bg-white/5 border border-white/15 px-2 py-0.5 md:px-2.5 md:py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;