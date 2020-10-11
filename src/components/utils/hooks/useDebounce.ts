import { useEffect, useState } from 'react';

export const useDebounce = <T>(handler: (value: T | undefined) => void, timeout: number) => {
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  const handleChange = (value: T | undefined) => {
    setTimeoutId(
      window.setTimeout(() => {
        handler(value);
      }, timeout),
    );
  };

  useEffect(
    () => () => {
      window.clearTimeout(timeoutId);
    },
    [timeoutId],
  );

  return handleChange;
};
