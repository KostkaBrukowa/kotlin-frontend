import React from 'react';
import { Card, Skeleton } from 'antd';

import style from './ExpenseList.module.less';

interface LoadingCardProps {
  cardsCount?: number;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ cardsCount }) => (
  <>
    {Array.from({ length: cardsCount ?? 1 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Card className={style.card} key={index} size="small">
        <Skeleton active avatar round />
      </Card>
    ))}
  </>
);
