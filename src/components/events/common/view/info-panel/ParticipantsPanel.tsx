import React from 'react';

import { PartyRequestStatus } from '../../../../../generated/graphql';
import { ParticipantListWithDropdown } from '../../../../common/participant-list/ParticipantsListWithDropdown';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { useRemoveParticipantModal } from './useRemoveParticipantModal';
import { useRemovePartyRequestModal } from './useRemovePartyRequestModal';

import style from '../../../event/view/EventView.module.less';

export interface ParticipantsPanelProps {
  event: NotOptional<EventQueryType>;
}

export const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({ event }) => {
  const openRemovePartyRequestModal = useRemovePartyRequestModal({ event });
  const openRemovePartyParticipantModal = useRemoveParticipantModal();

  return (
    <>
      <div className={style.notAcceptedHeaderWrapper}>
        <h3>Zaakceptowane:</h3>
      </div>
      <ParticipantListWithDropdown
        deleteText="Usuń uczestnika"
        participants={event.partyParticipants}
        onDelete={(userId) => openRemovePartyParticipantModal(event.id, userId)}
      />
      <div className={style.notAcceptedHeaderWrapper}>
        <h3>Czeka na akceptację zaproszenia:</h3>
      </div>
      <ParticipantListWithDropdown
        deleteText="Usuń zaproszenie"
        participants={event.partyPartyRequests
          .filter((it) => it.status === PartyRequestStatus.InProgress)
          .map((it) => it.partyRequestReceiver)}
        onDelete={openRemovePartyRequestModal}
      />
    </>
  );
};
