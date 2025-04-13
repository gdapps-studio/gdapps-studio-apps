"use client";

import { SectionHeader } from "@/components/section-header";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

import { TeamCards } from "./team-cards";

const SectionHeaderDescription = () => (
  <>
    Meet the talented individuals behind GDapps Studio. Our team combines
    expertise in Web3 development, UI/UX design, and blockchain technology to
    deliver exceptional results.
  </>
);

export const TeamSection = () => {
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
      id="team"
      className="container overflow-hidden mx-auto px-4 py-16 md:py-32"
      style={fadeIn}
      ref={ref}
    >
      <SectionHeader
        title="Our Team"
        description={<SectionHeaderDescription />}
      />
      <TeamCards />
    </animated.section>
  );
};
