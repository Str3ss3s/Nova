import type {
  MouseEvent,
  ReactNode,
} from "react";
import { useRef } from "react";
import { gsap } from "gsap";

type Variant =
  | "purple"
  | "light"
  | "cyan";

type ProjectCardProps = {
  number: string;
  name: string;
  category: string;
  title: ReactNode;
  description: string;
  variant?: Variant;
};

type Theme = {
  background: string;
  text: string;
  muted: string;
  border: string;
  glow: string;
  accent: string;
};

const themes: Record<
  Variant,
  Theme
> = {
  purple: {
    background: "#6d28d9",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.52)",
    border: "rgba(255,255,255,0.16)",
    glow: "#c4b5fd",
    accent: "#ddd6fe",
  },

  light: {
    background: "#e7e7e7",
    text: "#09090b",
    muted: "rgba(9,9,11,0.42)",
    border: "rgba(9,9,11,0.12)",
    glow: "#ffffff",
    accent: "#09090b",
  },

  cyan: {
    background: "#0e7490",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.52)",
    border: "rgba(255,255,255,0.16)",
    glow: "#67e8f9",
    accent: "#a5f3fc",
  },
};

function ProjectCard({
  number,
  name,
  category,
  title,
  description,
  variant = "purple",
}: ProjectCardProps) {
  const cardRef =
    useRef<HTMLElement>(null);

  const visualRef =
    useRef<HTMLDivElement>(null);

  const glowRef =
    useRef<HTMLDivElement>(null);

  const arrowRef =
    useRef<HTMLDivElement>(null);

  const titleRef =
    useRef<HTMLHeadingElement>(null);

  const theme = themes[variant];

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>,
  ) => {
    const card = cardRef.current;
    const visual = visualRef.current;
    const glow = glowRef.current;
    const arrow = arrowRef.current;
    const heading = titleRef.current;

    if (
      !card ||
      !visual ||
      !glow ||
      !arrow ||
      !heading
    ) {
      return;
    }

    const rect =
      card.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    const rotateX =
      (0.5 - y) * 5;

    const rotateY =
      (x - 0.5) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.45,
      ease: "power3.out",
      transformPerspective: 1400,
      overwrite: true,
    });

    gsap.to(visual, {
      x: (x - 0.5) * 34,
      y: (y - 0.5) * 34,
      duration: 0.65,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(glow, {
      x: (x - 0.5) * 100,
      y: (y - 0.5) * 100,
      duration: 0.85,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(arrow, {
      x: (x - 0.5) * 8,
      y: (y - 0.5) * 8,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(heading, {
      x: (x - 0.5) * 9,
      y: (y - 0.5) * 5,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseEnter = () => {
    if (
      !cardRef.current ||
      !visualRef.current ||
      !glowRef.current ||
      !arrowRef.current
    ) {
      return;
    }

    gsap.to(cardRef.current, {
      scale: 0.995,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(visualRef.current, {
      scale: 1.04,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(glowRef.current, {
      scale: 1.16,
      opacity: 0.22,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(arrowRef.current, {
      scale: 1.1,
      rotate: 45,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const visual = visualRef.current;
    const glow = glowRef.current;
    const arrow = arrowRef.current;
    const heading = titleRef.current;

    if (
      !card ||
      !visual ||
      !glow ||
      !arrow ||
      !heading
    ) {
      return;
    }

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.to(visual, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.to(glow, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0.1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(arrow, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    gsap.to(heading, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      data-cursor="view"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
      className="group relative min-h-[640px] overflow-hidden rounded-[2.5rem] will-change-transform sm:min-h-[690px] lg:min-h-[740px]"
    >
      {/* Main glow */}

      <div
        ref={glowRef}
        style={{
          backgroundColor: theme.glow,
        }}
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.1] blur-[120px] will-change-transform"
      />

      {/* Grid */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Huge project number */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-4 text-[15rem] font-semibold leading-none tracking-[-0.12em] opacity-[0.035] transition-all duration-700 group-hover:-translate-x-4 group-hover:opacity-[0.08] sm:text-[18rem]"
      >
        {number}
      </div>

      {/* Header */}

      <div className="absolute left-8 right-8 top-8 z-20 flex items-start justify-between gap-8 sm:left-12 sm:right-12 sm:top-12 lg:left-14 lg:right-14 lg:top-14">
        <div>
          <p
            style={{
              color: theme.muted,
            }}
            className="text-[10px] uppercase tracking-[0.35em]"
          >
            {number}
          </p>

          <h3 className="mt-3 text-lg font-medium tracking-[-0.04em]">
            {name}
          </h3>
        </div>

        <div className="text-right">
          <p
            style={{
              color: theme.muted,
            }}
            className="text-[9px] uppercase tracking-[0.3em]"
          >
            {category}
          </p>

          <p
            style={{
              color: theme.muted,
            }}
            className="mt-2 hidden text-[8px] uppercase tracking-[0.25em] sm:block"
          >
            Digital experience
          </p>
        </div>
      </div>

      {/* Visual */}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          ref={visualRef}
          className="relative mt-[-20px] h-[290px] w-[290px] will-change-transform sm:h-[350px] sm:w-[350px] lg:h-[420px] lg:w-[420px]"
        >
          {/* Outer */}

          <div
            style={{
              borderColor: theme.accent,
            }}
            className="absolute inset-0 rounded-full border opacity-[0.15]"
          />

          {/* Inner */}

          <div
            style={{
              borderColor: theme.accent,
            }}
            className="absolute inset-[9%] rounded-full border opacity-[0.22]"
          />

          {/* Orbit */}

          <div
            style={{
              borderColor: theme.accent,
            }}
            className="absolute left-1/2 top-1/2 h-[122%] w-[36%] -translate-x-1/2 -translate-y-1/2 rotate-[35deg] rounded-full border opacity-[0.22]"
          />

          {/* Core */}

          <div
            className="absolute inset-[23%] rounded-full shadow-2xl transition-transform duration-700"
            style={{
              background: `radial-gradient(circle at 30% 25%, ${theme.accent} 0%, ${theme.glow} 22%, ${theme.background} 72%)`,
            }}
          />

          {/* Highlight */}

          <div
            style={{
              backgroundColor: theme.accent,
            }}
            className="absolute left-[35%] top-[29%] h-[17%] w-[17%] rounded-full opacity-50 blur-xl"
          />

          {/* Satellite */}

          <div
            style={{
              backgroundColor: theme.accent,
              boxShadow: `0 0 45px ${theme.accent}`,
            }}
            className="absolute right-[11%] top-[23%] h-3.5 w-3.5 rounded-full opacity-80"
          />

          {/* Tiny satellite */}

          <div
            style={{
              backgroundColor: theme.accent,
              boxShadow: `0 0 30px ${theme.accent}`,
            }}
            className="absolute bottom-[18%] left-[16%] h-2.5 w-2.5 rounded-full opacity-60"
          />
        </div>
      </div>

      {/* Bottom */}

      <div className="absolute bottom-8 left-8 right-8 z-20 sm:bottom-12 sm:left-12 sm:right-12 lg:bottom-14 lg:left-14 lg:right-14">
        <div className="flex items-end justify-between gap-8">
          <div className="min-w-0">
            <h2
              ref={titleRef}
              className="max-w-[950px] text-[clamp(3.8rem,8vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em] will-change-transform"
            >
              {title}
            </h2>

            <p
              style={{
                color: theme.muted,
              }}
              className="mt-8 max-w-lg text-sm leading-7"
            >
              {description}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span
                style={{
                  backgroundColor: theme.accent,
                }}
                className="h-px w-8 opacity-40"
              />

              <span
                style={{
                  color: theme.muted,
                }}
                className="text-[8px] uppercase tracking-[0.3em]"
              >
                Explore project
              </span>
            </div>
          </div>

          <div
            ref={arrowRef}
            style={{
              borderColor: theme.border,
            }}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border text-xl will-change-transform sm:h-20 sm:w-20"
          >
            ↗
          </div>
        </div>
      </div>

      {/* Bottom accent */}

      <div
        style={{
          backgroundColor: theme.accent,
        }}
        className="absolute bottom-0 left-0 h-[2px] w-0 opacity-60 transition-all duration-1000 group-hover:w-full"
      />
    </article>
  );
}

export default ProjectCard;