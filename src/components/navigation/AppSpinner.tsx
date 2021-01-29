import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { useDelayedLoading } from '../utils/hooks/useDelayedLoading';

import style from './AppLayout.module.less';

export const AppSpinner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const delayedLoading = useDelayedLoading({ loading, loadingDelay: 1350 });

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!delayedLoading) {
    return null;
  }

  return (
    <div className={style.appSpinnerWrapper}>
      <Spin size="large" />
      <p style={{ textAlign: 'center' }}>
        Wczytujemy dla ciebie aplikację. Czasami gdy serwer jest przeciążony aplikacja może się
        ładować nawet do kilku minut. Po pierwszym wczytaniu aplikacja powinna działać znacznie
        szybciej.
      </p>
    </div>
  );
};
