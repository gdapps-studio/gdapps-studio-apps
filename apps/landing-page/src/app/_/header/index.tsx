"use client";

import { animated, config, useSpring } from "@react-spring/web";
import clsx from "clsx";

import { ConsultationButton } from "../hero/consultation-button";
import { Logo } from "../logo";
import { Links } from "./links";
import { useIsHeaderVisible } from "./use-is-header-visible";
import Image from "next/image";

export const Header = () => {
  const { isHeaderVisible, pagePosition } = useIsHeaderVisible();
  const logoAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.wobbly,
  });

  return (
    <header
      className={clsx(
        "fixed w-full py-2 px-4 md:py-4 top-0 z-40 transition-transform duration-300 ease-in-out",
        {
          "-translate-y-24": !isHeaderVisible && pagePosition > 0,
          "bg-background": isHeaderVisible && pagePosition > 0,
          "translate-y-0": isHeaderVisible,
        },
      )}
    >
      <nav className="container mx-auto flex items-center justify-between gap-10 py-1.5 sm:py-5 md:py-6">
        {/* @ts-expect-error not sure why this is not working */}
        <animated.div className="flex-1" style={logoAnimation}>
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="relative size-10 block md:hidden">
            <Image src={"/assets/gdapps-logo.svg"} fill alt="Mobile logo" />
          </div>
        </animated.div>

        <Links />
        <div className="block md:hidden">
          <ConsultationButton />
        </div>
      </nav>
    </header>
  );
};
