import { message } from 'antd';

import {
  PartyRequestStatus,
  useAcceptPartyRequestMutation,
} from '../../../../../generated/graphql';

export const useAcceptPartyRequest = () => {
  const [acceptPartyRequest, { loading }] = useAcceptPartyRequestMutation({
    onCompleted: () => message.success('Zaakceptowałeś zaproszenie.'),
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.acceptPartyRequest) {
        return;
      }

      cache.modify({
        id: cache.identify(data.acceptPartyRequest),
        fields: {
          status() {
            return PartyRequestStatus.Accepted;
          },
        },
      });
    },
  });

  return {
    acceptPartyRequest: (partyRequestId: string) =>
      acceptPartyRequest({ variables: { partyRequestId } }),
    loading,
  };
};
