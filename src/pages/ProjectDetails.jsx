import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export const projectsData = [
  {
    id: 'ummid-news-platform',
    number: '01',
    title: 'UMMID.COM NEWS PLATFORM',
    category: 'Full-Stack / Web Operations',
    year: '2022 - 2024',
    client: 'Awaz Multimedia & Publications',
    role: 'Full-Stack Developer & Operations',
    image: '/assets/projects/ummid.png',
    liveUrl: 'https://www.ummid.com',
    description:
      'Maintained, optimized, and managed full-stack development operations for Ummid.com, a high-volume digital news portal established in 2005.',
    overview:
      'Ummid.com is a large-scale digital news platform requiring continuous high-concurrency handling and rapid content publishing. Focused on core publishing workflows, mobile responsiveness, server stability, and social distribution channels to maximize audience reach.',
    challenges:
      'Sustaining uninterrupted server uptime, managing high-volume traffic surges during breaking news, and optimizing legacy publishing layouts across diverse mobile browsers.',
    outcomes: [
      'Maintained and optimized core web publishing workflows and server infrastructure for high availability.',
      'Enhanced responsive frontend layouts using HTML5, CSS3, JavaScript, and Bootstrap.',
      'Integrated programmatic advertising networks, web analytics, and social sharing widgets.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Custom CMS', 'Web Analytics'],
  },
  {
    id: 'archi-athar-portfolio',
    number: '02',
    title: 'ARCHI-ATHAR PORTFOLIO PLATFORM',
    category: 'Full-Stack Web Systems / Showcase',
    year: '2026',
    client: 'Noor Infotech and Software Solutions',
    role: 'Full-Stack Software Developer',
    image: '/assets/projects/afa.png',
    liveUrl: '/',
    description:
      'A high-performance presentation platform for architectural and engineering projects featuring dynamic media galleries and responsive design.',
    overview:
      'Engineered to showcase complex architectural layouts and high-resolution visual assets with custom dynamic media management, fast load performance, and streamlined client interactions.',
    challenges:
      'Translating intricate architectural layouts and heavy visual media into fluid, fast-loading, responsive frontend interfaces without compromising image clarity.',
    outcomes: [
      'Architected full-stack web application using React, Node.js, Express, and MongoDB.',
      'Translated complex visual assets into highly responsive frontend components using Tailwind CSS.',
      'Implemented robust RESTful endpoints and persistence schemas for seamless content updates.',
    ],
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
  },
  {
    id: 'intelligent-waf',
    number: '03',
    title: 'INTELLIGENT WEB APPLICATION FIREWALL',
    category: 'AI & Cybersecurity / Full-Stack',
    year: '2025 - 2026',
    client: 'Savitribai Phule Pune University',
    role: 'Lead ML & Security Engineer',
    image: '/assets/projects/kavachh.png',
    liveUrl: 'https://github.com/numairfaizi/kavachh-waf',
    description:
      'An advanced machine-learning-driven Web Application Firewall (WAF) to detect, classify, and mitigate malicious web payloads in real-time.',
    overview:
      'Engineered a full-stack security solution that analyzes incoming HTTP request payloads dynamically, utilizing machine learning algorithms to neutralize payload injections and threat vectors before they reach backend APIs.',
    challenges:
      'Structuring an automated real-time text vectorization pipeline with minimal overhead latency while maintaining high precision to prevent false positives on legitimate application traffic.',
    outcomes: [
      'Deployed automated Python preprocessing pipelines for log normalization and TF-IDF feature extraction.',
      'Trained Random Forest classification models to identify malicious payload injection attempts accurately.',
      'Engineered full-stack Node.js/Express integration layers to enforce real-time threat threshold rules.',
    ],
    tags: ['Python', 'Machine Learning', 'Random Forest', 'TF-IDF', 'Node.js', 'Express', 'React'],
  },
  {
    id: 'inventory-management-system',
    number: '04',
    title: 'INVENTORY PRO V2 & DESKTOP SUITE',
    category: 'Full-Stack & Desktop Engineering',
    year: '2025 - 2026',
    client: 'Noor Infotech and Software Solutions',
    role: 'Full-Stack Desktop Developer',
    image: '/assets/projects/inv.png',
    liveUrl: 'https://github.com/numairfaizi/inventory-pro-v2',
    description:
      'A single-contained, offline-first inventory tracking system built with Electron.js, SQLite, and MERN backend APIs.',
    overview:
      'Developed for enterprise operations requiring complete offline reliability without reliance on active internet connection or third-party cloud engines. Features automated invoicing, stock tracking, and localized persistence.',
    challenges:
      'Architecting an ultra-responsive interface capable of managing thousands of localized stock records while ensuring transactional integrity during offline-to-online sync.',
    outcomes: [
      'Architected full-stack web and desktop software using MERN stack, Electron.js, and localized SQLite storage.',
      'Optimized localized data persistence layers to resolve system bottlenecks and speed up queries.',
      'Built responsive modern UI components leveraging Tailwind CSS and modular design.',
    ],
    tags: ['Electron.js', 'SQLite', 'React', 'Tailwind CSS', 'Express.js', 'Node.js'],
  },
  {
    id: 'pharmacy-course-marketplace',
    number: '05',
    title: 'PHARMACY COURSE MARKETPLACE',
    category: 'EdTech / Full-Stack Platform',
    year: '2025',
    client: 'Noor Infotech and Software Solutions',
    role: 'Full-Stack MERN Developer',
    image: '/assets/projects/pharma.png',
    liveUrl: 'https://pharmabynfz.netlify.app',
    description:
      'A specialized digital marketplace and e-learning platform tailored for pharmaceutical courses, interactive modules, and secure student workflows.',
    overview:
      'Designed specifically for healthcare professionals, this platform supports course enrollment pipelines, dynamic content delivery, structured course modules, and real-time student activity tracking.',
    challenges:
      'Building scalable MongoDB schemas to seamlessly link user course progress, certificate validation, and dynamic catalog administration.',
    outcomes: [
      'Architected full-stack MERN features to support dynamic course listings and enrollment workflows.',
      'Built mobile-first dashboards using React.js and Tailwind CSS for optimized navigation.',
      'Engineered scalable RESTful endpoints with Node.js and Express for session management and data safety.',
    ],
    tags: ['React', 'Tailwind CSS', 'Express.js', 'MongoDB', 'Node.js', 'REST API'],
  },
  {
    id: 'real-estate-platform',
    number: '06',
    title: 'REAL ESTATE LISTING PLATFORM',
    category: 'PropTech / Web Application',
    year: '2025 - 2026',
    client: 'Noor Infotech and Software Solutions',
    role: 'Full-Stack Software Developer',
    image: '/assets/projects/real-estate.png',
    liveUrl: 'https://github.com/numairfaizi/real-estate-platform',
    description:
      'A feature-rich real estate portal offering dynamic search filters, agent contact flows, interactive property galleries, and location mapping.',
    overview:
      'Engineered to connect property buyers directly with listing agents through multi-parameter searches (pricing, location, property type) and asynchronous filtering without full page reloads.',
    challenges:
      'Optimizing high-resolution property image lazy-loading and multi-field database indexing for rapid filtering response times across extensive property records.',
    outcomes: [
      'Built dynamic multi-parameter search filters for instantaneous query execution using RESTful APIs.',
      'Integrated dynamic image carousels, property maps, and lead routing inquiry modules.',
      'Designed responsive property layout views utilizing React.js and Tailwind CSS styling.',
    ],
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
  },
];

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const project = projectsData.find((p) => p.id === projectId);

  useEffect(() => {
    if (!project) return;
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.reveal-element', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projectId, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl md:text-4xl font-black mb-4">PROJECT NOT FOUND</h1>
        <p className="text-[rgba(255,255,255,0.6)] text-xs md:text-sm mb-8">
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/work"
          className="text-[#ff2a2a] text-xs uppercase tracking-[2px] border-b border-[#ff2a2a] pb-1"
        >
          Back to Work
        </Link>
      </div>
    );
  }

  const currentIndex = projectsData.findIndex((p) => p.id === projectId);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-16 max-w-[1800px] mx-auto"
    >
      <div className="mb-8 md:mb-12 reveal-element">
        <button
          onClick={() => navigate('/work')}
          className="inline-flex items-center text-[11px] md:text-[12px] uppercase tracking-[2px] text-[#ff2a2a] hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="mr-2">←</span> BACK TO WORK
        </button>
      </div>

      <div className="mb-10 md:mb-16 border-b border-[rgba(255,255,255,0.1)] pb-8 md:pb-12 reveal-element flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
            <span className="text-[#ff2a2a] text-xs md:text-sm font-mono">{project.number}</span>
            <span className="text-[rgba(255,255,255,0.5)] text-[10px] md:text-xs uppercase tracking-[2px]">
              {project.category}
            </span>
          </div>
          <h1
            className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tight uppercase leading-tight"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {project.title}
          </h1>
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-[2px] text-[#ff2a2a] bg-black border border-[#ff2a2a]/40 hover:bg-[#ff2a2a] hover:text-black transition-all duration-300 px-4 py-2.5 md:px-5 md:py-3 shadow-lg"
          >
            <span>LIVE PROJECT</span>
            <span>↗</span>
          </a>
        )}
      </div>

      <div className="w-full h-[250px] sm:h-[380px] md:h-[650px] overflow-hidden mb-12 md:mb-16 relative bg-[#111] reveal-element">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover origin-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 py-6 md:py-8 border-y border-[rgba(255,255,255,0.08)] mb-12 md:mb-20 reveal-element">
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-1.5 md:mb-2">YEAR</h4>
          <p className="text-xs md:text-sm font-medium">{project.year}</p>
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-1.5 md:mb-2">CLIENT / CONTEXT</h4>
          <p className="text-xs md:text-sm font-medium">{project.client}</p>
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-1.5 md:mb-2">ROLE</h4>
          <p className="text-xs md:text-sm font-medium">{project.role}</p>
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-1.5 md:mb-2">LIVE LINK</h4>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-mono text-[#ff2a2a] underline underline-offset-4 hover:text-white transition-colors"
            >
              VISIT SITE ↗
            </a>
          ) : (
            <p className="text-xs md:text-sm text-white/40">INTERNAL REPO</p>
          )}
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-1.5 md:mb-2">TECH STACK</h4>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] md:text-[10px] uppercase tracking-[1px] text-[rgba(255,255,255,0.6)]"
              >
                {tag}{i < project.tags.length - 1 ? ' /' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
        <div className="lg:col-span-7 space-y-8 md:space-y-12 reveal-element">
          <div>
            <h3 className="text-[#ff2a2a] text-[10px] md:text-[11px] uppercase tracking-[2px] mb-3 md:mb-4">
              PROJECT OVERVIEW
            </h3>
            <p className="text-base sm:text-lg md:text-xl font-light text-[rgba(255,255,255,0.85)] leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-[#ff2a2a] text-[10px] md:text-[11px] uppercase tracking-[2px] mb-3 md:mb-4">
              ENGINEERING CHALLENGES
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-light text-[rgba(255,255,255,0.65)] leading-relaxed">
              {project.challenges}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 reveal-element border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.08)] pt-8 lg:pt-0 pl-0 lg:pl-12">
          <h3 className="text-[#ff2a2a] text-[10px] md:text-[11px] uppercase tracking-[2px] mb-4 md:mb-6">
            KEY DELIVERABLES & OUTCOMES
          </h3>
          <ul className="space-y-3 md:space-y-4">
            {project.outcomes.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 text-xs md:text-sm text-[rgba(255,255,255,0.75)] font-light leading-relaxed"
              >
                <span className="text-[#ff2a2a] font-mono mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.1)] pt-10 md:pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 reveal-element">
        <div>
          <span className="text-[10px] text-[#ff2a2a] uppercase tracking-[2px] block mb-2">
            NEXT PROJECT
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight">
            {nextProject.title}
          </h2>
        </div>
        <Link
          to={`/work/${nextProject.id}`}
          className="mt-4 md:mt-0 text-[11px] md:text-[12px] uppercase tracking-[2px] text-white hover:text-[#ff2a2a] transition-colors duration-300 flex items-center space-x-2"
        >
          <span>VIEW CASE STUDY</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;