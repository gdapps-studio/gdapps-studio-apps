"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gdapps-studio/ui/accordion";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const listOfTechStackWithLinks = [
  {
    name: "Next.js",
    href: "https://nextjs.org/",
  },
  {
    name: "Wagmi",
    href: "https://wagmi.sh/",
  },
  {
    name: "RainbowKit",
    href: "https://www.rainbowkit.com/",
  },
  {
    name: "Privy",
    href: "https://www.privy.io/",
  },
  {
    name: "Torus",
    href: "https://tor.us/",
  },
  {
    name: "Web3Auth",
    href: "https://web3auth.io/",
  },
  {
    name: "Infura",
    href: "https://infura.io/",
  },
  {
    name: "QuickNode",
    href: "https://www.quicknode.com/",
  },
  {
    name: "Magic",
    href: "https://magic.link/",
  },
  {
    name: "Viem",
    href: "https://viem.sh/",
  },
];

const faqItems = [
  {
    value: "item-1",
    question: "How does your pricing structure work?",
    answer:
      "The pricing structure depends on the nature of our collaboration. If we are engaging in a long-term partnership, we can consider a monthly retainer. Alternatively, we can work on a project-based or hourly-based model. I also take into account factors such as the number of pages, the complexity of each page, API interactions, smart contract integrations, and API documentation. This ensures that the pricing is fair, and both parties achieve the desired outcome.",
  },
  {
    value: "item-2",
    question: "How long have you been around?",
    answer: (
      <p>
        We have been developing digital products for over eight years, with
        nearly four years of experience in the Web3 space. During this time, we
        have successfully delivered numerous projects, each tailored to meet the
        specific needs of the clients. Additionally, you can check out the
        profile of our founder on LinkedIn{" "}
        <a
          href="https://www.linkedin.com/in/giorgi-sharashenidze-3bb9311a0/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    ),
  },
  {
    value: "item-3",
    question: "Can you show me some of your work?",
    answer: (
      <p>
        Yes, you can view our portfolio on the GDapps Studio website. Click here{" "}
        <a href="#our-work" className="underline">
          here
        </a>
        .
      </p>
    ),
  },
  {
    value: "item-4",
    question: "What tech stack do you use?",
    answer: (
      <div>
        We work with a wide range of technologies, including{" "}
        {listOfTechStackWithLinks.map((item, index) => (
          <div className="inline" key={index}>
            <a
              href={item.href}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
            {index < listOfTechStackWithLinks.length - 1 && ", "}
          </div>
        ))}{" "}
        and many more. However, we are not limited to these tools and are
        flexible in selecting the best technologies that align with your project
        requirements, ensuring optimal performance and scalability.
      </div>
    ),
  },
];

export const QAndASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    delay: 150,
  });
  return (
    // @ts-expect-error not sure why this is not working
    <animated.section
      id="faq"
      className="container mx-auto py-16 md:py-32 px-4 md:px-8"
      ref={ref}
      style={fadeIn}
    >
      <div className="mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </animated.section>
  );
};
