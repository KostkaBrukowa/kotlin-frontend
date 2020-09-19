import { useState } from 'react';

export const useRerender = () => {
  const [rerenderFlag, setRerenderFlag] = useState(false);

  const rerender = () => setRerenderFlag(!rerenderFlag);

  return rerender;
};
