'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from './Hero/Hero';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HorizontalParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    const sections = gsap.utils.toArray<HTMLDivElement>('.panel');
    
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => '+=' + wrapper.offsetWidth,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    
    const sections = gsap.utils.toArray<HTMLDivElement>('.panel');
    
    let sectionIndex = -1;
    sections.forEach((section, index) => {
      if (section.id === sectionId) {
        sectionIndex = index;
      }
    });
    
    if (sectionIndex === -1) {
      return;
    }
    

    const triggers = ScrollTrigger.getAll();
    const st = triggers.find(t => t.vars.trigger === wrapper);
    
    if (!st) {
      return;
    }
    

    const progress = sectionIndex / (sections.length - 1);
    const scrollDistance = st.end - st.start;
    const targetScroll = st.start + (scrollDistance * progress);
    

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={wrapperRef} className="flex">
        <section className="panel min-w-screen h-screen flex items-center justify-center relative z-10">
          <Hero scrollToSection={scrollToSection} />
        </section>
        <section className="panel min-w-screen h-screen flex items-center justify-center relative z-10" id="about-us">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Sekce 2</h1>
            <p className="text-xl">Druhá sekce</p>
          </div>
        </section>
        <section className="panel min-w-screen h-screen flex items-center justify-center relative z-10" id="services">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Sekce 3</h1>
            <p className="text-xl">Třetí sekce</p>
          </div>
        </section>
        <section className="panel min-w-screen h-screen flex items-center justify-center relative z-10" id="contact">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Sekce 4</h1>
            <p className="text-xl">Konec cesty</p>
          </div>
        </section>
      </div>
    </div>
  );
}