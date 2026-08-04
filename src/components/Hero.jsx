import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const circleRef = useRef(null);
  const bgTextRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef({ index: 0 });

  useEffect(() => {
    const frameCount = 225;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/assets/hero-video/frame_${num}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      images[i - 1] = img;
    }

    imagesRef.current = images;
  }, []);

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[index] || imagesRef.current[0];

    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderW, renderH, x, y;

    if (canvasRatio > imgRatio) {
      renderW = canvasWidth;
      renderH = canvasWidth / imgRatio;
      x = 0;
      y = (canvasHeight - renderH) / 2;
    } else {
      renderW = canvasHeight * imgRatio;
      renderH = canvasHeight;
      x = (canvasWidth - renderW) / 2;
      y = 0;
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, x, y, renderW, renderH);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fixed 1x DPR on mobile to preserve memory
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    renderFrame(currentFrameRef.current.index);
  };

  useGSAP(
    () => {
      if (!preloaderComplete) {
        document.body.style.overflow = 'hidden';
      }

      if (!isLoaded) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setPreloaderComplete(true);
          document.body.style.overflow = '';
        },
      });

      tl.to('.preloader-panel', {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power4.inOut',
      })
        .fromTo(
          bgTextRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );

      handleResize();
      window.addEventListener('resize', handleResize);

      const frameCount = 225;

      // GSAP Pinning: Guarantees section pins on mobile regardless of parent overflow rules
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: viewportRef.current, // Pin the inner viewport!
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(self.progress * (frameCount - 1)))
          );
          if (frameIndex !== currentFrameRef.current.index) {
            currentFrameRef.current.index = frameIndex;
            requestAnimationFrame(() => renderFrame(frameIndex));
          }
        },
      });

      gsap.fromTo(
        circleRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  return (
    <section ref={containerRef} className="relative h-[300vh] md:h-[400vh] w-full bg-black">
      {/* Preloader */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[200] flex w-full h-screen h-[100svh] pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="preloader-panel h-full bg-[#1a1a1a] border-r border-[#222]"
              style={{ width: '16.666667%' }}
            />
          ))}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-10 text-xs md:text-sm font-medium tracking-widest uppercase opacity-50">
              {loadingProgress}%
            </div>
          )}
        </div>
      )}

      {/* Viewport Container (Pinned via GSAP ScrollTrigger) */}
      <div
        ref={viewportRef}
        className="h-screen h-[100svh] w-full overflow-hidden bg-black relative"
      >
        {/* Canvas Render Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover z-[0]"
        />

        {/* Headline Overlay Text */}
        <div className="absolute top-[18%] md:top-[20%] left-5 md:left-12 pointer-events-none z-[1] flex flex-col select-none">
          <h1
            ref={bgTextRef}
            className="text-[13vw] sm:text-[12vw] md:text-[10vw] leading-[0.85] font-black text-white/90 tracking-tighter uppercase filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            NUMAIR
            <br />
            FAIZI
          </h1>
        </div>

        {/* Red Circle Accent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
          <div
            ref={circleRef}
            className="rounded-full border border-[#ff2a2a] w-[40vh] h-[40vh] sm:w-[55vh] sm:h-[55vh] md:w-[68vh] md:h-[68vh] min-w-[240px] min-h-[240px] max-w-[720px] max-h-[720px] opacity-75 shadow-[0_0_25px_rgba(255,42,42,0.15)]"
            style={{ borderWidth: '1px' }}
          ></div>
        </div>

        {/* Bottom Text Controls */}
        <div className="absolute bottom-0 left-0 w-full z-[10] px-5 md:px-16 pb-6 md:pb-12 flex flex-col pointer-events-auto bg-gradient-to-t from-black via-black/50 to-transparent">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-6 md:mb-8 max-w-[1800px] mx-auto">
            <div className="flex-1 mb-4 md:mb-0">
              <div className="w-6 md:w-8 h-[1px] bg-[#ff2a2a] mb-2 md:mb-5"></div>
              <h3 className="hero-title opacity-0 text-[#ff2a2a] text-[10px] md:text-[12px] uppercase tracking-[2px] font-medium mb-1 md:mb-3">
                WE CREATE
              </h3>
              <p
                className="hero-subtitle opacity-0 text-[#ffffff] text-[12px] md:text-[14px] leading-[1.4] font-light max-w-[180px] md:max-w-[200px]"
                style={{ fontFamily: '"Inter", "Outfit", sans-serif' }}
              >
                BOLD IDEAS THAT
                <br />
                INSPIRE ACTION.
              </p>
            </div>

            <div className="hidden md:block flex-[2]"></div>

            <div className="flex-1 flex justify-start md:justify-end">
              <a
                href="/work"
                className="hero-cta opacity-0 group inline-flex flex-col items-start md:items-end"
              >
                <div className="flex items-center text-[#ff2a2a] text-[10px] md:text-[12px] uppercase tracking-[2px] mb-1 md:mb-2 transition-colors duration-300 group-hover:text-white">
                  <span className="mr-2">VIEW WORK</span>
                  <span>↗</span>
                </div>
                <div className="w-full h-[1px] bg-[#ff2a2a] opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white"></div>
              </a>
            </div>
          </div>

          <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center pt-4 md:pt-8 border-t border-[rgba(255,255,255,0.05)] gap-3 md:gap-0">
            <div className="flex items-center space-x-6 md:space-x-12">
              {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className="text-[#ff2a2a] text-[9px] md:text-[10px] uppercase tracking-[2px] transition-colors duration-300 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>

            <div className="text-[rgba(255,255,255,0.5)] text-[8px] md:text-[10px] uppercase tracking-[1px]">
              &copy; 2026 NUMAIR FAIZI | ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;