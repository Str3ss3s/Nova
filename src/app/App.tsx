import {
  useEffect,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "../widgets/hero/cursor/cursor";
import Hero from "../widgets/hero/hero";
import ProjectCard from "../widgets/hero/work/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

type SectionName =
  | "work"
  | "about"
  | "contact";

type ServiceProps = {
  number: string;
  title: string;
  description: string;
  details: string[];
  cursor: "strategy" | "design" | "development" | "motion";
};

function Service({
  number,
  title,
  description,
  details,
  cursor,
}: ServiceProps) {
  return (
    <a
      href="#contact"
      data-cursor={cursor}
      data-service
      className="group relative block overflow-hidden border-b border-white/10"
    >
      {/* Hover light */}

      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-500/[0.12] via-violet-500/[0.04] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-0" />

      {/* Giant number */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 text-[11rem] font-medium leading-none tracking-[-0.12em] text-white/[0.015] transition-all duration-700 group-hover:translate-x-4 group-hover:text-violet-400/[0.06] sm:text-[15rem] lg:text-[18rem]"
      >
        {number}
      </div>

      <div className="relative z-10 flex min-h-[190px] items-center gap-5 py-8 transition-all duration-500 group-hover:px-4 sm:min-h-[220px] sm:py-10 lg:min-h-[240px] lg:gap-10">
        {/* Number */}

        <span className="w-7 shrink-0 text-[10px] uppercase tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-violet-400 sm:w-10 sm:text-xs">
          {number}
        </span>

        {/* Main */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <h3 className="text-[clamp(2.7rem,5.8vw,6rem)] font-medium leading-[0.86] tracking-[-0.07em] transition-transform duration-500 group-hover:translate-x-3">
              {title}
            </h3>

            <p className="max-w-sm text-sm leading-7 text-white/25 transition-colors duration-500 group-hover:text-white/60 lg:mr-16">
              {description}
            </p>
          </div>

          {/* Tags */}

          <div className="mt-7 flex flex-wrap gap-2.5">
            {details.map((detail) => (
              <span
                key={detail}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/25 transition-all duration-300 group-hover:border-white/20 group-hover:text-white/45"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-white/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-violet-400/60 group-hover:bg-violet-500/10 group-hover:text-violet-300 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
          ↗
        </div>
      </div>
    </a>
  );
}

function App() {
  console.log("🔥 NOVA APP LOADED");
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState<SectionName | null>(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };

    scrollToTop();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio,
          );

        if (visibleSections.length === 0) {
          return;
        }

        const section =
          visibleSections[0].target.id;

        if (
          section === "work" ||
          section === "about" ||
          section === "contact"
        ) {
          setActiveSection(section);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: "-15% 0px -45% 0px",
      },
    );

    const sections = document.querySelectorAll(
      "[data-section]",
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      if (reduceMotion) {
        return;
      }

      /* ==========================================
         WORK HEADER
      ========================================== */

      const workHeader =
        document.querySelector(
          "[data-work-header]",
        );

      if (workHeader) {
        gsap.from(workHeader, {
          opacity: 0,
          y: 80,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: workHeader,
            start: "top 84%",
            toggleActions:
              "play none none reverse",
          },
        });
      }

      /* ==========================================
         PROJECT CARDS
      ========================================== */

      const projectCards =
        document.querySelectorAll(
          "[data-project-card]",
        );

      if (projectCards.length > 0) {
        gsap.from(projectCards, {
          opacity: 0,
          y: 100,
          scale: 0.96,
          duration: 1.1,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#work",
            start: "top 70%",
            toggleActions:
              "play none none reverse",
          },
        });
      }

      /* ==========================================
         ABOUT CONTENT
      ========================================== */

      const aboutContent =
        document.querySelector(
          "[data-about-content]",
        );

      if (aboutContent) {
        gsap.from(aboutContent, {
          opacity: 0,
          y: 90,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 78%",
            toggleActions:
              "play none none reverse",
          },
        });
      }

      /* ==========================================
         SERVICES
      ========================================== */

      const services =
        document.querySelectorAll(
          "[data-service]",
        );

      if (services.length > 0) {
        gsap.from(services, {
          opacity: 0,
          x: -70,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: services[0],
            start: "top 82%",
            toggleActions:
              "play none none reverse",
          },
        });
      }

      /* ==========================================
         CONTACT
      ========================================== */

      const contactContent =
        document.querySelector(
          "[data-contact-content]",
        );

      if (contactContent) {
        gsap.from(contactContent, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 78%",
            toggleActions:
              "play none none reverse",
          },
        });
      }

      /* ==========================================
         ABOUT PARALLAX
      ========================================== */

      const aboutGlow =
        document.querySelector(
          "[data-about-glow]",
        );

      if (aboutGlow) {
        gsap.to(aboutGlow, {
          y: -120,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      /* ==========================================
         CONTACT PARALLAX
      ========================================== */

      const contactGlow =
        document.querySelector(
          "[data-contact-glow]",
        );

      if (contactGlow) {
        gsap.to(contactGlow, {
          y: -100,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: "#contact",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      ScrollTrigger.refresh();
    });

    return () => {
      context.revert();
    };
  }, []);

  const navigateMobile = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <CustomCursor />

      {/* =====================================================
          FIXED NAVIGATION
      ===================================================== */}

      <header className="fixed left-0 top-0 z-[100] w-full px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-full border border-white/10 bg-[#09090b]/70 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-5">
          {/* Logo */}

          <a
            href="#top"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="group shrink-0 text-lg font-semibold tracking-[-0.06em]"
            aria-label="NOVA home"
          >
            NOVA
            <span className="ml-0.5 text-violet-500 transition-colors duration-300 group-hover:text-violet-300">
              ®
            </span>
          </a>

          {/* Desktop nav */}

          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/[0.025] p-1 md:flex"
          >
            {(
              [
                ["work", "Work"],
                ["about", "About"],
                ["contact", "Contact"],
              ] as const
            ).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`group flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeSection === id
                    ? "bg-white/[0.08] text-white"
                    : "text-white/45 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span
                  className={`h-1 w-1 rounded-full bg-violet-400 transition-all duration-300 ${
                    activeSection === id
                      ? "opacity-100 shadow-[0_0_10px_rgba(167,139,250,0.9)]"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}

          <a
            href="#contact"
            className="hidden rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/55 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white sm:px-5 md:block"
          >
            Start a project
          </a>

          {/* Mobile menu button */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((value) => !value)
            }
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/65 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white md:hidden"
            aria-label={
              mobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            <span>
              {mobileMenuOpen
                ? "Close"
                : "Menu"}
            </span>

            <span className="flex w-4 flex-col gap-1">
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  mobileMenuOpen
                    ? "translate-y-1 rotate-45"
                    : ""
                }`}
              />

              <span
                className={`h-px w-3 bg-current transition-transform duration-300 ${
                  mobileMenuOpen
                    ? "-translate-y-1 rotate-[-45deg]"
                    : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`fixed inset-0 z-[90] bg-[#09090b] transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-8 pt-32">
          <nav className="flex flex-col">
            {(
              [
                ["work", "WORK"],
                ["about", "ABOUT"],
                ["contact", "CONTACT"],
              ] as const
            ).map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={navigateMobile}
                className="group flex items-center gap-5 border-b border-white/10 py-7"
              >
                <span className="text-xs text-white/20">
                  0{index + 1}
                </span>

                <span className="text-[clamp(3rem,14vw,5rem)] font-medium leading-none tracking-[-0.07em] text-white/80 transition-transform duration-500 group-hover:translate-x-3 group-hover:text-white">
                  {label}
                </span>

                <span className="ml-auto text-xl text-white/20 transition-transform duration-500 group-hover:rotate-45 group-hover:text-violet-400">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
              Independent digital studio
            </p>

            <a
              href="mailto:hello@nova.studio"
              data-cursor="mail"
              onClick={navigateMobile}
              className="mt-4 block text-sm text-white/60"
            >
              hello@nova.studio
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAGE PROGRESS
      ===================================================== */}

      <div className="fixed left-0 top-0 z-[110] h-px w-full bg-transparent">
        <div
          id="page-progress"
          className="h-full origin-left scale-x-0 bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
        />
      </div>

      <main
        id="top"
        className="min-h-screen overflow-hidden bg-[#09090b] text-white"
      >
        <Hero />

        {/* ===================================================
            WORK
        =================================================== */}

        <section
          id="work"
          data-section
          className="scroll-mt-24 border-t border-white/10 bg-[#09090b]"
        >
          <div className="px-6 py-32 sm:px-10 sm:py-40 lg:px-12 lg:py-48">
            <div className="mx-auto max-w-[1500px]">
              <div
                data-work-header
                className="mb-20 flex flex-col gap-12 md:mb-28 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <div className="mb-8 flex items-center gap-4">
                    <span className="h-px w-10 bg-violet-400" />

                    <p className="text-xs uppercase tracking-[0.4em] text-violet-400">
                      Selected work
                    </p>
                  </div>

                  <h2 className="text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                    SELECTED
                    <br />

                    <span className="text-white/20">
                      WORK.
                    </span>
                  </h2>
                </div>

                <div className="max-w-sm md:text-right">
                  <p className="text-sm leading-7 text-white/35">
                    A selection of digital experiences, identities and
                    interactive worlds created for ambitious brands.
                  </p>

                  <div className="mt-7 flex items-center gap-5 md:justify-end">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                      03 projects
                    </span>

                    <span className="h-px w-8 bg-white/10" />

                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                      2024 — 2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-16">
                <div data-project-card>
                  <ProjectCard
                    number="01"
                    name="AETHER"
                    category="Digital experience"
                    title={
                      <>
                        INTO
                        <br />
                        THE VOID.
                      </>
                    }
                    description="An immersive digital experience built around movement, atmosphere and interaction. A visual system where every transition, layer and interaction contributes to the feeling of entering another world."
                    variant="purple"
                  />

                  <div className="mt-4 flex flex-col gap-3 px-2 text-[9px] uppercase tracking-[0.25em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      Strategy / Design / Development / Motion
                    </span>

                    <span>2026</span>
                  </div>
                </div>

                <div data-project-card>
                  <ProjectCard
                    number="02"
                    name="MONO"
                    category="Brand / Web"
                    title={
                      <>
                        LESS
                        <br />
                        IS MORE.
                      </>
                    }
                    description="A minimal identity and digital ecosystem designed around clarity and precision. Every component is reduced to its essential form while preserving character, rhythm and a strong visual voice."
                    variant="light"
                  />

                  <div className="mt-4 flex flex-col gap-3 px-2 text-[9px] uppercase tracking-[0.25em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      Identity / Art Direction / Web
                    </span>

                    <span>2025</span>
                  </div>
                </div>

                <div data-project-card>
                  <ProjectCard
                    number="03"
                    name="VOID"
                    category="Interactive identity"
                    title={
                      <>
                        BEYOND
                        <br />
                        REALITY.
                      </>
                    }
                    description="An experimental interactive identity exploring the relationship between space and technology. A constantly moving visual language designed to feel unpredictable, digital and alive."
                    variant="cyan"
                  />

                  <div className="mt-4 flex flex-col gap-3 px-2 text-[9px] uppercase tracking-[0.25em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      Concept / Interaction / Motion
                    </span>

                    <span>2024</span>
                  </div>
                </div>
              </div>

              <div className="mt-24 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-white/30">
                    More work available on request.
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/15">
                    Selected collaborations / Digital experiments /
                    Independent projects
                  </p>
                </div>

                <a
                  href="#contact"
                  className="group flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
                >
                  Start a project

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:border-violet-400/50 group-hover:text-violet-300">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}

        <section
          id="about"
          data-section
          className="scroll-mt-24 relative overflow-hidden border-t border-white/10 bg-[#09090b]"
        >
          <div
            data-about-glow
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[180px]"
          />

          <div
            data-about-content
            className="relative mx-auto max-w-[1500px] px-6 py-32 sm:px-10 sm:py-40 lg:px-12 lg:py-48"
          >
            <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-violet-400" />

                <p className="text-xs uppercase tracking-[0.4em] text-violet-400">
                  About NOVA
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Independent / Digital / Studio
              </span>
            </div>

            <h2 className="max-w-[1300px] text-[clamp(3.7rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.075em]">
              WE TURN
              <span className="text-white/20">
                {" "}
                IDEAS{" "}
              </span>
              INTO DIGITAL EXPERIENCES PEOPLE
              <span className="text-white/20">
                {" "}
                REMEMBER.
              </span>
            </h2>

            <div className="mt-24 grid gap-12 border-t border-white/10 pt-10 md:grid-cols-2">
              <p className="max-w-xl text-lg leading-8 text-white/45">
                NOVA is an independent digital studio focused on immersive
                websites, identities and interactive experiences.
              </p>

              <p className="max-w-xl text-lg leading-8 text-white/45">
                Strategy, design, development and motion — all under one roof.
                We bring these disciplines together to create digital
                experiences that feel coherent from the first pixel to the
                final interaction.
              </p>
            </div>

            {/* Services */}

            <div className="mt-32">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                    What we do
                  </p>

                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">
                    Four disciplines.
                    <span className="text-white/25">
                      {" "}
                      One experience.
                    </span>
                  </h3>
                </div>

                <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/15 md:block">
                  01 — 04
                </span>
              </div>

              <div className="border-t border-white/10">
                <Service
                  number="01"
                  title="STRATEGY"
                  description="Turning ideas into clear direction, positioning and digital concepts that have a reason to exist."
                  details={[
                    "Research",
                    "Positioning",
                    "Concept",
                    "Direction",
                  ]}
                  cursor="strategy"
                />

                <Service
                  number="02"
                  title="DESIGN"
                  description="Building visual systems, interfaces and memorable identities with a strong sense of hierarchy and atmosphere."
                  details={[
                    "UI",
                    "UX",
                    "Identity",
                    "Art Direction",
                  ]}
                  cursor="design"
                />

                <Service
                  number="03"
                  title="DEVELOPMENT"
                  description="Turning designs into fast, responsive and immersive experiences with thoughtful interactions and clean technology."
                  details={[
                    "Frontend",
                    "3D",
                    "Interaction",
                    "Performance",
                  ]}
                  cursor="development"
                />

                <Service
                  number="04"
                  title="MOTION"
                  description="Adding movement, interaction and personality to every experience without sacrificing clarity or performance."
                  details={[
                    "Animation",
                    "Transitions",
                    "Micro-interactions",
                    "Direction",
                  ]}
                  cursor="motion"
                />
              </div>
            </div>

            {/* About footer */}

            <div className="mt-20 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Approach
                </p>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/35">
                  Intentional, experimental and focused on the smallest
                  details.
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Process
                </p>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/35">
                  From the first idea to the final interaction, everything is
                  designed as one system.
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Focus
                </p>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/35">
                  Digital experiences that are memorable because they feel
                  different.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section
          id="contact"
          data-section
          className="scroll-mt-24 relative overflow-hidden border-t border-white/10 bg-[#09090b]"
        >
          <div
            data-contact-glow
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.08] blur-[200px]"
          />

          <div
            data-contact-content
            className="relative mx-auto max-w-[1500px] px-6 py-40 sm:px-10 sm:py-48 lg:px-12"
          >
            <div className="mb-12 flex items-center gap-4">
              <span className="h-px w-10 bg-violet-400" />

              <p className="text-xs uppercase tracking-[0.4em] text-violet-400">
                Start a project
              </p>
            </div>

            <a
              href="mailto:hello@nova.studio"
              data-cursor="mail"
              className="group block"
            >
              <h2 className="max-w-[1250px] text-[clamp(4.5rem,12vw,12rem)] font-medium leading-[0.75] tracking-[-0.09em]">
                LET'S
                <br />

                <span className="text-white/20 transition-colors duration-700 group-hover:text-white">
                  CREATE.
                </span>
              </h2>
            </a>

            <div className="mt-24 grid gap-12 border-t border-white/10 pt-10 md:grid-cols-2">
              <div>
                <p className="max-w-md text-lg leading-8 text-white/40">
                  Have an idea, a product or simply a problem worth solving?
                  Let's build something memorable.
                </p>

                <p className="mt-6 max-w-lg text-sm leading-7 text-white/25">
                  Whether you need a new digital identity, an immersive
                  website, a product experience or a complete creative
                  direction — NOVA can take the project from the first idea to
                  the final interaction.
                </p>
              </div>

              <div className="md:text-right">
                <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Email
                </p>

                <a
                  href="mailto:hello@nova.studio"
                  data-cursor="mail"
                  className="text-xl text-white/70 transition-colors duration-300 hover:text-white sm:text-2xl"
                >
                  hello@nova.studio
                </a>

                <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-white/20">
                  Available for selected projects
                </p>
              </div>
            </div>

            <div className="mt-24 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Based
                </p>

                <p className="mt-3 text-sm text-white/45">
                  Independent / Worldwide
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Focus
                </p>

                <p className="mt-3 text-sm text-white/45">
                  Digital experiences / Identity / Interaction
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Availability
                </p>

                <p className="mt-3 text-sm text-white/45">
                  Selected projects
                </p>
              </div>
            </div>

            <footer className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 NOVA Studio</span>

              <span>
                Digital worlds for ambitious brands.
              </span>

              <span>Made with intention.</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;