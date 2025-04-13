"use client";

import { Button } from "@gdapps-studio/ui/button";
import { animated, config, useSpring } from "@react-spring/web";
import clsx from "clsx";

const date = new Date();
const CAL_BASE_URL = "https://cal.com/gdapps-studio";
const calLink = `${CAL_BASE_URL}/30min?month=${date.getFullYear()}-${date.getUTCMonth() + 1}`;

export const ConsultationButton = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.wobbly,
  });
  return (
    // @ts-expect-error not sure why this is not working
    <animated.div style={buttonAnimation}>
      <a
        className="block"
        href={calLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className={clsx(`hover:scale-105 transition-transform ${className}`)}
          size={"lg"}
          {...props}
        >
          Get Free Consulting
        </Button>
      </a>
    </animated.div>
  );
};
