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

  const navLinks = [
    { name: 'WORK', path: '/work' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
  ];

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
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full h-[70px] md:h-[80px] z-[100] flex items-center justify-between px-5 md:px-16 bg-black/60 backdrop-blur-md"
      >
        <Link
          to="/"
          ref={logoRef}
          onClick={closeMenu}
          className="text-white font-black text-[14px] md:text-[16px] tracking-[0.2em] md:tracking-[0.25em] uppercase flex items-center select-none"
        >
          NUMAIR
          <span
            className="text-[#ff2a2a] text-[18px] md:text-[20px] font-black mx-1 inline-block"
            style={{ WebkitTextStroke: '1.5px #ff2a2a' }}
          >
            /
          </span>
          FAIZI
        </Link>

        <div className="relative z-10 flex items-center">
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  ref={(el) => (linksRef.current[index] = el)}
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

      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden -translate-y-full opacity-0 pointer-events-none"
      >
        <div className="flex flex-col space-y-8">
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