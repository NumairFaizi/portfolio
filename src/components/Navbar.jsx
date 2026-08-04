import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'WORK', path: '/work', hasDropdown: true },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
  ];

  const projectDropdownItems = [
    { name: 'UMMID NEWS PLATFORM', path: '/work/ummid-news-platform', tag: 'WEB OPS' },
    { name: 'ARCHI-ATHAR PORTFOLIO', path: '/work/archi-athar-portfolio', tag: 'FULL STACK' },
    { name: 'INTELLIGENT WAF (KAVACHH)', path: '/work/intelligent-waf', tag: 'AI / CYBER' },
    { name: 'INVENTORY PRO V2', path: '/work/inventory-management-system', tag: 'DESKTOP' },
  ];

  // Initial Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
    )
      .fromTo(
        linksRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
        '-=0.8'
      )
      .fromTo(
        menuRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
        '-=0.8'
      );
  }, []);

  // Mobile Menu Toggle Animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: '0%',
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'all',
      });
      gsap.fromTo(
        mobileLinksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: '-100%',
        duration: 0.4,
        ease: 'power3.in',
        pointerEvents: 'none',
      });
    }
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="fixed top-3 md:top-5 left-0 w-full z-[100] px-4 md:px-12 flex justify-center">
        <nav
          ref={navRef}
          className="w-full max-w-[1400px] h-[60px] md:h-[70px] rounded-full flex items-center justify-between px-6 md:px-10 bg-black/35 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300"
        >
          {/* LEFT: Logo */}
          <Link
            to="/"
            ref={logoRef}
            onClick={closeMenu}
            className="text-white font-black text-[13px] md:text-[15px] tracking-[0.2em] md:tracking-[0.25em] uppercase flex items-center select-none"
          >
            NUMAIR
            <span
              className="text-[#ff2a2a] text-[16px] md:text-[18px] font-black mx-1 inline-block"
              style={{ WebkitTextStroke: '1.5px #ff2a2a' }}
            >
              /
            </span>
            FAIZI
          </Link>

          {/* RIGHT SIDE: Navigation Links & Mobile Toggle */}
          <div className="relative z-10 flex items-center">
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative py-4"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <Link
                        ref={(el) => (linksRef.current[index] = el)}
                        to={link.path}
                        className={`relative text-[11px] uppercase tracking-[2px] transition-colors duration-300 ease-in-out hover:text-[#ff2a2a] flex items-center space-x-1 group ${
                          isActive ? 'text-[#ff2a2a]' : 'text-white'
                        }`}
                      >
                        <span>{link.name}</span>
                        <span className="text-[9px] text-[#ff2a2a] transform transition-transform duration-300 group-hover:rotate-180">
                          ▾
                        </span>
                      </Link>

                      {/* GLASSMORPHISM DROPDOWN MENU */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 w-[300px] bg-white/[0.08] backdrop-blur-3xl border border-white/20 ring-1 ring-white/15 rounded-2xl p-3.5 shadow-[0_16px_40px_0_rgba(0,0,0,0.6)] transition-all duration-300 ${
                          dropdownOpen
                            ? 'opacity-100 translate-y-1 pointer-events-auto'
                            : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
                        }}
                      >
                        <div className="text-[9px] uppercase tracking-[2px] text-[#ff2a2a] px-3 py-1.5 font-bold border-b border-white/10 mb-1">
                          FEATURED CASE STUDIES
                        </div>
                        <div className="flex flex-col space-y-1">
                          {projectDropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={closeMenu}
                              className="group/item flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/15 hover:border-white/20 border border-transparent transition-all duration-200"
                            >
                              <span className="text-[10px] font-semibold tracking-wider text-white/90 group-hover/item:text-[#ff2a2a] transition-colors">
                                {item.name}
                              </span>
                              <span className="text-[8px] font-mono text-white/50 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded-md">
                                {item.tag}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    ref={(el) => (linksRef.current[index] = el)}
                    to={link.path}
                    className={`relative text-[11px] uppercase tracking-[2px] transition-colors duration-300 ease-in-out hover:text-[#ff2a2a] group ${
                      isActive ? 'text-[#ff2a2a]' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuRef}
              onClick={toggleMenu}
              className="flex md:hidden group flex-col justify-center items-end space-y-[5px] w-8 h-8 cursor-pointer z-[110]"
              aria-label="Toggle Menu"
            >
              <span
                className={`block h-[1.5px] bg-[#ff2a2a] transition-all duration-300 ${
                  mobileMenuOpen ? 'w-7 rotate-45 translate-y-[6.5px] bg-white' : 'w-7'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#ff2a2a] transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'w-7'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#ff2a2a] transition-all duration-300 ${
                  mobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[6.5px] bg-white' : 'w-5'
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden -translate-y-full opacity-0 pointer-events-none"
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                ref={(el) => (mobileLinksRef.current[index] = el)}
                to={link.path}
                onClick={closeMenu}
                className={`text-3xl font-black uppercase tracking-[4px] transition-colors duration-300 ${
                  isActive ? 'text-[#ff2a2a]' : 'text-white hover:text-[#ff2a2a]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-10 left-8 right-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-[2px] text-white/40">
          <span>NUMAIR FAIZI&deg;</span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;