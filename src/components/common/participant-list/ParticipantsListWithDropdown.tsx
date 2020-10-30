import React, { useContext } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { navigate } from '@reach/router';
import { Dropdown, Menu, Spin } from 'antd';
import clsx from 'clsx';

import { UserContext } from '../../config/UserProvider';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { Optional } from '../../utils/types';

import style from './ParticipantList.module.less';

const participantWrapperClassName = clsx(style.participantWrapper, 'data-cy-participant-wrapper');

export interface ParticipantListProps {
  loading?: boolean;
  participants: Optional<Array<{ id: string; name?: string | null }>>;
  deleteText: string;

  onDelete: (id: string) => void;
}

export const ParticipantListWithDropdown: React.FC<ParticipantListProps> = ({
  participants,
  loading,
  onDelete,
  deleteText,
}) => {
  const { userId } = useContext(UserContext);

  if (loading) {
    return (
      <div className={style.spin}>
        <Spin />
      </div>
    );
  }

  if (participants?.length === 0) {
    return <NameNotFound />;
  }

  return (
    <div className={style.participantsWrapper}>
      {participants
        ?.filter((it) => it.id !== userId)
        ?.map(({ id, name }) => (
          <Dropdown
            key={id}
            overlay={
              <Menu>
                <Menu.Item icon={<UserOutlined />} key="2" onClick={() => navigate(`/users/${id}`)}>
                  Przejdź do profilu
                </Menu.Item>
                <Menu.Item
                  icon={<DeleteOutlined className={style.menuDeleteIcon} />}
                  key="1"
                  onClick={() => onDelete(id)}
                >
                  {deleteText}
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
          >
            <div className={participantWrapperClassName} key={id}>
              <CloseOutlined className={style.deleteIcon} />
              <IdenticonAvatar id={id} size={20} />
              {name}
            </div>
          </Dropdown>
        ))}
    </div>
  );
};

const NameNotFound: React.FC = () => (
  <>
    <h3>Pusto...</h3>
    <p>Brak użytkowników</p>
  </>
);
