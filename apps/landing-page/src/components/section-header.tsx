import { JSX } from "react";

interface TitlesProps {
  title: string;
  subtitle?: string;
  description?: string | JSX.Element;
}

export const SectionHeader = ({
  title,
  subtitle,
  description,
}: TitlesProps) => (
  <div className="text-center mb-16">
    {subtitle && <h5 className="text-sm uppercase mb-2">{subtitle}</h5>}
    <h2 className="text-2xl md:text-4xl font-bold mb-8">{title}</h2>

    {description && (
      <p className="text-2xl md:text-3xl mx-auto max-w-4xl">{description}</p>
    )}
  </div>
);
