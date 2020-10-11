import React from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Dropdown, Menu, Modal } from 'antd';
import { Friend } from '../../utils/hooks/graphql/friends/useUserFriends';
import { useRemoveFriend } from './graphql/useRemoveFriend';

import style from './FriendsView.module.less';

export const FriendDropdown: React.FC<{ friend: Friend }> = ({ friend: { id, name } }) => {
  const { removeFriend } = useRemoveFriend(id);

  const showPromiseModal = () =>
    Modal.confirm({
      okText: 'Usuń',
      cancelText: 'Anuluj',
      title: 'Usuwasz znajomego',
      content: `Czy na pewno chcesz usunąć użytkownika '${name}' ze swoich znajomych?`,
      maskClosable: true,
      onOk: removeFriend,
    });

  return (
    <Dropdown.Button
      className={style.dropdownButton}
      overlay={
        <Menu>
          <Menu.Item icon={<DeleteOutlined />} key="1" onClick={showPromiseModal}>
            Usuń z listy znajomych
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    />
  );
};
