import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

// Import local project images from src/assets/projects/
import kavachhImg from '../assets/projects/kavachh.png';
import inventoryImg from '../assets/projects/inv.png';
import ummidImg from '../assets/projects/ummid.png';
import afaImg from '../assets/projects/afa.png';
import pharmaImg from '../assets/projects/pharma.png';
import realImg from '../assets/projects/real-estate.png'

// Project Database
export const projectsData = [
    {
    id: 'ummid-maintenance',
    number: '01',
    title: 'UMMID.COM PLATFORM',
    category: 'Full-Stack / Platform Maintenance',
    year: '2026',
    client: 'Ummid News & Media Network',
    role: 'Lead Maintenance & Software Engineer',
    image: ummidImg,
    description: 'Ongoing technical maintenance, performance optimization, and server stability management for the high-traffic digital news portal Ummid.com.',
    overview: 'Ummid.com is a large-scale digital news platform requiring continuous high-concurrency handling and sub-second article delivery. The scope focuses on high-concurrency database optimizations, Varnish/Nginx edge cache management, PHP-FPM process tuning, and resolving legacy query bottlenecks during breaking news surges.',
    challenges: 'Sustaining uninterrupted uptime and low latency during traffic spikes while executing zero-downtime maintenance across legacy database indexing structures and cache layers.',
    outcomes: [
      'Configured Varnish and Nginx FastCGI edge caching to offload server compute spikes.',
      'Optimized MySQL query execution paths and database index structures.',
      'Sustained continuous high-concurrency uptime during peak news cycles.',
    ],
    tags: ['PHP', 'MySQL', 'Nginx', 'Varnish Cache', 'Bootstrap', 'Performance Tuning'],
  },
  {
    id: 'inventory-pro-v2',
    number: '02',
    title: 'INVENTORY PRO V2',
    category: 'Desktop Engineering / Electron.js',
    year: '2026',
    client: 'Enterprise Software',
    role: 'Full-Stack Desktop Developer',
    image: inventoryImg,
    description: 'A single-contained, zero-external-dependency offline desktop inventory application built with Electron.js, SQLite, and customized file storage.',
    overview: 'Inventory Pro v2 delivers complete operational independence for businesses requiring rapid stock tracking, invoicing, and reporting without internet connectivity or external cloud databases.',
    challenges: 'Creating an ultra-lightweight architecture that maintains transactional integrity across thousands of localized records without introducing external database server dependencies.',
    outcomes: [
      'Integrated SQLite local file storage with instantaneous query execution.',
      'Constructed custom JSON/file persistence for automatic localized backup.',
      'Delivered a modern dark UI tailored for high-volume daily enterprise operations.',
    ],
    tags: ['Electron.js', 'SQLite', 'React', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'afa-portfolio-portal',
    number: '03',
    title: 'AFA PORTFOLIO & PORTAL',
    category: 'Full-Stack Application / Web Systems',
    year: '2026',
    client: 'AFA Brand / Enterprise Client',
    role: 'Full-Stack Software Developer',
    image: afaImg,
    description: 'A custom corporate portfolio and digital interaction portal engineered for streamlined brand representation and client engagement.',
    overview: 'Developed to showcase enterprise services and streamline inquiries, the AFA platform features responsive micro-interactions, custom workflow integrations, and a tailored administrative control flow.',
    challenges: 'Delivering a highly interactive visual interface while maintaining crisp load performance across mobile and desktop devices.',
    outcomes: [
      'Engineered responsive web client utilizing modern front-end frameworks.',
      'Integrated streamlined inquiry pipelines for rapid user interaction.',
      'Delivered clean, maintainable architecture for easy content updates.',
    ],
    tags: ['React', 'Node.js', 'Tailwind CSS', 'MERN Stack'],
  },
  {
    id: 'pharma-course-marketplace',
    number: '04',
    title: 'PHARMA COURSE MARKETPLACE',
    category: 'EdTech / Full-Stack Platform',
    year: '2026',
    client: 'Healthcare & Pharma Education Provider',
    role: 'Lead Full-Stack Developer',
    image: pharmaImg, // Using mapped project asset
    description: 'A specialized e-learning marketplace designed for pharmaceutical professionals to enroll, purchase, and complete certified industry courses.',
    overview: 'A full-scale educational platform offering course management, video lecture streaming, assessment modules, and secure payment processing tailored specifically for pharmaceutical regulations and medical professionals.',
    challenges: 'Structuring a scalable database schema for tracking student course progression, quiz scoring, and automated certificate generation.',
    outcomes: [
      'Built a complete course purchasing and enrollment pipeline.',
      'Implemented secure user auth and granular access controls for video modules.',
      'Designed an intuitive admin dashboard for course creators and analytics.',
    ],
    tags: ['React', 'Express.js', 'MongoDB', 'Node.js', 'Payment Gateway Integration'],
  },
  {
    id: 'real-estate-listing-web',
    number: '05',
    title: 'REAL ESTATE LISTING PLATFORM',
    category: 'PropTech / Web Application',
    year: '2025',
    client: 'Property Real Estate Group',
    role: 'Full-Stack Developer',
    image: realImg,
    description: 'A feature-rich real estate portal offering property filter searches, agent contact flows, dynamic map integration, and immersive listing galleries.',
    overview: 'This platform connects property buyers with real estate listings through advanced multi-parameter searching (location, pricing, property type) and direct agent inquiry channels.',
    challenges: 'Optimizing high-resolution property image loading and handling dynamic location filtering without page reloads.',
    outcomes: [
      'Built dynamic search filters for instant property query execution.',
      'Integrated interactive image carousels and location mapping capabilities.',
      'Streamlined lead generation forms connected directly to listing agents.',
    ],
    tags: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'REST API'],
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
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projectId, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-4xl font-black mb-4">PROJECT NOT FOUND</h1>
        <p className="text-[rgba(255,255,255,0.6)] mb-8">The project you are looking for does not exist or has been moved.</p>
        <Link to="/work" className="text-[#ff2a2a] text-xs uppercase tracking-[2px] border-b border-[#ff2a2a] pb-1">
          Back to Work
        </Link>
      </div>
    );
  }

  // Find Next Project for Footer Link
  const currentIndex = projectsData.findIndex((p) => p.id === projectId);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-24 px-8 md:px-16 max-w-[1800px] mx-auto">
      
      {/* Back Button */}
      <div className="mb-12 reveal-element">
        <button
          onClick={() => navigate('/work')}
          className="inline-flex items-center text-[12px] uppercase tracking-[2px] text-[#ff2a2a] hover:text-white transition-colors duration-300"
        >
          <span className="mr-2">←</span> BACK TO WORK
        </button>
      </div>

      {/* Header */}
      <div className="mb-16 border-b border-[rgba(255,255,255,0.1)] pb-12 reveal-element">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-[#ff2a2a] text-sm font-mono">{project.number}</span>
          <span className="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-[2px]">{project.category}</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
          {project.title}
        </h1>
      </div>

      {/* Hero Cover Image */}
      <div className="w-full h-[400px] md:h-[650px] overflow-hidden mb-16 relative bg-[#111] reveal-element">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover origin-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Project Meta Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[rgba(255,255,255,0.08)] mb-20 reveal-element">
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">YEAR</h4>
          <p className="text-sm font-medium">{project.year}</p>
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">CLIENT / CONTEXT</h4>
          <p className="text-sm font-medium">{project.client}</p>
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">ROLE</h4>
          <p className="text-sm font-medium">{project.role}</p>
        </div>
        <div>
          <h4 className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mb-2">TECH STACK</h4>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-[1px] text-[rgba(255,255,255,0.6)]">
                {tag}{i < project.tags.length - 1 ? ' /' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* Left Column: Overview */}
        <div className="lg:col-span-7 space-y-12 reveal-element">
          <div>
            <h3 className="text-[#ff2a2a] text-[11px] uppercase tracking-[2px] mb-4">PROJECT OVERVIEW</h3>
            <p className="text-lg md:text-xl font-light text-[rgba(255,255,255,0.85)] leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-[#ff2a2a] text-[11px] uppercase tracking-[2px] mb-4">ENGINEERING CHALLENGES</h3>
            <p className="text-sm md:text-base font-light text-[rgba(255,255,255,0.65)] leading-relaxed">
              {project.challenges}
            </p>
          </div>
        </div>

        {/* Right Column: Outcomes & Deliverables */}
        <div className="lg:col-span-5 reveal-element border-l border-[rgba(255,255,255,0.08)] pl-0 lg:pl-12">
          <h3 className="text-[#ff2a2a] text-[11px] uppercase tracking-[2px] mb-6">KEY DELIVERABLES & OUTCOMES</h3>
          <ul className="space-y-4">
            {project.outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-[rgba(255,255,255,0.75)] font-light leading-relaxed">
                <span className="text-[#ff2a2a] font-mono mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Project Footer */}
      <div className="border-t border-[rgba(255,255,255,0.1)] pt-16 flex flex-col md:flex-row justify-between items-start md:items-center reveal-element">
        <div>
          <span className="text-[10px] text-[#ff2a2a] uppercase tracking-[2px] block mb-2">NEXT PROJECT</span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">{nextProject.title}</h2>
        </div>
        <Link
          to={`/work/${nextProject.id}`}
          className="mt-6 md:mt-0 text-[12px] uppercase tracking-[2px] text-white hover:text-[#ff2a2a] transition-colors duration-300 flex items-center space-x-2"
        >
          <span>VIEW CASE STUDY</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
};

export default ProjectDetails;