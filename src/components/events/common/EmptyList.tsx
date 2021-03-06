import React from 'react';

import style from '../../utils/components/List.module.less';

export const EmptyEventsList: React.FC<{ type: string }> = ({ type }) => (
  <>
    <h3>Pusto...</h3>
    <p className={style.emptyParagraph}>Nie ma aktualnie żadnych aktywnych {type}.</p>
  </>
);
