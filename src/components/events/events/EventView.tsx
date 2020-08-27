import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Collapse, Typography } from 'antd';

import { ParticipantList } from '../../common/participant-list/ParticipantList';
import { renderCollapsableArrow } from '../../utils/components/CollapsableArrow';
import { Info, ViewDescription } from '../../utils/components/ViewDescription';
import { dateFrom, formatDate, getDayOfTheWeek } from '../../utils/functions/date';
import { capitalize } from '../../utils/functions/string';
import { EventExpenses } from './EventExpenses';
import { EventMap } from './EventLeafletMap';
import { JoinEventButton } from './JoinEventButton';
import { useSingleEvent } from './useSingleEvent';

import style from './EventView.module.less';

interface RouteParams {
  eventId?: string;
}

export type EventViewProps = RouteComponentProps<RouteParams>;

const { Text } = Typography;

export const EventView: React.FC<EventViewProps> = ({ eventId }) => {
  const { dataComponent, extractedData: event } = useSingleEvent(eventId);

  if (dataComponent !== null || !event) return dataComponent;

  const { locationLongitude, locationLatitude, locationName } = event;
  const startDate = dateFrom(event.startDate);

  return (
    <div>
      <EventMap
        locationName={locationName}
        position={[locationLatitude ?? 0, locationLongitude ?? 0]}
      />
      <div className={style.infoWrapper}>
        <Text strong>
          {getDayOfTheWeek(startDate)} {formatDate(startDate)}
        </Text>
        <h2>{capitalize(event.name)}</h2>
        <p>{locationName}</p>
        <JoinEventButton event={event} />
        <ViewDescription>
          <Info description={event.owner?.name} title="Założyciel:" />
          <Info description={formatDate(dateFrom(event.endDate))} title="Data zakończenia:" />
          <Info description={event.description} title="Opis:" />
        </ViewDescription>
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
      </div>
    </div>
  );
};
