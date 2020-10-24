import React from 'react';

export const handleSpaceAndEnter = (handler: () => any) => (e: React.KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') handler();
};
