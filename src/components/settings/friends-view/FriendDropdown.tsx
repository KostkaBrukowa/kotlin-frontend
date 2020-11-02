import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import { Button, Dropdown, Menu, message, Modal } from 'antd';

import { stopPropagations } from '../../utils/functions/utilFunctions';
import { Friend } from '../../utils/hooks/graphql/friends/useUserFriends';
import { useRemoveFriend } from './graphql/useRemoveFriend';

export const FriendDropdown: React.FC<{ friend: Friend }> = ({ friend: { id, name } }) => {
  const { removeFriend } = useRemoveFriend(id);
  const minSm = useMediaQuery({ minWidth: 521 });

  const handleRemove = async () => {
    await removeFriend();
    message.success('Usunięto ze znajomych');
  };

  const showRemoveFriendModal = () =>
    Modal.confirm({
      okText: 'Usuń',
      cancelText: 'Anuluj',
      title: 'Usuwasz znajomego',
      content: `Czy na pewno chcesz usunąć użytkownika '${name}' ze swoich znajomych?`,
      maskClosable: true,
      onOk: handleRemove,
    });

  const overlay = (
    <Menu>
      <Menu.Item
        icon={<DeleteOutlined />}
        key="1"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          showRemoveFriendModal();
        }}
      >
        Usuń z listy znajomych
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      {minSm ? (
        <Button icon={<EllipsisOutlined />} type="ghost" {...stopPropagations}>
          Dodatkowe akcje
        </Button>
      ) : (
        <Button icon={<EllipsisOutlined />} type="ghost" {...stopPropagations} />
      )}
    </Dropdown>
  );
};
