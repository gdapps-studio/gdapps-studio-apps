"use client";

import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

import { type WorkCard as IWorkCard, workCards } from "./cards";
import "./no-scrollbar.css";
import { ScrollButtons } from "./scroll-buttons";
import { useMouseScroll } from "./use-mouse-scroll";
import { WorkShadows } from "./work-shadows";

const IsRecentBanner = ({ isRecent }: { isRecent?: boolean }) => (
  <div
    className={clsx(
      "absolute -left-10 top-10 text-xl -rotate-45  font-bold uppercase",
      {
        "bg-emerald-600 px-14": isRecent,
        "bg-purple-700 px-14": !isRecent,
      }
    )}
  >
    {isRecent ? "Recent" : "Current"}
  </div>
);

const WorkCardBgImage = (props: { backgroundImage: string }) => (
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
);

const WorkCardBlackTransparentGradient = () => (
  <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black to-transparent rounded-b-lg"></div>
);

const WorkCardTitleDescription = (props: {
  title: string;
  subtitle: string;
  description: string;
}) => (
  <div className="relative z-10 select-none">
    <h5 className="text-sm font-semibold mb-2">{props.title}</h5>
    <h4 className="text-2xl font-bold mb-4">{props.subtitle}</h4>
    <p className="text-sm">{props.description}</p>
  </div>
);

const WorkCardTopRightCornerLink = (props: { href: string; title: string }) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded"
    aria-label={`Learn more about ${props.title}`}
  >
    <ChevronRight className="w-6 h-6 -rotate-45" />
  </a>
);

const WorkCard = ({ card, delay }: { card: IWorkCard; delay: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: { duration: 250 },
    delay,
  });
  return (
    // @ts-expect-error not sure why this is not working
    <animated.div
      ref={ref}
      style={fadeIn}
      className={clsx(
        `flex-shrink-0 overflow-hidden flex flex-col justify-end w-full bg-gray-900 border-4 rounded-lg p-6 relative`,
        {
          "h-[400px] md:h-[420px] md:w-[400px]":
            card.isCurrent || card.isRecent,
          "border-emerald-600": card.isRecent,
          "border-purple-700": card.isCurrent,
          "border-emerald-600/50 h-[400px] md:w-[390px]":
            !card.isRecent && !card.isCurrent,
        }
      )}
    >
      {card.isRecent ? <IsRecentBanner isRecent /> : null}
      {card.isCurrent ? <IsRecentBanner isRecent={false} /> : null}
      <WorkCardBgImage backgroundImage={card.backgroundImage} />
      <WorkCardBlackTransparentGradient />
      <WorkCardTitleDescription
        title={card.title}
        subtitle={card.subtitle}
        description={card.description}
      />
      <WorkCardTopRightCornerLink href={card.href} title={card.title} />
    </animated.div>
  );
};

export const WorkCards = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useMouseScroll(scrollContainerRef);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar px-5 md:px-20 cursor-grab"
        ref={scrollContainerRef}
      >
        {workCards.map((card, index) => (
          <WorkCard key={index} card={card} delay={index * 50} />
        ))}
      </div>
      <WorkShadows />
      <ScrollButtons onLeftClick={scrollLeft} onRightClick={scrollRight} />
    </div>
  );
};
