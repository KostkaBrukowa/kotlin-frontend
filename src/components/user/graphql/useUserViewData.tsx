import React, { useContext, useEffect } from 'react';
import { Spin } from 'antd';

import { useGetUserViewDataLazyQuery } from '../../../generated/graphql';
import { UserContext } from '../../config/UserProvider';
import { useDelayedLoading } from '../../utils/hooks/useDelayedLoading';
import { useRemoteDataComponent } from '../../utils/hooks/useRemoteData';
import { ResourceNotFound } from '../../utils/not-found/ResourceNotFound';

import style from '../../utils/hooks/useRemoteData.module.less';

export const useUserViewData = (userId: string | undefined) => {
  const { userId: currentUserId } = useContext(UserContext);
  const [getExpenses, { data, loading }] = useGetUserViewDataLazyQuery();
  const delayedLoading = useDelayedLoading({ loading });
  const dataComponent = delayedLoading ? (
    <Spin className={style.spin} tip="Ładuję..." />
  ) : !data ? null : !data.getUser ? (
    <ResourceNotFound />
  ) : null;

  useEffect(() => {
    if (userId && currentUserId !== null) {
      getExpenses({ variables: { userId, currentUserId } });
    }
  }, [userId, getExpenses, currentUserId]);

  return {
    data,
    dataComponent,
  };
};
