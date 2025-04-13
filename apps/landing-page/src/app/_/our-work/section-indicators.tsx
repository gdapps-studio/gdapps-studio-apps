export const SectionIndicators = () => (
  <div className="flex justify-center gap-2 mt-4">
    {[...Array({ length: 6 })].map((_, i) => (
      <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-gray-500'}`} />
    ))}
  </div>
);
