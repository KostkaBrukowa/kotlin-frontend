import React from 'react';
import { Link } from '@reach/router';
import clsx from 'clsx';
import { loginRoute, registerRoute } from '../navigation/routerConstants';
import style from './OtherOption.module.less';

export interface OtherOptionProps {
  register?: boolean;
}

export const OtherOption: React.FC<OtherOptionProps> = ({ register }) => {
  const title = register ? 'Posiadasz już konto?' : 'Nie posiadasz jeszcze konta?';
  const link = register ? 'Zaloguj się' : 'Zarejestruj się';
  const route = register ? loginRoute : registerRoute;

  return (
    <div className={clsx(style.wrapper, 'data-cy-login-register')}>
      <h3>{title}</h3>
      <Link to={route}>
        <p>{link}</p>
      </Link>
    </div>
  );
};
