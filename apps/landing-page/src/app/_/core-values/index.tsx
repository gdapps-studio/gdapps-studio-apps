'use client';

import { SectionHeader } from '@/components/section-header';

import { CoreValues } from './core-values';

export const CoreValuesSection = () => {
  return (
    <section id="core-values" className="container mx-auto bg-black text-white py-16 md:py-32 px-4 md:px-8">
      <div className="mx-auto">
        <div className="mb-16">
          <SectionHeader
            title="Our Core Values"
            description={
              <>
                We explore{' '}
                <span className="font-oxanium bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Web3 technology
                </span>
                , prioritize performance, and ensure transparency with clients throughout the development process. Our
                commitment to excellence drives us forward.
              </>
            }
          />
        </div>

        <CoreValues />
      </div>
    </section>
  );
};
