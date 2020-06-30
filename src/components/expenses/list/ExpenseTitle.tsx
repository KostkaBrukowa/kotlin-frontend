import React, { useContext } from 'react';
import { Checkbox, Form } from 'antd';
import style from './ExpenseList.module.less';
import { ActionType, ExpensesContext } from '../ExpensesContext';

export interface ExpenseTitleProps {
  title: string;
}

export const ExpenseTitle: React.FC<ExpenseTitleProps> = ({ title }) => {
  const {
    state: { showFinished },
    dispatch,
  } = useContext(ExpensesContext);

  const onCheckboxClick = () => {
    dispatch({
      type: ActionType.SET_FINISHED_EXPENSES,
      payload: { showFinished: !showFinished },
    });
  };

  return (
    <div className={style.headerWrapper}>
      <h2 className={style.header}>{title}</h2>
      <Form.Item className={style.checkbox}>
        <Checkbox checked={showFinished} onClick={onCheckboxClick}>
          Pokaż zakończone
        </Checkbox>
      </Form.Item>
    </div>
  );
};
