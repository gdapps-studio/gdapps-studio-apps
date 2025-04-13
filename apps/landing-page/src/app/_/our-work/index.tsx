import { SectionHeader } from '@/components/section-header';

import { WorkCards } from './work-cards';

const SectionHeaderDescription = () => (
  <>
    Our proven track record demonstrates the trust clients place in us. With completed projects across the industry, we
    showcase our experience and commitment to{' '}
    <span className="font-oxanium bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
      High-quality
    </span>{' '}
    results.
  </>
);

export const OurWork = () => (
  <section id="our-work" className="bg-black text-white py-32 px-4 md:px-8">
    <div className="mx-auto">
      <SectionHeader title="Our Clients" description={<SectionHeaderDescription />} />
      <WorkCards />
    </div>
  </section>
);
