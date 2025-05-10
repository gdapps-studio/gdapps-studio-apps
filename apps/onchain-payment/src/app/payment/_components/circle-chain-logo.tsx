import { ChainUnion } from "@/constants";
import Image from "next/image";
import { chainToImageSrc } from "@/constants";

const IMAGE_SIZE = 16;
export const CircleChainLogo = ({
  chain,
  size = IMAGE_SIZE,
}: {
  chain: ChainUnion;
  size?: number;
}) => (
  <div
    style={{
      width: size + 4,
      height: size + 4,
    }}
    className="flex justify-center items-center bg-white rounded-full"
  >
    <Image
      src={chainToImageSrc[chain]}
      alt={`${chain} Logo`}
      width={size}
      height={size}
    />
  </div>
);
