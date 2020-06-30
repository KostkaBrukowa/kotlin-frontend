import React, { useContext } from 'react';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import clsx from 'clsx';

import style from './OwsSection.module.less';
import { ActionType, ExpensesContext, OwsType } from './ExpensesContext';
import { currency } from '../utils/constants/currency';
import { AnimatedNumber } from '../utils/animations/AnimatedNumber';

export interface OwsSectionProps {
  amount: number | undefined;
  type: OwsType;
}

export const OwsSection: React.FC<OwsSectionProps> = ({ amount, type }) => {
  const {
    state: { currentOwsType },
    dispatch,
  } = useContext(ExpensesContext);
  const className = type === OwsType.OWS_USER ? style.owsUser : style.userOws;
  const title = type === OwsType.OWS_USER ? 'Inni wiszą tobie:' : 'Ty wisisz w sumie:';
  const icon = type === OwsType.OWS_USER ? <PlusCircleOutlined /> : <MinusCircleOutlined />;
  const active = currentOwsType === type;
  console.log('from section', currentOwsType);

  const handleClick = () => {
    dispatch({ type: ActionType.CHANGE_OWS_TYPE, payload: { currentOwsType: type } });
  };

  return (
    <div className={clsx(className, { [style.owsActive]: active })} onClick={handleClick}>
      {icon}
      <h4 className={style.owsTitle}>{title}</h4>
      <div className={style.currency}>
        <AnimatedNumber amount={amount} /> {currency}
      </div>
    </div>
  );
};
