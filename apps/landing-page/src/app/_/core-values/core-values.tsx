import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gdapps-studio/ui/card";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

import { features } from "./constants";
import { Feature } from "./types";

interface CoreValueCardProps {
  feature: Feature;
  accent?: boolean;
  delay?: number;
}

const CoreValueCard: React.FC<CoreValueCardProps> = ({
  feature,
  accent = false,
  delay = 0,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    delay,
  });

  return (
    // @ts-expect-error not sure why this is not working
    <animated.div ref={ref} style={fadeIn}>
      <Card className={"flex-1 px-6 text-white min-h-full"}>
        <CardHeader>
          <div className="bg-primary max-w-max p-2 rounded mb-4">
            {feature.icon}
          </div>
          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-lg ${accent ? "text-white" : "text-white"}`}>
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </animated.div>
  );
};

export const CoreValues = () => (
  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
    {features.map((feature, index) => (
      <CoreValueCard key={index} feature={feature} delay={index * 100} />
    ))}
  </div>
);
