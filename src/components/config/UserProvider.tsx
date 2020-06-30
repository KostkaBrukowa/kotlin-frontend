import React from 'react';

export interface UserProviderProps {
  userId: number | null;
}

export const UserContext = React.createContext<{ userId: number | null }>({ userId: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children, userId }) => (
  <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
);
