import React, { useCallback, useMemo, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { AiOutlineCalendar, GiArrowDunk } from 'react-icons/all';
import clsx from 'clsx';
import { Button, PageHeader, Statistic } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { useSinglePayment } from './useSinglePaymentQuery';
import style from './PaymentView.module.less';
import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { capitalize } from '../../utils/functions/string';
import { currency } from '../../utils/constants/currency';
import { expensesRoute, paymentsRoute } from '../../navigation/routerConstants';

const dateInfoClassName = clsx(style.infoSection, style.dateSection);
const iconSize = 75;

const calculateArrowPosition = (
  fromRect: DOMRect | null,
  toRect: DOMRect | null,
  topOffset = 0,
) => {
  if (!fromRect || !toRect) return { top: 0, scale: 2 };

  const distance = toRect.y + toRect.height / 1.5 - (fromRect.y + fromRect.height / 2);
  const scale = distance / iconSize;

  const top = fromRect.height / 2 + (scale * iconSize) / 2 - iconSize / 2;

  return { top, scale };
};

interface RouteParams {
  paymentId?: string;
}

function useClientRect(): [DOMRect | null, (node: HTMLDivElement) => void] {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

export type PaymentViewProps = RouteComponentProps<RouteParams>;

export const PaymentView: React.FC<PaymentViewProps> = ({ paymentId }) => {
  const { dataComponent, extractedData: payment } = useSinglePayment(paymentId);
  const [payerNameRect, payerNameRectRef] = useClientRect();
  const [receiverNameRect, receiverNameRectRef] = useClientRect();
  const { scale, top } = useMemo(() => calculateArrowPosition(payerNameRect, receiverNameRect), [
    payerNameRect,
    receiverNameRect,
  ]);

  if (dataComponent !== null || !payment) return dataComponent ?? null;

  return (
    <>
      <PageHeader
        className={style.pageHeader}
        subTitle={`Z: ${payment.paymentExpense.name}`}
        title="Płatność"
        onBack={() => navigate(`${expensesRoute}/${payment?.paymentExpense.id}`)}
      />
      <div className={style.wrapper}>
        <GiArrowDunk
          className={style.icon}
          style={{
            marginTop: `${top}px`,
            transform: `scale(-1, ${scale}) rotate(0.25turn)`,
          }}
        />
        <div className={style.infoWrapper}>
          <div className={style.infoSection} ref={payerNameRectRef}>
            <Statistic title="Płaci:" value={capitalize(payment.paymentPayer.name)} />
          </div>
          <div className={style.infoSection} ref={receiverNameRectRef}>
            <Statistic
              title="Obiorca:"
              value={capitalize(payment.paymentExpense.expensePayer.name)}
            />
          </div>
          <div className={style.infoSection}>
            <Statistic suffix={currency} title="Kwota:" value={payment.amount || '0'} />
          </div>
          <div className={style.infoSection}>
            <Statistic title="Status:" value={renderPaymentStatus(payment.status)} />
          </div>
          <div className={dateInfoClassName}>
            <div className={style.dateWrapper}>
              <AiOutlineCalendar className={style.calendarIcon} />
              Data wystawienia:
              <br /> 20.01.2020
            </div>
            <div className={style.dateWrapper}>
              <AiOutlineCalendar className={style.calendarIcon} />
              Data zapłaty: <br />
              Nie zapłacone
            </div>
          </div>
        </div>
      </div>
      <div className={style.buttonWrapper}>
        <Button
          className={style.payButton}
          size="large"
          type="primary"
          onClick={() => navigate(`${paymentsRoute}/${payment.id}/pay`)}
        >
          Zapłać
        </Button>
      </div>
    </>
  );
};
