import React, { createContext, Reducer, useReducer } from 'react';
import { ExpenseType } from '../../generated/graphql';
import { ActionPayload } from '../utils/context/types';

type StateType = {
  currentOwsType: OwsType;
  expenses: ExpenseType[] | null;
};

export enum ActionType {
  CHANGE_OWS_TYPE,
  SET_EXPENSES,
}

export enum OwsType {
  USER_OWS,
  OWS_USER,
}

export type Action =
  | ActionPayload<ActionType.CHANGE_OWS_TYPE, Pick<StateType, 'currentOwsType'>>
  | ActionPayload<ActionType.SET_EXPENSES, Pick<StateType, 'expenses'>>;

const initialState: StateType = {
  currentOwsType: OwsType.OWS_USER,
  expenses: null,
};

const productReducer: Reducer<StateType, Action> = (state, action) => {
  console.log('Action', action);

  switch (action.type) {
    case ActionType.CHANGE_OWS_TYPE:
      console.log({ ...state, currentOwsType: action.payload.currentOwsType });

      return { ...state, currentOwsType: action.payload.currentOwsType };
    case ActionType.SET_EXPENSES:
      return { ...state, expenses: action.payload.expenses };
    default:
      return state;
  }
};

export const ExpensesContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const FriendsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ExpensesContext.Provider value={{ state, dispatch }}>{children}</ExpensesContext.Provider>
  );
};
