import React, { useEffect } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { expensesRoute } from '../navigation/routerConstants';

export type HomeProps = RouteComponentProps;

export const Home: React.FC<HomeProps> = () => {
  useEffect(() => {
    navigate(expensesRoute);
  }, []);

  return null;
};
