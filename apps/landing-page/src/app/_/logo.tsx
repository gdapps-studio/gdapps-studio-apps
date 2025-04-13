import logoMediumDark from "~@gdapps-studio/assets/svgs/logo-text-dark.svg";
import Image from "next/image";

export const Logo = ({ width = 168, height = 27.375 }) => (
  <div className="flex items-center no-draggable">
    <Image
      src={logoMediumDark}
      width={width}
      draggable="false"
      height={height}
      alt="GDapps Logo Medium Dark"
    />
  </div>
);

export const Logo2X = () => (
  <div className="flex items-center no-draggable">
    <Image
      src={logoMediumDark}
      width={336}
      draggable="false"
      height={54.75}
      alt="GDapps Logo Medium Dark"
    />
  </div>
);
