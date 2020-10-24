import React, { useState } from 'react';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, PageHeader } from 'antd';

import { settingsRoute } from '../../navigation/routerConstants';
import { useUserFriends } from '../../utils/hooks/graphql/friends/useUserFriends';
import { AddFriendModal } from './AddFriendModal';
import { FriendsList } from './FriendsList';

export type FriendsViewProps = RouteComponentProps;

export const FriendsView: React.FC<FriendsViewProps> = ({}) => {
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const { dataComponent, extractedData: friends } = useUserFriends();

  if (dataComponent || !friends) return dataComponent;

  const openModal = () => setAddFriendModalOpen(true);
  const closeModal = () => setAddFriendModalOpen(false);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        extra={
          <Button icon={<PlusOutlined />} type="primary" onClick={openModal}>
            Nowy znajomy
          </Button>
        }
        title="Twoi znajomi"
        onBack={() => navigate(settingsRoute)}
      />
      <FriendsList />
      <AddFriendModal open={addFriendModalOpen} onClose={closeModal} onOpen={openModal} />
    </div>
  );
};
