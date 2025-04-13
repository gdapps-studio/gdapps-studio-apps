import { Feature } from "./types";
import { Lightbulb, Gauge, Eye } from "lucide-react";

export const features: Feature[] = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description:
        'We continuously explore the latest in Web3 and front-end technology to deliver cutting-edge solutions.',
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: 'Performance',
      description:
        'Optimized performance is at the heart of our work, ensuring smooth, fast, and secure Web3 experiences.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Transparency',
      description:
        'We believe in maintaining clear communication and openness with our clients throughout the development process.',
    },
  ];