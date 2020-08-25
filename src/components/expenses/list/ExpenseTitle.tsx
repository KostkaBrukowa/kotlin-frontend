import React, { useContext } from 'react';
import { Checkbox, Form } from 'antd';

import { ActionType, AppContext } from '../../app-context/AppContext';

import style from './ExpenseList.module.less';

export interface ExpenseTitleProps {
  title: string;
}

export const ExpenseTitle: React.FC<ExpenseTitleProps> = ({ title }) => {
  const {
    state: { showFinished },
    dispatch,
  } = useContext(AppContext);

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
        <Checkbox
          checked={showFinished}
          className="data-cy-show-finished"
          onClick={onCheckboxClick}
        >
          Pokaż zakończone
        </Checkbox>
      </Form.Item>
    </div>
  );
};
