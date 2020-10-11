import React, { useState } from 'react';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { RouteComponentProps } from '@reach/router';
import { Button, PageHeader } from 'antd';
import { AddFriendModal } from './AddFriendModal';
import { FriendsList } from './FriendsList';

export type FriendsViewProps = RouteComponentProps;

export const FriendsView: React.FC<FriendsViewProps> = ({}) => {
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);

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
        onBack={() => null}
      />
      <FriendsList />
      <AddFriendModal open={addFriendModalOpen} onClose={closeModal} />
    </div>
  );
};
