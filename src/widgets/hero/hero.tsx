import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import HeroScene from "./HeroScene";

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .from(eyebrowRef.current, {
          opacity: 0,
          y: 25,
          duration: 0.8,
        })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.96,
            duration: 1.25,
          },
          "-=0.4",
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.65",
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5",
        );
    }, heroRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#09090b] text-white"
    >
      {/* =================================
          THREE.JS SCENE
      ================================= */}

      <HeroScene />

      {/* =================================
          DARK VIGNETTE
      ================================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.05)_40%,#09090b_100%)]" />

      {/* =================================
          FIXED NAVIGATION
      ================================= */}

      <header className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-[1500px] -translate-x-1/2 sm:top-7">
        <div className="flex items-center justify-between">
          {/* LOGO */}

          <a
            href="/"
            className="group rounded-full border border-white/10 bg-[#09090b]/60 px-5 py-3 text-lg font-semibold tracking-[-0.05em] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#09090b]/80"
            aria-label="NOVA — главная"
          >
            NOVA

            <span className="ml-0.5 text-violet-500 transition-colors duration-300 group-hover:text-violet-300">
              ®
            </span>
          </a>

          {/* NAVIGATION */}

          <nav
            aria-label="Основная навигация"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#09090b]/60 p-1.5 shadow-2xl backdrop-blur-xl md:flex"
          >
            <a
              href="#work"
              className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition-all duration-300 hover:bg-white/[0.09] hover:text-white"
            >
              <span className="h-1 w-1 rounded-full bg-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(167,139,250,0.9)]" />

              Work
            </a>

            <a
              href="#about"
              className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition-all duration-300 hover:bg-white/[0.09] hover:text-white"
            >
              <span className="h-1 w-1 rounded-full bg-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(167,139,250,0.9)]" />

              About
            </a>

            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition-all duration-300 hover:bg-white/[0.09] hover:text-white"
            >
              <span className="h-1 w-1 rounded-full bg-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(167,139,250,0.9)]" />

              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* =================================
          HERO CONTENT
      ================================= */}

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-28 sm:px-10 sm:py-32 lg:px-11">
        {/* MAIN */}

        <div className="mx-auto flex w-full max-w-[1500px] flex-1 items-center">
          <div className="w-full">
            <p
              ref={eyebrowRef}
              className="mb-7 text-[10px] uppercase tracking-[0.42em] text-violet-400 sm:text-xs"
            >
              Independent digital studio
            </p>

            <h1
              ref={titleRef}
              className="max-w-[1100px] text-[clamp(4rem,10.5vw,10.5rem)] font-medium leading-[0.79] tracking-[-0.075em]"
            >
              <span className="block">
                WE CREATE
              </span>

              <span className="block text-white/20">
                DIGITAL
              </span>

              <span className="block">
                WORLDS.
              </span>
            </h1>
          </div>
        </div>

        {/* =================================
            BOTTOM
        ================================= */}

        <div className="mx-auto flex w-full max-w-[1500px] items-end justify-between gap-8">
          {/* DESCRIPTION */}

          <p
            ref={descriptionRef}
            className="max-w-[340px] text-xs leading-5 text-white/40"
          >
            We design digital experiences,
            identities and interactive worlds
            for ambitious brands.
          </p>

          {/* SCROLL */}

          <a
            ref={scrollRef}
            href="#work"
            className="group flex shrink-0 items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/60 transition-colors duration-300 hover:text-white"
          >
            <span className="hidden sm:block">
              Scroll to explore
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/40 group-hover:bg-white/[0.05]">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;