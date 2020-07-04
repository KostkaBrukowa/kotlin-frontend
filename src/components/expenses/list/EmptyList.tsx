import React, { useContext } from 'react';
import { Button } from 'antd';
import style from './EmptyList.module.less';
import { ActionType, ExpensesContext } from '../ExpensesContext';

interface EmptyListProps {
  nonFinishedPresent: boolean;
}

export const EmptyList: React.FC<EmptyListProps> = ({ nonFinishedPresent }) => {
  const { dispatch } = useContext(ExpensesContext);

  const onButtonClick = () => {
    dispatch({
      type: ActionType.SET_FINISHED_EXPENSES,
      payload: { showFinished: true },
    });
  };

  return (
    <>
      {/* <ExpenseTitle title="Twoje wydatki:" /> */}
      <div className={style.wrapper}>
        <h3>Wszystko ogarnięte!</h3>
        <p>Nie masz aktualnie aktywnych platności</p>
        {nonFinishedPresent && (
          <Button className={style.button} type="primary" onClick={onButtonClick}>
            Pokaż historyczne wydatki
          </Button>
        )}
      </div>
    </>
  );
};