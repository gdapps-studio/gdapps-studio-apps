"use client";

import { SectionHeader } from "@/components/section-header";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

import "./index.css";
import { StackList } from "./stack-list";

export const Web3Stack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    delay: 150,
  });

  return (
    // @ts-expect-error not sure why this is not working
    <animated.section
      id="tools"
      className="container overflow-hidden mx-auto px-4 py-16 md:py-32"
      style={fadeIn}
      ref={ref}
    >
      <SectionHeader title="Tools We Utilise" />
      <StackList />
    </animated.section>
  );
};
