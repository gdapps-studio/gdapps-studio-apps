import { PageLayout } from '@/components/page-layout';

import { CoreValuesSection } from './_/core-values';
import { Hero } from './_/hero';
import { HowWeWork } from './_/how-we-work';
import { OurWork } from './_/our-work';
import { QAndASection } from './_/q-and-a';
import { TeamSection } from './_/team';
import { Web3Stack } from './_/web3-stack';

export default function Page() {
  return (
    <PageLayout>
      <Hero />
      <Web3Stack />
      <HowWeWork />
      <OurWork />
      <TeamSection />
      <CoreValuesSection />
      <QAndASection />
    </PageLayout>
  );
}
