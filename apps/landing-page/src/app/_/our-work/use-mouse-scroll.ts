import { RefObject, useEffect } from "react";

export const useMouseScroll = (
  scrollContainerRef: RefObject<HTMLDivElement | null>
) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 0.5; // slow down the scroll speed
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const handleResize = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      if (window.innerWidth >= 1024) {
        container.addEventListener("mousedown", handleMouseDown as any);
      } else {
        container.removeEventListener("mousedown", handleMouseDown as any);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      const container = scrollContainerRef.current;
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown as any);
      }
    };
  }, []);

  return { handleMouseDown };
};
