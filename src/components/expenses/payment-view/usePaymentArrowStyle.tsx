import { useMemo } from 'react';
import { useClientRect } from '../../utils/hooks/useClientRect';

const iconSize = 75;

const calculateArrowPosition = (fromRect: DOMRect | null, toRect: DOMRect | null) => {
  if (!fromRect || !toRect) return { top: 0, scale: 2 };

  const distance = toRect.y + toRect.height / 1.5 - (fromRect.y + fromRect.height / 2);
  const scale = distance / iconSize;

  const top = fromRect.height / 2 + (scale * iconSize) / 2 - iconSize / 2;

  return { top, scale };
};

export const usePaymentArrowStyle = () => {
  const [payerNameRect, payerNameRectRef] = useClientRect();
  const [receiverNameRect, receiverNameRectRef] = useClientRect();
  const { scale, top } = useMemo(() => calculateArrowPosition(payerNameRect, receiverNameRect), [
    payerNameRect,
    receiverNameRect,
  ]);

  return {
    payerNameRectRef,
    receiverNameRectRef,
    style: {
      marginTop: `${top}px`,
      transform: `scale(-1, ${scale}) rotate(0.25turn)`,
    },
  };
};
