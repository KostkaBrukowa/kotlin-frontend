import React, { useEffect } from 'react';
import { navigate, Redirect, RouteComponentProps } from '@reach/router';

import { eventTypeToRoute } from '../events/common/Route';
import { expensesRoute } from '../navigation/routerConstants';
import { useSingleEvent } from '../utils/hooks/graphql/singleEvent/useSingleEvent';

export type HomeProps = RouteComponentProps;

export const Home: React.FC<HomeProps> = () => {
  useEffect(() => {
    navigate(expensesRoute);
  }, []);

  return null;
};
