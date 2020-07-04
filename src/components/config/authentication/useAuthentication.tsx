import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import { UserAuthResponse, useRefreshTokenMutation } from '../../../generated/graphql';

// eslint-disable-next-line import/no-mutable-exports
export let JWT_TOKEN: string | null = null;
export const JWT_TOKEN_EXPIRY_TIME = 900000;

export interface AuthData {
  jwtToken: string | null;
  userId: number | null;
}

export const useAuthentication = () => {
  const [refreshToken, { loading, called }] = useRefreshTokenMutation();
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const refreshInterval = authData ? JWT_TOKEN_EXPIRY_TIME - 60000 : null;

  const setUserState = (response: UserAuthResponse | null) => {
    setAuthData({
      jwtToken: response?.token ?? null,
      userId: response?.userId ?? null,
    });
  };

  const updateTokens = () => {
    refreshToken()
      .then((data) => {
        if (data?.data?.refreshToken) setUserState(data?.data?.refreshToken);
      })
      .catch(() => setUserState(null));
  };

  useEffect(updateTokens, []);

  useInterval(updateTokens, refreshInterval);

  useEffect(() => {
    JWT_TOKEN = authData?.jwtToken ?? null;
  }, [authData]);

  return {
    initialLoading: loading && !called,
    setAuthData,
    tokenPresent: authData?.jwtToken != null,
    userId: authData?.userId ?? null,
  };
};
