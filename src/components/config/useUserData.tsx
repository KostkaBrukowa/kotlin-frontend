import { useEffect } from 'react';
import { usePreviousProps } from '../utils/hooks/usePreviousProps';

interface UseUserDataProps {
  token: string | null;
}

export const useUserData = (props: UseUserDataProps) => {
  const { token } = props;
  const previousProps = usePreviousProps(props);

  useEffect(() => {
    if (token && !previousProps?.token) {
    }
  }, [token]);

  return {};
};
