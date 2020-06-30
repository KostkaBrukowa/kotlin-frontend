import React, { createContext, Reducer, useReducer } from 'react';
import { ActionPayload } from '../utils/context/types';

type StateType = {
  currentOwsType: OwsType;
  showFinished: boolean;
};

export enum ActionType {
  CHANGE_OWS_TYPE,
  SET_FINISHED_EXPENSES,
}

export enum OwsType {
  USER_OWS,
  OWS_USER,
}

export type Action =
  | ActionPayload<ActionType.CHANGE_OWS_TYPE, Pick<StateType, 'currentOwsType'>>
  | ActionPayload<ActionType.SET_FINISHED_EXPENSES, Pick<StateType, 'showFinished'>>;

const initialState: StateType = {
  currentOwsType: OwsType.OWS_USER,
  showFinished: false,
};

const productReducer: Reducer<StateType, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_OWS_TYPE:
      return { ...state, currentOwsType: action.payload.currentOwsType };
    case ActionType.SET_FINISHED_EXPENSES:
      return { ...state, showFinished: action.payload.showFinished };
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

export const ExpenseProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ExpensesContext.Provider value={{ state, dispatch }}>{children}</ExpensesContext.Provider>
  );
};
