import React from "react";
import Image from "next/image";
import { GDAPPS_URL } from "../_utils/constants";
import gdappsLogo from "@gdapps-studio/assets/images/gdapps-logo-small.png";

const GDappsLogo = () => (
  <div className="flex items-center gap-1.5">
    <Image
      src={gdappsLogo}
      width={26}
      draggable="false"
      height={26}
      alt="GDapps Logo"
    />
  </div>
);

export const WhitelistGeneratorHeader = () => (
  <header className="flex flex-col items-center gap-y-5">
    <h1 className="text-4xl font-bold text-center">
      Merkle Tree Generator for Whitelist
    </h1>
    <div className="flex items-center gap-3">
      <span>Powered by</span>
      <a
        className="cursor-pointer"
        href={GDAPPS_URL}
        target="_blank"
        rel="noreferrer"
      >
        <GDappsLogo />
      </a>
    </div>
  </header>
);
