import { useEffect, useRef, useState } from 'react';

interface UseDelayedLoadingProps {
  loading: boolean;
  loadingDelay?: number;
}

const DEFAULT_LOADING_DELAY = 650;

export const useDelayedLoading = (props: UseDelayedLoadingProps) => {
  const { loading, loadingDelay } = props;
  const timeoutRef = useRef<number | undefined>(undefined);
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    if (!delayedLoading && loading) {
      timeoutRef.current = (setTimeout(
        () => setDelayedLoading(true),
        loadingDelay || DEFAULT_LOADING_DELAY,
      ) as unknown) as number;
    } else {
      setDelayedLoading(false);
      clearTimeout(timeoutRef.current);
    }
  }, [loading]);

  return delayedLoading;
};
