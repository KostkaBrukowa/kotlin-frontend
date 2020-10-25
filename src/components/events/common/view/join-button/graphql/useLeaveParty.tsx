import { useContext } from 'react';

import { useLeavePartyMutation } from '../../../../../../generated/graphql';
import { UserContext } from '../../../../../config/UserProvider';

export const useLeaveParty = () => {
  const { userId } = useContext(UserContext);
  const [leaveParty, { loading }] = useLeavePartyMutation();

  return {
    loading,
    leaveParty: (partyId: string) => leaveParty({ variables: { userId: userId ?? '0', partyId } }),
  };
};
