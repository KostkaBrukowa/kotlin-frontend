import { RefObject, useEffect } from 'react';

interface UseOutsideClickProps {
  wrapperRef: RefObject<unknown>;

  onClick(event: MouseEvent): void;
}

export const useOutsideClick = ({ onClick, wrapperRef }: UseOutsideClickProps) => {
  useEffect(() => {
    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [wrapperRef, onClick]);
};
