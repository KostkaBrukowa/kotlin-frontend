import React, { useContext } from 'react';
import { Button } from 'antd';

import { ActionType, AppContext } from '../../app-context/AppContext';

import style from './EmptyList.module.less';

interface EmptyListProps {
  nonFinishedPresent: boolean;
}

export const EmptyList: React.FC<EmptyListProps> = ({ nonFinishedPresent }) => {
  const { dispatch } = useContext(AppContext);

  const onButtonClick = () => {
    dispatch({
      type: ActionType.SET_FINISHED_EXPENSES,
      payload: { showFinished: true },
    });
  };

  return (
    <>
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
