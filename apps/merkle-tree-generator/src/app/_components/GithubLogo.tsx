import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import githubLogo from "@gdapps-studio/assets/svgs/github.svg";
export const GithubLogo = ({
  target,
  ...props
}: ComponentPropsWithoutRef<"a">) => (
  <a {...props} className="rounded-full bg-white p-0.5" target="_blank">
    <Image width={24} height={24} src={githubLogo} alt="Github icon" />
  </a>
);
