import React from 'react';
import AiOutlineArrowLeft from '@ant-design/icons/ArrowLeftOutlined';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, Empty } from 'antd';

import { loginRoute } from '../../navigation/routerConstants';

import style from './ExpenseNotFound.module.less';

export interface ResourceNotFoundProps extends RouteComponentProps {
  tokenPresent?: boolean;
}

export const ResourceNotFound: React.FC<ResourceNotFoundProps> = ({ tokenPresent = true }) => (
  <Empty
    className={style.empty}
    description={
      <span>
        {tokenPresent ? (
          <>
            Ups... Chyba zabłądziłeś.\n <br /> Taka strona nie istnieje.
          </>
        ) : (
          <>
            Jesteś niezalogowany
            <br /> Aby korzystać z tej aplikacji:
          </>
        )}
      </span>
    }
    imageStyle={{
      height: 120,
    }}
  >
    <Button
      className={style.button}
      icon={<AiOutlineArrowLeft className={style.icon} />}
      type="primary"
      onClick={() => (tokenPresent ? navigate(-1) : navigate(loginRoute))}
    >
      {tokenPresent ? 'Zawróć' : 'Zaloguj się'}
    </Button>
  </Empty>
);
