import { animated, config, useSpring } from "@react-spring/web";
import { ComponentProps } from "react";

type NavLink = {
  id: string;
  name: string;
  href: string;
  title: string;
};

const navLinks: NavLink[] = [
  // { id: 'web3-stack', name: 'Tools', href: '#web3-stack', title: 'Tools' },
  {
    id: "how-we-work",
    name: "How We Operate",
    href: "#how-we-work",
    title: "How We Operate",
  },
  { id: "our-work", name: "Our Work", href: "#our-work", title: "Our Work" },
  { id: "team", name: "Team", href: "#team", title: "Team" },
  {
    id: "core-values",
    name: "Core Values",
    href: "#core-values",
    title: "Core Values",
  },
  { id: "q-and-a", name: "Q&A", href: "#faq", title: "Q&A" },
];

const Link = ({
  name,
  delay = 200,
  ...props
}: ComponentProps<"a"> & { name: string; delay?: number }) => {
  const aStyles = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay,
    config: config.wobbly,
  });
  return (
    // @ts-expect-error not sure why this is not working
    <animated.li style={aStyles} className="list-none">
      <a
        className={
          "transition duration-300 hover:font-bold hover:text-[#4ADE80] before:content-[attr(title)] before:block before:font-bold before:h-0 before:overflow-hidden before:invisibility whitespace-nowrap"
        }
        aria-label={name}
        {...props}
      >
        {name}
      </a>
    </animated.li>
  );
};

export const Links = () => {
  return (
    <nav className="hidden md:block">
      <ul className="md:flex space-x-6">
        {navLinks.map((link, index) => (
          <Link
            key={link.id}
            href={link.href}
            title={link.title}
            name={link.name}
            delay={100 * (index + 1)}
          />
        ))}
      </ul>
    </nav>
  );
};
