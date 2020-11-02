import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import { navigate } from '@reach/router';
import { Avatar, List } from 'antd';

import { PartyRequestStatus } from '../../../generated/graphql';
import { renderPartyRequestStatus } from '../../enum-renderers/PartyReqestStatusRenderer';
import { eventsRoute } from '../../navigation/routerConstants';
import { useListGridProps } from '../../utils/components/useListGridProps';
import {
  PartyRequestQueryType,
  useUserPartyRequests,
} from '../../utils/hooks/graphql/party-request/useUserPartyRequests';
import { EmptyEventsList } from '../common/EmptyList';
import { PartyRequestDropdown } from './PartyRequestDropdown';

import listStyle from '../../utils/components/List.module.less';

export interface GroupsListProps {
  requests?: {};
  loading: boolean;
}

const ListItem: React.FC<{ partyRequest: PartyRequestQueryType[0] }> = (props) => {
  const {
    partyRequest: {
      status,
      partyRequestParty: { name, id: partyId },
    },
    partyRequest,
  } = props;

  return (
    <List.Item
      actions={[<PartyRequestDropdown partyRequest={partyRequest} />]}
      className={listStyle.listItem}
      onClick={() => navigate(`${eventsRoute}/unknown/${partyId}`)}
    >
      <List.Item.Meta
        avatar={<Avatar icon={<ScheduleOutlined />} shape="square" />}
        description={`Status: ${renderPartyRequestStatus(status)}`}
        title={`Na: ${name}`}
      />
    </List.Item>
  );
};

export const PartyRequestsList: React.FC = () => {
  const { extractedData: partyRequests, loading } = useUserPartyRequests();
  const grid = useListGridProps();
  const minSm = useMediaQuery({ minWidth: 521 });

  return (
    <List
      dataSource={partyRequests?.filter((it) => it.status === PartyRequestStatus.InProgress)}
      grid={grid}
      itemLayout={minSm ? 'vertical' : 'horizontal'}
      loading={loading && !partyRequests}
      locale={{ emptyText: <EmptyEventsList type="zaproszeń" /> }}
      renderItem={(item: PartyRequestQueryType[0]) => (
        <ListItem key={item.id} partyRequest={item} />
      )}
      size="large"
    />
  );
};
