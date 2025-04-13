import { Banner } from './banner';
import { ConsultationButton } from './consultation-button';
import { CoolThreeJSGeometricFigure } from './cool-three-js-geometric-figure';
import { Description, Subtitle, Title } from './titles';
import { TrustedBy } from './trusted-by';

export const Hero = () => {
  return (
    <section id="hero" className="container mx-auto space-y-10 flex flex-col justify-center py-24 md:py-0 md:h-dvh">
      <div className="flex flex-col-reverse md:flex-row md:gap-x-20 items-center">
        <div className="w-full md:flex-1 relative">
          <CoolThreeJSGeometricFigure />
          <Banner />
        </div>
        <div className="md:flex-1 space-y-8">
          <Subtitle />
          <Title />
          <Description />

          <div className="hidden md:block">
            <ConsultationButton className="min-w-[200px]" size={'lg'} />
          </div>

          <div className="md:hidden">
            <TrustedBy />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <TrustedBy />
      </div>
    </section>
  );
};
