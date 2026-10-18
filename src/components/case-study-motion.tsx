"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CaseStudyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !root.current) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-chaos-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 ? 34 : -34, rotate: (index - 2) * 3, y: index * 8 },
          {
            x: 0,
            y: 0,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card.parentElement,
              start: "top 82%",
              end: "bottom 45%",
              scrub: 0.45,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-route-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-route-story]",
            start: "top 78%",
            end: "bottom 58%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-wireframe-layer]").forEach((layer, index) => {
        gsap.fromTo(
          layer,
          { y: 50 + index * 20, rotate: index % 2 ? 2.5 : -2.5 },
          {
            y: index * -12,
            rotate: index % 2 ? 0.6 : -0.6,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-wireframe-story]",
              start: "top 85%",
              end: "bottom 45%",
              scrub: 0.55,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-collab-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          stagger: 0.12,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-collab-story]",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        "[data-compare-after]",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-compare-story]",
            start: "top 78%",
            end: "bottom 52%",
            scrub: 0.5,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
