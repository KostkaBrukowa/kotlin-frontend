import React from 'react';
import { Button, Empty } from 'antd';
import { navigate } from '@reach/router';
import { AiOutlineArrowLeft } from 'react-icons/all';
import style from './ExpenseNotFound.module.less';

export const ResourceNotFound: React.FC = () => (
  <Empty
    className={style.empty}
    description={
      <span>
        Ups... Chyba zabłądziłeś.
        <br /> Taki zasób nie istnieje.
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
