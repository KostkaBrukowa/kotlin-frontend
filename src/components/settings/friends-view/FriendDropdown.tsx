import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Button, Dropdown, Menu, message, Modal } from 'antd';

import { stopPropagation, stopPropagations } from '../../utils/functions/utilFunctions';
import { Friend } from '../../utils/hooks/graphql/friends/useUserFriends';
import { useRemoveFriend } from './graphql/useRemoveFriend';

import style from './FriendsView.module.less';

export const FriendDropdown: React.FC<{ friend: Friend }> = ({ friend: { id, name } }) => {
  const { removeFriend } = useRemoveFriend(id);

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
          console.log('Event', e);
          e.domEvent.stopPropagation();
          showRemoveFriendModal();
        }}
      >
        Usuń z listy znajomych
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown className={style.dropdownButton} overlay={overlay} trigger={['click']}>
      <Button icon={<BsThreeDotsVertical size="1.3em" />} type="ghost" {...stopPropagations} />
    </Dropdown>
  );
};
