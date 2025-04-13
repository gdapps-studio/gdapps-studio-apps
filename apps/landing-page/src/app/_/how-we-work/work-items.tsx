"use client";

import { Card } from "@gdapps-studio/ui/card";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

import { workItems } from "./constants";

type WorkItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

const WorkItem = ({ item, delay }: { item: WorkItemProps; delay: number }) => {
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
    <animated.div ref={ref} style={fadeIn} className="flex gap-4">
      <Card className="p-5">
        <div className="flex-shrink-0 mt-1">
          <div className="bg-primary p-2 mr-5 mb-3 rounded float-left">
            <item.icon className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
        <p className="leading-7 text-gray-300">{item.description}</p>
      </Card>
    </animated.div>
  );
};

export const WorkItems = () => (
  <div className="grid md:grid-cols-2 gap-8">
    {workItems.map((item, index) => (
      <WorkItem key={index} item={item} delay={index * 50} />
    ))}
  </div>
);
