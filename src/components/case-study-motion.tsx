"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CaseStudyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-title] > span", { y: 70, autoAlpha: 0, duration: 0.9 })
        .from("[data-hero-title] h1", { y: 50, autoAlpha: 0, duration: 0.8 }, "-=.55")
        .from("[data-postcard]", { y: 70, rotate: 0, autoAlpha: 0, stagger: 0.14, duration: 0.75 }, "-=.45")
        .from("[data-product-float]", { y: 90, autoAlpha: 0, stagger: 0.12, duration: 0.85 }, "-=.45")
        .from("[data-stamp]", { scale: 1.5, rotate: 20, autoAlpha: 0, duration: 0.55 }, "-=.4");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 42 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((photo) => {
        const image = photo.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { scale: 1.04, yPercent: -3 }, {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      });

      const chaosCards = gsap.utils.toArray<HTMLElement>("[data-chaos-card]");
      chaosCards.forEach((card, index) => {
        gsap.fromTo(card, { x: index % 2 ? -90 : 80, y: index * 20 - 40, autoAlpha: 0 }, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-chaos-story]", start: "top 75%", end: "45% 55%", scrub: 0.55 },
        });
      });
      gsap.fromTo("[data-organized-plan]", { autoAlpha: 0, scale: 0.88, x: 60 }, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        ease: "none",
        scrollTrigger: { trigger: "[data-chaos-story]", start: "25% 65%", end: "65% 55%", scrub: 0.55 },
      });

      const route = document.querySelector<SVGPathElement>("[data-route-line]");
      if (route) {
        const length = route.getTotalLength();
        gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(route, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: "[data-route-story]", start: "top 78%", end: "55% 48%", scrub: 0.6 },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-wireframe-layer]").forEach((layer, index) => {
        gsap.fromTo(layer, { y: 70 + index * 18, rotate: index % 2 ? 5 : -5, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          rotate: index % 2 ? -2 : 2,
          ease: "none",
          scrollTrigger: { trigger: "[data-wireframe-story]", start: "top 85%", end: "60% 48%", scrub: 0.5 },
        });
      });

      gsap.from("[data-illustration]", {
        y: 45,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-illustration]", start: "top 86%", toggleActions: "play none none reverse" },
      });

      gsap.utils.toArray<HTMLElement>("[data-product-shot]").forEach((shot, index) => {
        gsap.fromTo(shot, { y: 80, rotate: 0, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          delay: index * 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: shot, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      const sequence = document.querySelector<HTMLElement>("[data-revision-sequence]");
      const stage = document.querySelector<HTMLElement>("[data-revision-stage]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-revision-panel]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-revision-step]");
      const progress = document.querySelector<HTMLElement>("[data-revision-progress]");
      const status = document.querySelector<HTMLElement>("[data-revision-status]");
      const statusCopy = [
        ["ACCEPTED PLAN · REVISION 1", "₹37,600", "of ₹40,000 shared"],
        ["PROPOSAL · NOT APPLIED", "₹38,000", "+₹400 estimated transport"],
        ["CONFLICT · 20 MINUTES", "5:20 pm", "estimated arrival at reservation"],
        ["PROPOSAL · CONFLICT CLEARED", "₹38,000", "Apply is still required"],
        ["ACCEPTED PLAN · REVISION 2", "₹38,000", "Undo available"],
        ["RESTORED · REVISION 1", "₹37,600", "previous plan restored"],
      ];

      const activateStep = (index: number) => {
        const panelIndex = Number(steps[index]?.dataset.panel ?? 0);
        panels.forEach((panel, i) => gsap.to(panel, { autoAlpha: i === panelIndex ? 1 : 0, scale: i === panelIndex ? 1 : 0.97, duration: 0.35, overwrite: true }));
        steps.forEach((step, i) => gsap.to(step, { opacity: i === index ? 1 : 0.82, duration: 0.25, overwrite: true }));
        if (progress) gsap.to(progress, { scaleX: index / Math.max(1, steps.length - 1), duration: 0.35 });
        if (status) {
          const [label, value, note] = statusCopy[index];
          const labelNode = status.querySelector("span");
          const valueNode = status.querySelector("strong");
          const noteNode = status.querySelector("small");
          if (labelNode) labelNode.textContent = label;
          if (valueNode) valueNode.textContent = value;
          if (noteNode) noteNode.textContent = note;
          gsap.fromTo(status, { y: 8 }, { y: 0, duration: 0.3, ease: "power2.out" });
        }
      };

      activateStep(0);
      if (steps.length > 1) {
        ScrollTrigger.create({
          trigger: steps[0],
          endTrigger: steps[steps.length - 1],
          start: "top 56%",
          end: "bottom 44%",
          onUpdate: () => {
            const focusLine = window.innerHeight * 0.56;
            const closestIndex = steps.reduce(
              (closest, step, index) =>
                Math.abs(step.getBoundingClientRect().top - focusLine) <
                Math.abs(steps[closest].getBoundingClientRect().top - focusLine)
                  ? index
                  : closest,
              0,
            );
            activateStep(closestIndex);
          },
        });
      }

      const media = gsap.matchMedia();
      media.add("(min-width: 1201px)", () => {
        if (!sequence || !stage) return;
        ScrollTrigger.create({
          trigger: sequence,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          pinSpacing: false,
        });
      });
      media.add("(max-width: 720px)", () => {
        panels.forEach((panel, index) => gsap.set(panel, { autoAlpha: index === 0 ? 1 : 0, scale: 1 }));
        steps.forEach((step) => gsap.set(step, { opacity: 1 }));
      });

      gsap.fromTo("[data-compare-after]", { clipPath: "inset(0 100% 0 0)" }, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: { trigger: "[data-compare-story]", start: "top 76%", end: "70% 48%", scrub: 0.5 },
      });

      gsap.fromTo("[data-device-stage] > div", { y: 70, rotate: 0, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-device-stage]", start: "top 82%", toggleActions: "play none none reverse" },
      });

      gsap.fromTo("[data-final-art]", { y: 100, rotate: 13, autoAlpha: 0 }, {
        y: 0,
        rotate: 4,
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-final-art]", start: "top 88%", end: "bottom 58%", scrub: 0.6 },
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
