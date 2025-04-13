import Image from "next/image";

import linkedIn from "@gdapps-studio/assets/svgs/linkedin.svg";
import telegram from "@gdapps-studio/assets/svgs/telegram.svg";
import twitterX from "@gdapps-studio/assets/svgs/twitter-x.svg";
import { Logo2X } from "./logo";

const socialLinks = [
  {
    href: "https://x.com/GdappsStudio",
    src: twitterX,
    alt: "Twitter",
  },
  {
    href: "https://www.linkedin.com/company/gdapps-studio/",
    src: linkedIn,
    alt: "LinkedIn",
  },
  {
    href: "https://t.me/gdappsstudio",
    src: telegram,
    alt: "Telegram",
  },
];
const Socials = () => (
  <div className="flex space-x-4">
    {socialLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transform transition-transform hover:scale-105"
      >
        <Image src={link.src} alt={link.alt} width={24} height={24} />
      </a>
    ))}
  </div>
);

const Services = () => (
  <div className="mb-4 md:mb-0">
    <h4 className="font-bold mb-2">Services</h4>
    <ul className="text-gray-400">
      <li>Smart Contract Integrations</li>
      <li>Wallet Integrations</li>
      <li>API Integrations</li>
      <li>UI/UX Implementation</li>
      <li>Testing</li>
      <li>Telegram Bot Development</li>
    </ul>
  </div>
);

const Contact = () => (
  <div>
    <h4 className="font-bold mb-2">Contact</h4>
    <a href="mailto:giorgi@gdapps.studio" className="text-gray-400 underline">
      giorgi@gdapps.studio
    </a>
  </div>
);

export const Footer = () => (
  <footer className="bg-black text-white py-8 px-4 md:px-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Logo2X />
        </div>

        <Socials />
      </div>
      <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between">
        <Services />
        <Contact />
      </div>
      <div className="mt-8 text-center text-gray-400">
        <p>&copy; 2024 GDapps Studio. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
