import React from 'react';
import clsx from 'clsx';

import style from '../../expenses/expense-view/ExpenseView.module.less';

export interface ViewDescriptionProps {
  className?: string;
}

export interface InfoProps {
  title: string;
  description?: string | null;
}

export const Info: React.FC<InfoProps> = ({ title, description }) =>
  description ? (
    <>
      <p className={style.descriptionLabel}>{title}</p>
      <p>{description}</p>
    </>
  ) : null;

export const ViewDescription: React.FC<ViewDescriptionProps> = ({ children, className }) => (
  <div className={clsx(style.description, className)}>{children}</div>
);
