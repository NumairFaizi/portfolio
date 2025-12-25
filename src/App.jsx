import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Menu, 
  X, 
  ChevronDown,
  Send,
  Sparkles
} from 'lucide-react';

// --- Configuration: UPDATE YOUR LINKS HERE ---
const socialLinks = {
  github: "https://github.com/your-github-username", // Replace with your actual GitHub URL
  linkedin: "https://www.linkedin.com/in/your-linkedin-profile", // Replace with your actual LinkedIn URL
  email: "mailto:hello@numair.dev", // Replace with your actual email
  twitter: "https://twitter.com/your-handle" // Optional
};

// --- Custom CSS for Animations ---
const customStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
  .glass-card:hover {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
  }
  .text-glow {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
`;

// --- Custom Hooks ---

// Hook for the typing effect in the Hero section
const useTypewriter = (words, loop = true) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index === words.length && !loop) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, loop]);

  return `${words[index].substring(0, subIndex)}${blink ? "|" : "\u00A0"}`;
};

// --- Components ---

const Navbar = ({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-slate-950/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:text-glow transition-all duration-300">
              Numair Faizi
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`${
                    activeSection === link.id
                      ? 'text-cyan-400 font-semibold bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  } px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/10`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollToSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-slate-950">
      {/* Moving Liquid Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Additional Ambient Glows for depth */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-900/30 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
};

const Hero = ({ scrollToSection }) => {
  const typewriterText = useTypewriter(['Full Stack Developer', 'Software Engineer', 'Creative Tech Enthusiast']);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        {/* Glass Container for Hero Content */}
        <div className="glass-card p-8 md:p-12 rounded-3xl inline-block max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-px w-8 bg-cyan-500/50"></span>
            <span className="text-cyan-400 font-medium tracking-widest text-sm uppercase">Welcome to my portfolio</span>
            <span className="h-px w-8 bg-cyan-500/50"></span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight animate-fade-in-up">
            Numair Faizi
          </h1>
          
          <div className="h-16 mb-8 flex items-center justify-center">
             <p className="text-xl md:text-3xl text-gray-300">
              I am a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">{typewriterText}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></div>
              <span className="relative flex items-center gap-2">View My Work <Sparkles size={16} /></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-medium transition-all backdrop-blur-md"
            >
              Contact Me
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-8">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full text-gray-400 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
              <Github size={20} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full text-gray-400 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
              <Linkedin size={20} />
            </a>
            <a href={socialLinks.email} className="p-3 glass-card rounded-full text-gray-400 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
          <ChevronDown className="text-white" size={32} />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                {/* Rotating Borders */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Profile Image Container */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 overflow-hidden shadow-2xl">
                    <img 
                     src="/dp.png" 
                     alt="Profile Picture of Numair Faizi"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                    />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                <span className="text-cyan-400 font-medium tracking-widest uppercase text-sm">About Numair Faizi</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Crafting digital experiences with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">precision & passion.</span>
              </h2>
              
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  I'm <span className="text-white font-semibold">Numair Faizi</span>, a software engineer who bridges the gap between functional code and beautiful design.
                </p>
                <p>
                  Specializing in the React ecosystem and modern web architectures, I build applications that are not just robust, but also intuitive and engaging. I believe the best code is the kind that users never notice—because everything just works.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-2xl text-center hover:bg-white/5 transition-colors">
                  <h3 className="text-3xl font-bold text-cyan-400 mb-1">2</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Years Exp.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl text-center hover:bg-white/5 transition-colors">
                  <h3 className="text-3xl font-bold text-purple-400 mb-1">Multiple</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'JavaScript', icon: <Code2 size={24} />, color: 'text-yellow-300' },
    { name: 'React', icon: <Globe size={24} />, color: 'text-cyan-400' },
    { name: 'Node.js', icon: <Terminal size={24} />, color: 'text-green-400' },
    { name: 'Database', icon: <Cpu size={24} />, color: 'text-purple-400' },
    { name: 'Git', icon: <Github size={24} />, color: 'text-orange-400' },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-medium uppercase tracking-widest text-sm">Tech Stack</span>
          <h2 className="text-4xl font-bold text-white mt-4 text-glow">Technologies I Master</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-300 group-hover:text-white transition-colors">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Inventory Pro Web App',
      desc: 'A comprehensive web-based inventory management system designed for efficiency and scalability.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: 'https://invepro.netlify.app',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000' // Dashboard Image
    },
    {
      title: 'Pharma Course Marketplace',
      desc: 'An educational marketplace platform built for MZ Pharma Vision, connecting professionals with specialized pharmaceutical courses.',
      tags: ['Next.js', 'Tailwind', 'Stripe'],
      link: 'https://pharmabynfz.netlify.app/',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000' // Medical/Lab Image
    },
    {
      title: 'Inventory Pro Desktop',
      desc: 'A cross-platform desktop application for inventory tracking, built for offline capabilities and native performance using Electron.js.',
      tags: ['Electron.js', 'React', 'Node.js'],
      link: 'https://invepro.netlify.app',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000' // Abstract Tech/Code Image
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-cyan-400 font-medium uppercase tracking-widest text-sm">My Portfolio</span>
            <h2 className="text-4xl font-bold text-white mt-4">Featured Works</h2>
          </div>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full glass-card text-gray-300 hover:text-white transition-all hover:bg-white/10">
            View Github <Github size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden group">
              {/* Project Image */}
              <div className="h-56 w-full relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                   <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                     View Project
                   </a>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-cyan-200 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                   <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                     <Github size={16} /> Source Code
                   </a>
                   <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                     Live Demo <ExternalLink size={16} />
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-gray-300 hover:text-white transition-all">
            View Github <Github size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent">
        <div className="bg-slate-950/50 rounded-[22px] p-8 md:p-12 backdrop-blur-xl">
          <div className="text-center mb-12">
            <span className="text-cyan-400 font-medium uppercase tracking-widest text-sm">Contact</span>
            <h2 className="text-4xl font-bold text-white mt-4">Let's Build Together</h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Ready to start your next project with me? Send me a message and I will get back to you as soon as possible!
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Your Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Your Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none placeholder:text-gray-600"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              Send Message <Send size={20} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
               <Mail size={16} className="text-cyan-400" />
               <a href={socialLinks.email} className="hover:text-cyan-400 transition-colors">hello@numair.dev</a>
            </div>
            <div className="flex gap-8">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-white/5 bg-slate-950/80 backdrop-blur-md z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Numair Faizi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scrolling handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Inject custom styles for animations */}
      <style>{customStyles}</style>
      
      {/* Persistent Liquid Background */}
      <LiquidBackground />

      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="relative z-10">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;