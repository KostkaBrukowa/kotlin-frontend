import { useEffect, useRef, useState } from 'react';

interface UseDelayedLoadingProps {
  loading: boolean;
}

const LOADING_DELAY = 650;

export const useDelayedLoading = (props: UseDelayedLoadingProps) => {
  const { loading } = props;
  const timeoutRef = useRef<number | undefined>(undefined);
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    if (!delayedLoading && loading) {
      timeoutRef.current = (setTimeout(
        () => setDelayedLoading(true),
        LOADING_DELAY,
      ) as unknown) as number;
    } else {
      setDelayedLoading(false);
      clearTimeout(timeoutRef.current);
    }
  }, [loading]);

  return delayedLoading;
};
