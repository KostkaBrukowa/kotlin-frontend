import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/all';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, Empty } from 'antd';

import style from './ExpenseNotFound.module.less';

export type ResourceNotFoundProps = RouteComponentProps;

export const ResourceNotFound: React.FC<ResourceNotFoundProps> = () => (
  <Empty
    className={style.empty}
    description={
      <span>
        Ups... Chyba zabłądziłeś.
        <br /> Taka strona nie istnieje.
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
      onClick={() => navigate(-1)}
    >
      Zawróć
    </Button>
  </Empty>
);
