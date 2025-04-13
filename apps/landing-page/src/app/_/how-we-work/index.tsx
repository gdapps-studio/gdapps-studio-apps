import { SectionHeader } from '../../../components/section-header';
import { WorkItems } from './work-items';

export const HowWeWork = () => {
  return (
    <section id="how-we-work" className="py-16 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="How We Operate"
          description={
            <>
              Keeping clients informed ensures clarity, smoother collaboration, and more{' '}
              <span className="font-oxanium bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                successful project
              </span>{' '}
              outcomes.
            </>
          }
        />
        <WorkItems />
      </div>
    </section>
  );
};
