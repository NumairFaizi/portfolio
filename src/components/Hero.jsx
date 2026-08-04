import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroOverlayImg from '../assets/hero-video/hero-image/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const circleRef = useRef(null);
  const bgTextRef = useRef(null);
  const topLayerRef = useRef(null);
  
  // Cinematic Reveal Refs
  const revealCanvasRef = useRef(null);
  const revealMaskCanvasRef = useRef(null);
  const heroOverlayObj = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Preload Images objects
  const imagesRef = useRef([]);
  const currentFrameRef = useRef({ index: 0 });

  // 1. Preload Sequence Frames & Overlay Mask
  useEffect(() => {
    const frameCount = 225;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/src/assets/hero-video/frame_${num}.jpg`;
      
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

    // Load overlay image for reveal mask
    const overlayImg = new Image();
    overlayImg.src = heroOverlayImg;
    overlayImg.onload = () => { heroOverlayObj.current = overlayImg; };
    revealMaskCanvasRef.current = document.createElement('canvas');
  }, []);

  // 2. Main Canvas Frame Render
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[index];
    
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const scale = canvasWidth / img.width;
    const x = 0;
    const y = (canvasHeight / 2) - (img.height / 2) * scale;

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (revealCanvasRef.current) {
      revealCanvasRef.current.width = window.innerWidth * dpr;
      revealCanvasRef.current.height = window.innerHeight * dpr;
    }
    if (revealMaskCanvasRef.current) {
      revealMaskCanvasRef.current.width = window.innerWidth * dpr;
      revealMaskCanvasRef.current.height = window.innerHeight * dpr;
      
      const maskCtx = revealMaskCanvasRef.current.getContext('2d');
      if (maskCtx) {
        maskCtx.fillStyle = 'black';
        maskCtx.fillRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);
      }
    }
    
    renderFrame(currentFrameRef.current.index);
  };

  // 3. GSAP Animations & Reveal Loop
  useGSAP(() => {
    if (!preloaderComplete) {
      document.body.style.overflow = 'hidden';
    }

    if (!isLoaded) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderComplete(true);
        document.body.style.overflow = '';
      }
    });

    tl.to('.preloader-panel', {
      yPercent: 100,
      duration: 1.8,
      stagger: 0.12,
      ease: 'power4.inOut'
    })
    .fromTo(bgTextRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1'
    )
    .fromTo('.hero-title', 
      { opacity: 0, y: 80 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=1'
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 80 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-cta', 
      { opacity: 0, y: 80 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    handleResize();
    window.addEventListener('resize', handleResize);

    const frameCount = 225;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1));
        if (frameIndex !== currentFrameRef.current.index) {
          currentFrameRef.current.index = frameIndex;
          requestAnimationFrame(() => renderFrame(frameIndex));
        }
      }
    });

    gsap.to(canvasRef.current, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    gsap.fromTo(circleRef.current, 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Dynamic Brush Reveal Render
    const renderReveal = () => {
      if (!revealCanvasRef.current || !revealMaskCanvasRef.current || !heroOverlayObj.current) return;
      
      const canvas = revealCanvasRef.current;
      const maskCanvas = revealMaskCanvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: true });
      const maskCtx = maskCanvas.getContext('2d', { alpha: true });
      
      const w = canvas.width;
      const h = canvas.height;
      
      if (!ctx || !maskCtx || w === 0 || h === 0) return;

      if (currentFrameRef.current.index < 220) {
        if (mouseRef.current.isActive) {
          ctx.clearRect(0, 0, w, h);
          maskCtx.globalCompositeOperation = 'source-over';
          maskCtx.fillStyle = 'black';
          maskCtx.fillRect(0, 0, w, h);
          mouseRef.current.isActive = false;
        }
        return;
      }

      mouseRef.current.isActive = true;
      
      maskCtx.globalCompositeOperation = 'source-over';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      maskCtx.fillRect(0, 0, w, h);
      
      const { x, y } = mouseRef.current;
      if (x >= 0 && y >= 0) {
        maskCtx.globalCompositeOperation = 'destination-out';
        const radius = 250;
        const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        maskCtx.fillStyle = gradient;
        maskCtx.beginPath();
        maskCtx.arc(x, y, radius, 0, Math.PI * 2);
        maskCtx.fill();
      }
      
      ctx.clearRect(0, 0, w, h);
      
      const img = heroOverlayObj.current;
      const scale = w / img.width;
      const imgY = (h / 2) - (img.height / 2) * scale;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, 0, imgY, img.width * scale, img.height * scale);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(maskCanvas, 0, 0);
    };

    gsap.ticker.add(renderReveal);

    const handleMouseMove = (e) => {
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = e.clientY * dpr;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const stickyViewport = containerRef.current.querySelector('.sticky');
    if (stickyViewport) {
      stickyViewport.addEventListener('mousemove', handleMouseMove);
      stickyViewport.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      gsap.ticker.remove(renderReveal);
      if (stickyViewport) {
        stickyViewport.removeEventListener('mousemove', handleMouseMove);
        stickyViewport.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      
      {/* GSAP Preloader */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[200] flex w-full h-screen pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="preloader-panel h-full bg-[#1a1a1a] border-r border-[#222]"
              style={{ width: '16.666667%' }}
            />
          ))}
          {!isLoaded && (
             <div className="absolute inset-0 flex items-center justify-center text-white z-10 text-sm font-medium tracking-widest uppercase opacity-50">
               {loadingProgress}%
             </div>
          )}
        </div>
      )}

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover origin-center z-[0]"
        />

        {/* Cinematic Reveal Canvas */}
        <canvas
          ref={revealCanvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none z-[3] hidden md:block"
        />

        {/* BOLD HEADLINE OVERLAY TEXT (Adjusted with mix-blend and drop shadow for clean contrast) */}
        <div className="absolute top-[20%] left-6 md:left-12 pointer-events-none z-[1] flex flex-col select-none">
          <h1 
            ref={bgTextRef}
            className="text-[12vw] md:text-[10vw] leading-[0.82] font-black text-white/90 tracking-tighter uppercase filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{ 
              fontFamily: '"Inter", sans-serif',
            }}
          >
            NUMAIR<br />FAIZI
          </h1>
        </div>

        {/* Top Layer Cutout Image */}
        <img 
          ref={topLayerRef}
          src="/src/assets/hero-video/frame_225.jpg" 
          className="absolute inset-0 h-full w-full object-cover origin-center pointer-events-none z-[2] opacity-0"
          alt="Top Layer Cutout"
        />

        {/* Circular Thin Red Overlay Frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
          <div 
            ref={circleRef}
            className="rounded-full border border-[#ff2a2a] w-[68vh] h-[68vh] min-w-[300px] min-h-[300px] max-w-[720px] max-h-[720px] opacity-75 shadow-[0_0_25px_rgba(255,42,42,0.15)]"
            style={{ borderWidth: '1px' }}
          ></div>
        </div>

        {/* BOTTOM OVERLAY CONTENT */}
        <div className="absolute bottom-0 left-0 w-full z-[10] px-8 md:px-16 pb-12 flex flex-col pointer-events-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end w-full mb-8 max-w-[1800px] mx-auto">
            
            {/* LEFT COLUMN */}
            <div className="flex-1 mb-8 md:mb-0">
              <div className="w-8 h-[1px] bg-[#ff2a2a] mb-5"></div>
              <h3 className="hero-title opacity-0 text-[#ff2a2a] text-[12px] uppercase tracking-[2px] font-medium mb-3">
                WE CREATE
              </h3>
              <p className="hero-subtitle opacity-0 text-[#ffffff] text-[14px] leading-[1.4] font-light max-w-[200px]" style={{ fontFamily: '"Inter", "Outfit", sans-serif' }}>
                BOLD IDEAS THAT<br />INSPIRE ACTION.
              </p>
            </div>

            {/* CENTER SPACER */}
            <div className="hidden md:block flex-[2]"></div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex justify-start md:justify-end">
              <a href="/work" className="hero-cta opacity-0 group inline-flex flex-col items-start md:items-end">
                <div className="flex items-center text-[#ff2a2a] text-[12px] uppercase tracking-[2px] mb-2 transition-colors duration-300 group-hover:text-white">
                  <span className="mr-2">VIEW WORK</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
                <div className="w-full h-[1px] bg-[#ff2a2a] opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white"></div>
              </a>
            </div>
          </div>

          {/* FOOTER BAR */}
          <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(255,255,255,0.05)]">
            
            <div className="flex items-center space-x-12 mb-4 md:mb-0">
              {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social.toLowerCase()}`}
                  className="text-[#ff2a2a] text-[10px] uppercase tracking-[2px] transition-colors duration-300 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>

            <div className="text-[rgba(255,255,255,0.5)] text-[10px] uppercase tracking-[1px]">
              &copy; 2026 NUMAIR FAIZI | ALL RIGHTS RESERVED.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;