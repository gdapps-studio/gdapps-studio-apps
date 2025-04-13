import { Code, Paintbrush, Shield, UploadCloud, Users } from 'lucide-react';

export const workItems = Object.freeze([
  {
    icon: Users,
    title: 'Understanding the product and user base',
    description:
      "We start by understanding your product's vision, goals, and audience to ensure the front-end aligns with user needs and business objectives. This allows us to create an interface that enhances user experience and supports growth.",
  },
  {
    icon: Paintbrush,
    title: 'Handing over design',
    description:
      'We work closely with designers to translate the visuals into a functional interface. A detailed Software Requirements Specification (SRS) is created to clearly outline the project, ensuring all design details are captured for scalable implementation.',
  },
  {
    icon: Code,
    title: 'Implementation',
    description:
      'With the vision and SRS in place, we build the front-end interface, focusing on clean code, high performance, and scalability. We test along the way to ensure the interface aligns with the design and functions seamlessly in the Web3 ecosystem.',
  },
  {
    icon: Shield,
    title: 'Testing',
    description:
      'Once built, the interface undergoes rigorous testing for functionality, responsiveness, and compatibility across devices. We address any issues to ensure an optimized, smooth user experience before deployment.',
  },
  {
    icon: UploadCloud,
    title: 'Deployment + Sign Off',
    description:
      'After final testing, we deploy the front-end, ensuring everything works perfectly in the live environment. We provide documentation and post-launch support to ensure a smooth transition and future scalability.',
  },
]);
