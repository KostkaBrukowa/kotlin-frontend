import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import { Button, Collapse } from 'antd';

import { ParticipantList } from '../../../../common/participant-list/ParticipantList';
import { renderCollapsableArrow } from '../../../../utils/components/CollapsableArrow';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { EventExpenses } from '../expenses/EventExpenses';
import { ParticipantsPanel } from './ParticipantsPanel';
import { RemoveEventButton } from './RemoveEventButton';

import style from '../../../event/view/EventView.module.less';

export interface EventInfoPanelProps {
  event: NotOptional<EventQueryType>;
}

export const collapseKeys = {
  expenses: 1,
  participants: 2,
  messages: 3,
};

export const EventInfoPanel: React.FC<EventInfoPanelProps> = ({ event }) => {
  const location = useLocation();
  const participantsRef = useRef<HTMLDivElement | null>(null);
  const defaultKey = location.hash.includes('#expenses')
    ? collapseKeys.expenses
    : location.hash.includes('#participants')
    ? collapseKeys.participants
    : location.hash.includes('#participants')
    ? collapseKeys.messages
    : null;

  return (
    <>
      <Collapse
        bordered={false}
        className={style.collapsableWrapper}
        defaultActiveKey={[defaultKey ?? collapseKeys.expenses]}
        expandIcon={renderCollapsableArrow}
        expandIconPosition="right"
      >
        <div id="#expensesCollapse" />
        <Collapse.Panel header="Wydatki" key={collapseKeys.expenses}>
          <EventExpenses payments={event.partyExpenses} />
        </Collapse.Panel>
        <div id="#participantsCollapse" ref={participantsRef} />
        <Collapse.Panel header="Uczestnicy" key={collapseKeys.participants}>
          <ParticipantsPanel event={event} />
        </Collapse.Panel>
        <div id="#messagesCollapse" />
        {/* <Collapse.Panel header="Wiadomości" key={collapseKeys.messages} /> */}
      </Collapse>
      <RemoveEventButton event={event} />
    </>
  );
};
