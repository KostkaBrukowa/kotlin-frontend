import React, { useState } from 'react';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import style from './TotalBalance.module.less';
import { OwsSection, OwsType } from './OwsSection';

export interface TotalBalanceProps {}

export const TotalBalance: React.FC<TotalBalanceProps> = (props) => {
  const [activeOwsSection, setActiveOwsSection] = useState<OwsType | null>(null);

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>Calkowity bilans: 0 zl</h3>

      <OwsSection
        activeOwsSection={activeOwsSection}
        amount={12.33}
        type={OwsType.USER_OWS}
        onClick={setActiveOwsSection}
      />
      <OwsSection
        activeOwsSection={activeOwsSection}
        amount={15.33}
        type={OwsType.OWS_USER}
        onClick={setActiveOwsSection}
      />
    </div>
  );
};
