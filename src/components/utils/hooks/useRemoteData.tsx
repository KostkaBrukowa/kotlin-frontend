import { QueryLazyOptions, QueryTuple } from '@apollo/client/react/types/types';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Alert, Spin } from 'antd';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useDelayedLoading } from './useDelayedLoading';
import { ResourceNotFound } from '../not-found/ResourceNotFound';
import style from './useRemoteData.module.less';

const allVariablesNotNull = (obj?: Record<string, any>): boolean =>
  obj ? Object.values(obj).every((it) => it !== null) : true;

const useRemoteDataComponent = <TExtractedData,>(
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
  const [fetchData, { loading, called }] = queryProps;
  const dataComponent = useRemoteDataComponent(extractedData, loading || !called);

  useDeepCompareEffect(() => {
    if (allVariablesNotNull(variables)) {
      console.log('fetching');
      fetchData({
        ...options,
        // @ts-ignore
        variables,
      });
    }
  }, [options, fetchData, variables]);

  return {
    dataComponent,
    extractedData,
  };
};
