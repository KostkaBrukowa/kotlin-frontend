import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Typography } from 'antd';
import clsx from 'clsx';

import { ElementHeader } from '../../../common/element-header/ElementHeader';
import { Info, ViewDescription } from '../../../utils/components/ViewDescription';
import { currency } from '../../../utils/constants/currency';
import { capitalize } from '../../../utils/functions/string';
import { getFriendCountText } from '../../common/OtherParticipants';
import { EventInfoPanel } from '../../common/view/info-panel/EventInfoPanel';
import { useSingleEvent } from '../../common/view/useSingleEvent';

import style from './FriendsView.module.less';

interface RouteParams {
  friendsId?: string;
}

export type FriendsViewProps = RouteComponentProps<RouteParams>;

export const FriendsView: React.FC<FriendsViewProps> = ({ friendsId }) => {
  const { dataComponent, extractedData: event } = useSingleEvent(friendsId);

  if (dataComponent !== null || !event) return dataComponent;

  const { locationName, partyExpenses, partyParticipants, owner } = event;
  const unbalancedAmount = partyExpenses?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0; // convert to hook and take into account inactive expenses
  const balanceClassName = clsx({
    [style.outstandingBalance]: unbalancedAmount !== 0,
    [style.settledBalance]: unbalancedAmount === 0,
  });

  const friendsCountText = getFriendCountText(partyParticipants.length - 1);

  return (
    <div>
      <div className={style.infoWrapper}>
        <ElementHeader id={event.id} />
        <h2 className={style.groupName}>{`Ty, ${owner?.name} ${friendsCountText ?? ''}`}</h2>
        <ViewDescription>
          <Info
            description={`${unbalancedAmount} ${currency}`}
            descriptionClassName={balanceClassName}
            title="Nieuregulowana kwota:"
          />
          <Info description={capitalize(event.owner?.name)} title="Założyciel:" />
          <Info description={capitalize(event.description)} title="Opis:" />
        </ViewDescription>
        <EventInfoPanel event={event} />
      </div>
    </div>
  );
};
