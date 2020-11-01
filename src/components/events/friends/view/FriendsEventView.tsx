import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import clsx from 'clsx';

import { ExpenseStatus } from '../../../../generated/graphql';
import { ElementHeader } from '../../../common/element-header/ElementHeader';
import { eventFormRoute } from '../../../navigation/routerConstants';
import { Info, ViewDescription } from '../../../utils/components/ViewDescription';
import { singleViewStyle } from '../../../utils/components/ViewStyles';
import { currency } from '../../../utils/constants/currency';
import { capitalize } from '../../../utils/functions/string';
import { useSingleEvent } from '../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { getFriendCountText } from '../../common/OtherParticipants';
import { EventInfoPanel } from '../../common/view/info-panel/EventInfoPanel';

import style from './FriendsView.module.less';

interface RouteParams {
  friendsId?: string;
}

export type FriendsViewProps = RouteComponentProps<RouteParams>;

export const FriendsEventView: React.FC<FriendsViewProps> = ({ friendsId }) => {
  const { dataComponent, extractedData: event } = useSingleEvent(friendsId);

  if (dataComponent !== null || !event) return dataComponent;

  const { partyExpenses, partyParticipants, owner } = event;
  const unbalancedAmount =
    partyExpenses
      .filter((it) => it.expenseStatus !== ExpenseStatus.Resolved)
      ?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0; // convert to hook and take into account inactive expenses
  const balanceClassName = clsx({
    [style.outstandingBalance]: unbalancedAmount !== 0,
    [style.settledBalance]: unbalancedAmount === 0,
  });

  const friendsCountText = getFriendCountText(partyParticipants.length - 2);

  return (
    <div style={singleViewStyle}>
      <div className={style.infoWrapper}>
        <ElementHeader id={event.id} onEdit={() => navigate(`${eventFormRoute}/${event.id}`)} />
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
