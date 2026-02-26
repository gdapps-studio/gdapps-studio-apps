"use client";

import { animated, config, useSpring } from "@react-spring/web";
import Image from "next/image";
import { ComponentProps } from "react";

const ExternalLink = (props: ComponentProps<"a">) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="transition-transform transform hover:scale-110"
    {...props}
  />
);

const logos = [
  {
    href: "https://infrared.finance",
    src: "/assets/infrared.png",
    alt: "Infrared Finance Logo",
    width: 36,
    height: 36,
  },
  {
    href: "https://www.fantium.com/",
    src: "/assets/fantium.png",
    alt: "Fantium Logo",
    width: 164,
    height: 37,
  },
  {
    href: "https://beta.fractality.xyz/",
    src: "/assets/fractility.png",
    alt: "Fractility Logo",
    width: 40,
    height: 34,
  },
];

export const TrustedBy = () => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.wobbly,
  });

  return (
    <animated.div
      style={animationProps}
      // @ts-expect-error not sure why it complains
      className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
    >
      <span className="font-bold text-gray-400 text-xl md:text-2xl">
        Trusted by leading Platforms
      </span>

      <div className="flex items-center gap-6">
        {logos.map((logo, index) => (
          <ExternalLink key={index} href={logo.href}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </ExternalLink>
        ))}
      </div>
    </animated.div>
  );
};
