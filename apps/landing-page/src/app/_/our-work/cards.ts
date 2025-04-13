export interface WorkCard {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  backgroundImage: string;
  priority: number;
  isRecent?: boolean;
  isCurrent?: boolean;
}

export const workCards: WorkCard[] = [
  {
    title: 'Infrared Finance',
    subtitle: 'Proof of Liquidity in one click',
    description:
      'Infrared simplifies interacting with Proof of Liquidity with our liquid staking products iBGT and iBERA.',
    href: 'https://infrared.finance/',
    backgroundImage: '/assets/work-cards/infrared-work-card.webp',
    priority: 100,
    isRecent: true,
  },
  {
    title: 'BIO protocol',
    subtitle: 'Your Gateway Drug to Decentralized Science',
    description:
      'The BIO protocol is DeSci’s new financial layer, engineered to commercialize the best science, faster.',
    href: 'https://app.bio.xyz/dashboard',
    backgroundImage: '/assets/work-cards/bio-protocol-work-card.webp',
    priority: 130,
    isCurrent: true,
  },
  {
    title: 'Fantium',
    subtitle: 'Invest in athletes',
    description:
      'Invest in athletes or teams with just a few clicks, become part of their community, and own a share of their future success.',
    href: 'https://www.fantium.com/',
    backgroundImage: '/assets/work-cards/fantium-work-card.webp',
    priority: 65,
  },
  {
    title: 'Fractality',
    subtitle: 'Your Gateway to Superior Yields',
    description: 'Maximize returns using our cutting-edge DeFi strategies and tools.',
    href: 'https://beta.fractality.xyz/',
    backgroundImage: '/assets/work-cards/fractility-work-card.webp',
    priority: 70,
  },
  {
    title: 'JuicyPerp',
    subtitle: 'JuicyPerp - Gamified Options Trading',
    description: 'JuicyPerp is your hub for gamified options trading on meme coins and exotic digital assets.',
    href: 'https://app.juicyperp.xyz/leaderboard',
    backgroundImage: '/assets/work-cards/juicyperp-work-card.webp',
    priority: 4,
  },
  {
    title: 'Y2K',
    subtitle: 'Hedge and speculate on pegged assets',
    description: 'Y2K Finance offers structured products for hedging or speculating on the risk of pegged assets.',
    href: 'https://www.y2k.finance/',
    backgroundImage: '/assets/work-cards/y2k-work-card.webp',
    priority: 60,
  },
  {
    title: 'Bluey',
    subtitle: 'Sui Telegram Trading Bot',
    description: 'Bluey telegram bot enable users to trade tokens on sui network and place orders.',
    href: 'https://drive.google.com/file/d/1tMw-GEUZA4I7s3U9laeYqO3DiTOwgYdz/view',
    backgroundImage: '/assets/work-cards/bluey-work-card.webp',
    priority: 2,
  },
];

workCards.sort((a, b) => b.priority - a.priority);
