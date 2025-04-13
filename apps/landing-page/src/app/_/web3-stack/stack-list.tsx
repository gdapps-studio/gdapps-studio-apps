import Image from 'next/image';

type Web3Tech = {
  href: string;
  width: number;
  height: number;
  alt: string;
};

const web3Stack: Web3Tech[] = [
  { href: '/assets/tech-stack/wagmi.webp', width: 200, height: 46, alt: 'WAGMI logo' },
  { href: '/assets/tech-stack/tailwindcss.webp', width: 300, height: 65.45, alt: 'TailwindCSS logo' },
  { href: '/assets/tech-stack/infura.webp', width: 191, height: 39.15, alt: 'INFURA logo' },
  { href: '/assets/tech-stack/next.webp', width: 159.33, height: 96, alt: 'NEXT logo' },
  { href: '/assets/tech-stack/magic.webp', width: 162, height: 61, alt: 'Magic logo' },
  { href: '/assets/tech-stack/viem.webp', width: 103, height: 37.45, alt: 'Viem logo' },
  { href: '/assets/tech-stack/quicknode.webp', width: 64, height: 64, alt: 'Quicknode logo' },
  { href: '/assets/tech-stack/web3auth.webp', width: 247.5, height: 46.875, alt: 'Web3Auth logo' },
  { href: '/assets/tech-stack/torus.webp', width: 66, height: 66, alt: 'Torus logo' },
  { href: '/assets/tech-stack/privy.webp', width: 164, height: 51.61, alt: 'Privy logo' },
  { href: '/assets/tech-stack/rainbowkit.webp', width: 66, height: 66, alt: 'Rainbowkit logo' },
];

const stacks = Array.from({ length: 2 }).map((_, i) => i);

export const StackList = () => {
  return (
    <div className="relative carousel-wrapper overflow-hidden flex gap-x-16 mx-auto px-20 whitespace-nowrap">
      {stacks.map((i) => (
        <div className="carousel flex gap-x-16 items-center" key={i}>
          {web3Stack.map((tech, index) => (
            <div
              style={{
                width: tech.width,
                height: tech.height,
              }}
              className="flex items-center justify-center"
              key={index}
            >
              <Image loading='eager' src={tech.href} alt={tech.alt} width={tech.width} height={tech.height} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
