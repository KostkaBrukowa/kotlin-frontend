import React from 'react';
import { Collapse } from 'antd';

import { ParticipantList } from '../../../../common/participant-list/ParticipantList';
import { renderCollapsableArrow } from '../../../../utils/components/CollapsableArrow';
import { NotOptional } from '../../../../utils/types';
import { EventExpenses } from '../expenses/EventExpenses';
import { EventQueryType } from '../useSingleEvent';

import style from '../../../event/view/EventView.module.less';

export interface EventInfoPanelProps {
  event: NotOptional<EventQueryType>;
}

export const EventInfoPanel: React.FC<EventInfoPanelProps> = ({ event }) => (
  <Collapse
    bordered={false}
    className={style.collapsableWrapper}
    defaultActiveKey={[1]}
    expandIcon={renderCollapsableArrow}
    expandIconPosition="right"
  >
    <Collapse.Panel header="Wydatki" key={1}>
      <EventExpenses payments={event.partyExpenses} />
    </Collapse.Panel>
    <Collapse.Panel header="Uczestnicy" key={2}>
      <ParticipantList participants={event.partyParticipants} />
    </Collapse.Panel>
    <Collapse.Panel header="Wiadomości" key={3} />
  </Collapse>
);
