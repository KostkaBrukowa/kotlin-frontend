import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import clsx from 'clsx';

import { ElementHeader } from '../../../common/element-header/ElementHeader';
import { eventFormRoute } from '../../../navigation/routerConstants';
import { Info, ViewDescription } from '../../../utils/components/ViewDescription';
import { singleViewStyle } from '../../../utils/components/ViewStyles';
import { currency } from '../../../utils/constants/currency';
import { capitalize } from '../../../utils/functions/string';
import { useSingleEvent } from '../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { EventInfoPanel } from '../../common/view/info-panel/EventInfoPanel';
import { JoinEventButton } from '../../common/view/join-button/JoinEventButton';

import style from './GroupView.module.less';

interface RouteParams {
  groupId?: string;
}

export type GroupViewProps = RouteComponentProps<RouteParams>;

export const GroupView: React.FC<GroupViewProps> = ({ groupId }) => {
  const { dataComponent, extractedData: event } = useSingleEvent(groupId);

  if (dataComponent !== null || !event || !event) return dataComponent;

  const { partyExpenses } = event;
  const unbalancedAmount = partyExpenses?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0; // convert to hook and take into account inactive expenses
  const balanceClassName = clsx({
    [style.outstandingBalance]: unbalancedAmount !== 0,
    [style.settledBalance]: unbalancedAmount === 0,
  });

  return (
    <div style={singleViewStyle}>
      <div className={style.infoWrapper}>
        <ElementHeader id={event.id} onEdit={() => navigate(`${eventFormRoute}/${event.id}`)} />
        <h2 className={style.groupName}>{capitalize(event.name)}</h2>
        <JoinEventButton event={event} text="Dołączyłem do grupy" />
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
