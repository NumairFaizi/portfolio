import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const menuRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: 'WORK', path: '/work' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
    )
    .fromTo(linksRef.current,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
      '-=0.8'
    )
    .fromTo(menuRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      '-=0.8'
    );
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full h-[80px] z-[100] flex items-center justify-between px-8 md:px-16 bg-black/40 backdrop-blur-md"
    >
      {/* LEFT: Modern Monogram Logo */}
      <Link to="/" ref={logoRef} className="text-white font-black text-[16px] tracking-[0.25em] uppercase">
        NUMAIR <span className="text-[#ff2a2a] font-light">/</span> FAIZI
      </Link>

      {/* RIGHT SIDE: Navigation Links & Mobile Hamburger */}
      <div className="relative z-10 flex items-center">
        {/* Navigation Links (Visible on desktop) */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                ref={el => linksRef.current[index] = el}
                to={link.path}
                className={`relative text-[12px] uppercase tracking-[2px] transition-colors duration-300 ease-in-out hover:text-[#ff2a2a] group ${
                  isActive ? 'text-[#ff2a2a]' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Hamburger Button (Mobile / Tablet Only) */}
        <button 
          ref={menuRef}
          className="flex md:hidden group flex-col justify-center items-end space-y-[6px] w-8 h-8 cursor-pointer"
          aria-label="Menu"
        >
          <span className="block w-8 h-[1px] bg-[#ff2a2a] transition-all duration-400 ease-out group-hover:w-5 group-hover:bg-white" />
          <span className="block w-8 h-[1px] bg-[#ff2a2a] transition-all duration-400 ease-out group-hover:bg-white" />
          <span className="block w-5 h-[1px] bg-[#ff2a2a] transition-all duration-400 ease-out group-hover:w-8 group-hover:bg-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;