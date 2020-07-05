import React from 'react';
import style from '../events/EventsList.module.less';

export const EmptyEventsList: React.FC<{ type: string }> = ({ type }) => (
  <>
    <h3>Ups... Pusto</h3>
    <p className={style.emptyParagraph}>Nie masz aktualnie żadnych aktywnych {type}.</p>
  </>
);
