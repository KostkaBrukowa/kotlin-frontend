import React from 'react';
import CloseSquareOutlined from '@ant-design/icons/CloseSquareOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import { Button, Dropdown, Menu } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/es/interface';

import { PartyRequestStatus } from '../../../generated/graphql';
import { stopPropagation } from '../../utils/functions/utilFunctions';
import { PartyRequestQueryType } from '../../utils/hooks/graphql/party-request/useUserPartyRequests';
import { useDeclinePartyRequestModal } from './useDeclinePartyRequestModal';
import { useRemovePartyRequestModal } from './useRemovePartyRequestModal';

import style from './PartyRequestsList.module.less';

export const PartyRequestDropdown: React.FC<{ partyRequest: PartyRequestQueryType[0] }> = ({
  partyRequest: { id, status },
}) => {
  const openRemovePartyRequestModal = useRemovePartyRequestModal(id);
  const openDeclinePartyRequestModal = useDeclinePartyRequestModal(id);

  const handleMenuItemClick = (handler: () => void): MenuClickEventHandler => (info) => {
    info.domEvent.stopPropagation();
    handler();
  };

  const menu = (
    <Menu>
      {status !== PartyRequestStatus.Declined && (
        <Menu.Item
          icon={<CloseSquareOutlined />}
          key="2"
          onClick={handleMenuItemClick(openDeclinePartyRequestModal)}
        >
          Odrzuć zaproszenie
        </Menu.Item>
      )}
      <Menu.Item
        icon={<DeleteOutlined className={style.deleteIcon} />}
        key="3"
        onClick={handleMenuItemClick(openRemovePartyRequestModal)}
      >
        Usuń zaproszenie
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} type="ghost" onClick={stopPropagation} />
    </Dropdown>
  );
};
