import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { navigate } from '@reach/router';
import { Input, List } from 'antd';

import { EmptyEventsList } from '../../events/common/EmptyList';
import { userRoute } from '../../navigation/routerConstants';
import { handleSpaceAndEnter } from '../../utils/a11n/KeyHandlers';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { useListGridProps } from '../../utils/components/useListGridProps';
import { Friend, useUserFriends } from '../../utils/hooks/graphql/friends/useUserFriends';
import { FriendDropdown } from './FriendDropdown';

import listStyle from '../../utils/components/List.module.less';
import style from './FriendsView.module.less';

const ListItem: React.FC<{ friend: Friend }> = ({ friend }) => {
  const handleClick = () => navigate(`${userRoute}/${friend.id}`);

  return (
    <List.Item
      actions={[<FriendDropdown friend={friend} />]}
      // actions={[<EllipsisOutlined key="ellipsis" />]}
      className={listStyle.listItem}
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleSpaceAndEnter(handleClick)}
    >
      <List.Item.Meta
        avatar={<IdenticonAvatar id={friend.id} size={22} />}
        description={friend.email}
        title={friend.name}
      />
    </List.Item>
  );
};

export const FriendsList: React.FC = () => {
  const [searchedText, setSearchedText] = useState('');
  const { dataComponent, extractedData: friends } = useUserFriends();
  const grid = useListGridProps();
  const minSm = useMediaQuery({ minWidth: 521 });

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
        grid={grid}
        itemLayout={minSm ? 'vertical' : 'horizontal'}
        locale={{ emptyText: <EmptyEventsList type="znajomych" /> }}
        renderItem={(item: Friend) => <ListItem friend={item} key={item.id} />}
        size="default"
      />
    </>
  );
};
