import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ScrollButtons = ({ onLeftClick, onRightClick }: { onLeftClick: () => void; onRightClick: () => void }) => (
  <div className="md:hidden">
    <button
      id="scroll-left-button"
      onClick={onLeftClick}
      className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-white/10 p-2 rounded-full"
      aria-label="Scroll left"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <button
      id="scroll-right-button"
      onClick={onRightClick}
      className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-white/10 p-2 rounded-full"
      aria-label="Scroll right"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>
);
