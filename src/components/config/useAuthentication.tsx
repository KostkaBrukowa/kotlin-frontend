import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import { useRefreshTokenMutation } from '../../generated/graphql';

// eslint-disable-next-line import/no-mutable-exports
export let JWT_TOKEN: string | null = null;
export const JWT_TOKEN_EXPIRY_TIME = 900000;

export const useAuthentication = () => {
  const [refreshToken, { loading, called }] = useRefreshTokenMutation();
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const refreshInterval = jwtToken ? JWT_TOKEN_EXPIRY_TIME - 60000 : null;

  const updateTokens = () => {
    refreshToken()
      .then((data) => setJwtToken(data?.data?.refreshToken ?? null))
      .catch(() => setJwtToken(null));
  };

  useEffect(updateTokens, []);

  useInterval(updateTokens, refreshInterval);

  useEffect(() => {
    JWT_TOKEN = jwtToken;
  }, [jwtToken]);

  return { initialLoading: loading && !called, setJwtToken, tokenPresent: jwtToken != null };
};
