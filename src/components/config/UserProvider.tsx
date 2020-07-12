import React from 'react';

export interface UserProviderProps {
  userId: string | null;
}

export const UserContext = React.createContext<UserProviderProps>({ userId: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children, userId }) => (
  <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
);
