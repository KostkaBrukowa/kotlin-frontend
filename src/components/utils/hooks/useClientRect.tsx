import { Ref, useCallback, useState } from 'react';

export type RefCallback = (node: HTMLDivElement) => void;

export function useClientRect(): [DOMRect | null, RefCallback] {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}
