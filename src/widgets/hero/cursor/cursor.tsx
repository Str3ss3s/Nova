import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CursorMode =
  | "default"
  | "view"
  | "strategy"
  | "design"
  | "development"
  | "motion"
  | "mail";

const labels: Record<
  CursorMode,
  string
> = {
  default: "",
  view: "VIEW",
  strategy: "STRATEGY",
  design: "DESIGN",
  development: "CODE",
  motion: "MOTION",
  mail: "MAIL",
};

function getMode(
  target: HTMLElement | null,
): CursorMode {
  if (!target) {
    return "default";
  }

  if (target.closest("[data-cursor='view']")) {
    return "view";
  }

  if (
    target.closest("[data-cursor='strategy']")
  ) {
    return "strategy";
  }

  if (
    target.closest("[data-cursor='design']")
  ) {
    return "design";
  }

  if (
    target.closest(
      "[data-cursor='development']",
    )
  ) {
    return "development";
  }

  if (
    target.closest("[data-cursor='motion']")
  ) {
    return "motion";
  }

  if (target.closest("[data-cursor='mail']")) {
    return "mail";
  }

  return "default";
}

function CustomCursor() {
  const cursorRef =
    useRef<HTMLDivElement>(null);

  const labelRef =
    useRef<HTMLSpanElement>(null);

  const currentMode =
    useRef<CursorMode>("default");

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;

    if (!cursor || !label) {
      return;
    }

    const isTouchDevice =
      window.matchMedia(
        "(pointer: coarse)",
      ).matches;

    if (isTouchDevice) {
      cursor.style.display = "none";
      return;
    }

    document.body.classList.add(
      "custom-cursor-enabled",
    );

    const moveX = gsap.quickTo(
      cursor,
      "x",
      {
        duration: 0.14,
        ease: "power3.out",
      },
    );

    const moveY = gsap.quickTo(
      cursor,
      "y",
      {
        duration: 0.14,
        ease: "power3.out",
      },
    );

    const setMode = (
      mode: CursorMode,
    ) => {
      if (
        currentMode.current === mode
      ) {
        return;
      }

      currentMode.current = mode;
      label.textContent = labels[mode];

      if (mode === "default") {
        gsap.to(cursor, {
          width: 10,
          height: 10,
          borderWidth: 0,
          backgroundColor: "#ffffff",
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(label, {
          opacity: 0,
          scale: 0.7,
          duration: 0.2,
          ease: "power2.out",
        });

        return;
      }

      gsap.to(cursor, {
        width: 92,
        height: 92,
        borderWidth: 1,
        borderColor:
          "rgba(255,255,255,0.4)",
        backgroundColor:
          "rgba(255,255,255,0.04)",
        duration: 0.4,
        ease: "power4.out",
      });

      gsap.to(label, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    };

    const handleMove = (
      event: PointerEvent,
    ) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleOver = (
      event: PointerEvent,
    ) => {
      const target =
        event.target instanceof HTMLElement
          ? event.target
          : null;

      setMode(getMode(target));
    };

    const handleDown = () => {
      gsap.to(cursor, {
        scale: 0.72,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    const handleUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      });
    };

    window.addEventListener(
      "pointermove",
      handleMove,
    );

    document.addEventListener(
      "pointerover",
      handleOver,
    );

    document.addEventListener(
      "pointerdown",
      handleDown,
    );

    document.addEventListener(
      "pointerup",
      handleUp,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handleMove,
      );

      document.removeEventListener(
        "pointerover",
        handleOver,
      );

      document.removeEventListener(
        "pointerdown",
        handleDown,
      );

      document.removeEventListener(
        "pointerup",
        handleUp,
      );

      document.body.classList.remove(
        "custom-cursor-enabled",
      );
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
      style={{
        width: 10,
        height: 10,
        mixBlendMode: "difference",
      }}
    >
      <span
        ref={labelRef}
        className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.18em] text-white opacity-0"
      />
    </div>
  );
}

export default CustomCursor;