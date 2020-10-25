import React, { useState } from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { Input, List } from 'antd';

import { EmptyEventsList } from '../../events/common/EmptyList';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { Friend, useUserFriends } from '../../utils/hooks/graphql/friends/useUserFriends';
import { FriendDropdown } from './FriendDropdown';

import style from './FriendsView.module.less';
import { navigate } from '@reach/router';
import { userRoute } from '../../navigation/routerConstants';

const ListItem: React.FC<{ friend: Friend }> = ({ friend }) => (
  <List.Item
    actions={[<FriendDropdown friend={friend} />]}
    className={style.listItem}
    onClick={() => navigate(`${userRoute}/${friend.id}`)}
  >
    <List.Item.Meta
      avatar={<IdenticonAvatar id={friend.id} size={22} />}
      description={friend.email}
      title={friend.name}
    />
  </List.Item>
);

export const FriendsList: React.FC = () => {
  const [searchedText, setSearchedText] = useState('');
  const { dataComponent, extractedData: friends } = useUserFriends();

  if ((dataComponent && !friends) || !friends) return dataComponent;

  const filteredFriends = friends.filter(
    (it) => it.name.includes(searchedText) || it.email.includes(searchedText),
  );

  return (
    <>
      <div className={style.searchInputWrapper}>
        <Input
          className={style.searchInput}
          placeholder="Szukaj znajomych"
          prefix={<SearchOutlined />}
          size="middle"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
        />
      </div>
      <List
        className={style.list}
        dataSource={filteredFriends}
        itemLayout="horizontal"
        locale={{ emptyText: <EmptyEventsList type="znajomych" /> }}
        renderItem={(item: Friend) => <ListItem friend={item} key={item.id} />}
        size="default"
      />
    </>
  );
};
