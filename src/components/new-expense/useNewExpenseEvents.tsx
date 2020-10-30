import { useContext } from 'react';

import {
  GetUserPartiesQuery,
  PartyKind,
  useGetUserPartiesLazyQuery,
} from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { useRemoteData } from '../utils/hooks/useRemoteData';

export type PartyElementType = GetUserPartiesQuery['getAllParties'][0];

export const useNewExpenseEvents = (selection: PartyKind | null) => {
  const { userId } = useContext(UserContext);
  const query = useGetUserPartiesLazyQuery();
  const { extractedData, loading, dataComponent } = useRemoteData(
    query,
    query[1].data?.getAllParties,
    {
      userId: userId ?? undefined,
    },
  );

  return {
    extractedData: extractedData?.filter((it) => it.type === selection),
    loading,
    dataComponent,
  };
};
