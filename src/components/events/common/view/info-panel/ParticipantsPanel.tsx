import React, { useContext, useState } from 'react';
import { Button } from 'antd';

import { PartyRequestStatus } from '../../../../../generated/graphql';
import { ParticipantList } from '../../../../common/participant-list/ParticipantList';
import { ParticipantListWithDropdown } from '../../../../common/participant-list/ParticipantsListWithDropdown';
import { UserContext } from '../../../../config/UserProvider';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { SendPartyRequestModal } from './SendPartyRequestModal';
import { useRemoveParticipantModal } from './useRemoveParticipantModal';
import { useRemovePartyRequestModal } from './useRemovePartyRequestModal';

import style from '../../../event/view/EventView.module.less';

export interface ParticipantsPanelProps {
  event: NotOptional<EventQueryType>;
}

export const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({ event }) => {
  const { userId: currentUserId } = useContext(UserContext);
  const openRemovePartyRequestModal = useRemovePartyRequestModal({ event });
  const openRemovePartyParticipantModal = useRemoveParticipantModal();
  const [sendPartyRequestModalOpen, setSendPartyRequestModalOpen] = useState(false);

  const participants = event.partyParticipants.filter((it) => it.id !== currentUserId);
  const partyRequestsInProgress = event.partyPartyRequests
    .filter((it) => it.status === PartyRequestStatus.InProgress)
    .map((it) => it.partyRequestReceiver);

  const openSendPartyRequestModal = () => setSendPartyRequestModalOpen(true);
  const closeSendPartyRequestModal = () => setSendPartyRequestModalOpen(false);

  const userIsOwner = event.owner?.id === currentUserId;

  return (
    <>
      {userIsOwner && (
        <>
          <div className={style.addParticipantButton}>
            <Button onClick={openSendPartyRequestModal}>Zaproś nowego uczestnika</Button>
          </div>
          <SendPartyRequestModal
            event={event}
            open={sendPartyRequestModalOpen}
            onClose={closeSendPartyRequestModal}
          />
        </>
      )}
      <div className={style.acceptedHeaderWrapper}>
        <h3>Zaakceptowane:</h3>
      </div>
      {userIsOwner ? (
        <ParticipantListWithDropdown
          deleteText="Usuń uczestnika"
          participants={participants}
          onDelete={(userId) => openRemovePartyParticipantModal(event.id, userId)}
        />
      ) : (
        <ParticipantList participants={participants} />
      )}

      <div className={style.notAcceptedHeaderWrapper}>
        <h3>Czeka na akceptację zaproszenia:</h3>
      </div>
      {userIsOwner ? (
        <ParticipantListWithDropdown
          deleteText="Usuń zaproszenie"
          participants={partyRequestsInProgress}
          onDelete={openRemovePartyRequestModal}
        />
      ) : (
        <ParticipantList participants={partyRequestsInProgress} />
      )}
    </>
  );
};
