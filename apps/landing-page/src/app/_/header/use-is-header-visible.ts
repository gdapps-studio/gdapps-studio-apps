'use client';

import { useEffect, useState } from 'react';

export const useIsHeaderVisible = () => {
  const [pagePosition, setPagePosition] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;

      setIsHeaderVisible(pagePosition > moving);
      setPagePosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return { isHeaderVisible, pagePosition };
};
