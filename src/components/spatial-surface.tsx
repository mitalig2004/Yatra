"use client";

import { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function SpatialSurface({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 24 });

  return (
    <motion.div
      className={`${className} spatial-surface`}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }
      }
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rawX.set(y * -3);
        rawY.set(x * 4);
        event.currentTarget.style.setProperty("--pointer-x", `${x * 18}px`);
        event.currentTarget.style.setProperty("--pointer-y", `${y * 14}px`);
      }}
      onPointerLeave={(event) => {
        rawX.set(0);
        rawY.set(0);
        event.currentTarget.style.setProperty("--pointer-x", "0px");
        event.currentTarget.style.setProperty("--pointer-y", "0px");
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  id?: string;
}) {
  const reduce = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  return (
    <Component
      id={id}
      className={className}
      initial={reduce ? false : { y: 50, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduce ? 0 : 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Component>
  );
}
