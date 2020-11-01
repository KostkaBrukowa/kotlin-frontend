import { useMediaQuery } from 'react-responsive';

export const useListGridProps = () => {
  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 520 });
  const isTablet = useMediaQuery({ minWidth: 521, maxWidth: 1248 });
  const isDesktop = useMediaQuery({ minWidth: 1248 });

  if (isTablet) return { gutter: 16, column: 2 };

  if (isDesktop) return { gutter: 16, column: 3 };

  return undefined;
};
