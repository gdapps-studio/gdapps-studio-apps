"use client";

import { animated, config, useSpring } from "@react-spring/web";

export const Subtitle = () => (
  <h3 className="text-lg md:text-xl font-bold">From vision to reality.</h3>
);

export const Title = () => {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.wobbly,
  });

  return (
    // @ts-expect-error not sure why this is not working
    <animated.div style={titleAnimation}>
      <h1 className="text-4xl md:text-6xl font-bold">
        Building the Future <br /> of{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          Web3 Interfaces
        </span>
      </h1>
    </animated.div>
  );
};
export const Description = () => (
  <p>
    <span className="block font-bold text-white">
      We are your Web3 interface experts.
    </span>
    We build scalable, modern Web3 front-end interfaces using Next.js, Wagmi,
    and RainbowKit, focusing on performance.
  </p>
);
