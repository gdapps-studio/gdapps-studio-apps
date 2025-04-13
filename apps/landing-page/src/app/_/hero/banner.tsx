"use client";

import { animated, config, useSpring } from "@react-spring/web";

export const Banner = () => {
  const bannerAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.wobbly,
  });

  return (
    // @ts-expect-error not sure why this is not working
    <animated.div
      style={bannerAnimation}
      className="absolute bottom-10 left-0 bg-zinc-950 text-white border-2 border-emerald-400 rounded-2xl font-semibold px-6 py-4 shadow-lg max-w-[300px]"
    >
      Work with us for better results in less time to unleash your full
      potential quick
    </animated.div>
  );
};
