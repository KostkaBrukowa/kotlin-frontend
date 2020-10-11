import React from 'react';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, Typography } from 'antd';

import { eventFormRoute } from '../../../navigation/routerConstants';
import { Info, ViewDescription } from '../../../utils/components/ViewDescription';
import { dateFrom, formatDate, getDayOfTheWeek } from '../../../utils/functions/date';
import { capitalize } from '../../../utils/functions/string';
import { useSingleEvent } from '../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { EventInfoPanel } from '../../common/view/info-panel/EventInfoPanel';
import { JoinEventButton } from '../../common/view/join-button/JoinEventButton';
import { EventMap } from './EventLeafletMap';

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
        <div className={style.headerDateWrapper}>
          <div>
            <Text strong>
              {getDayOfTheWeek(startDate)} {formatDate(startDate)}
            </Text>
            <h2>{capitalize(event.name)}</h2>
          </div>
          <Button icon={<EditOutlined />} onClick={() => navigate(`${eventFormRoute}/${event.id}`)}>
            Edytuj
          </Button>
        </div>
        <p>{locationName}</p>
        <JoinEventButton event={event} />
        <ViewDescription>
          <Info description={event.owner?.name} title="Założyciel:" />
          <Info description={formatDate(dateFrom(event.startDate))} title="Data rozpoczęcia:" />
          <Info description={event.description} title="Opis:" />
        </ViewDescription>
        <EventInfoPanel event={event} />
      </div>
    </div>
  );
};
