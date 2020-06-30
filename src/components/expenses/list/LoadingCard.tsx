import React from 'react';
import { Card, Skeleton } from 'antd';
import style from './ExpenseList.module.less';

interface LoadingCardProps {
  cardsCount?: number;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ cardsCount }) => (
  <>
    {Array.from({ length: cardsCount ?? 1 }, () => (
      <Card className={style.card}>
        <Skeleton active avatar loading />
      </Card>
    ))}
  </>
);
