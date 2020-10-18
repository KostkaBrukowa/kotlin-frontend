import { useRemovePartyParticipantMutation } from '../../../../../generated/graphql';

export const useRemovePartyParticipant = () => {
  const [removePartyParticipant] = useRemovePartyParticipantMutation();

  return {
    removePartyParticipant: (partyId: string, userId: string) =>
      removePartyParticipant({ variables: { partyId, userId } }),
  };
};
