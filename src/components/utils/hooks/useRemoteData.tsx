import React, { ReactElement } from 'react';
import { QueryLazyOptions, QueryTuple } from '@apollo/client/react/types/types';
import { Spin } from 'antd';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { ResourceNotFound } from '../not-found/ResourceNotFound';
import { useDelayedLoading } from './useDelayedLoading';

import style from './useRemoteData.module.less';

const allVariablesNotNull = (obj?: Record<string, any>): boolean =>
  obj ? Object.values(obj).every((it) => it !== null && it !== undefined) : true;

export const useRemoteDataComponent = <TExtractedData,>(
  extractedData: TExtractedData,
  loading: boolean,
): ReactElement | undefined | null => {
  const delayedLoading = useDelayedLoading({ loading });

  if (delayedLoading) {
    return <Spin className={style.spin} tip="Ładuję..." />;
  }

  if (loading) return undefined;

  if (!extractedData) return <ResourceNotFound />;

  return null;
};

export const useRemoteData = <TExtractedData, TData, TVariables>(
  queryProps: QueryTuple<TData, TVariables>,
  extractedData: TExtractedData,
  variables: Partial<TVariables>,
  options?: QueryLazyOptions<TVariables>,
) => {
  const [fetchData, { loading, called, refetch }] = queryProps;
  const dataLoading = loading || !called;
  const dataComponent = useRemoteDataComponent(extractedData, dataLoading);

  const refetchCallback = () =>
    refetch &&
    refetch({
      ...options,
      // @ts-ignore
      variables,
    });

  useDeepCompareEffect(() => {
    if (allVariablesNotNull(variables)) {
      fetchData({
        ...options,
        // @ts-ignore
        variables,
      });
    }
  }, [options, fetchData, variables]);

  return {
    dataComponent: dataComponent ?? null,
    extractedData,
    refetch: refetchCallback,
    loading: dataLoading,
  };
};
