import React from 'react';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import { navigate } from '@reach/router';
import { Avatar, List, Skeleton } from 'antd';

import { PartyRequestStatus } from '../../../generated/graphql';
import { renderPartyRequestStatus } from '../../enum-renderers/PartyReqestStatusRenderer';
import { eventsEventRoute, eventsRoute } from '../../navigation/routerConstants';
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
      <Skeleton avatar loading={false}>
        <List.Item.Meta
          avatar={<Avatar icon={<ScheduleOutlined />} shape="square" />}
          description={`Status: ${renderPartyRequestStatus(status)}`}
          title={`Na: ${name}`}
        />
      </Skeleton>
    </List.Item>
  );
};

export const PartyRequestsList: React.FC = () => {
  const { extractedData: partyRequests, loading } = useUserPartyRequests();

  return (
    <List
      dataSource={partyRequests?.filter((it) => it.status === PartyRequestStatus.InProgress)}
      itemLayout="horizontal"
      loading={loading && !partyRequests}
      locale={{ emptyText: <EmptyEventsList type="zaproszeń" /> }}
      renderItem={(item: PartyRequestQueryType[0]) => (
        <ListItem key={item.id} partyRequest={item} />
      )}
      size="large"
    />
  );
};
