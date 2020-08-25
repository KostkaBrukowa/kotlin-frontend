import React, { createContext, Reducer, useReducer } from 'react';

import { ActionPayload } from '../utils/context/types';

type StateType = {
  currentOwsType: OwsType;
  activeEventsTab: EventsTabKeys;
  showFinished: boolean;
};

export enum ActionType {
  CHANGE_OWS_TYPE,
  SET_FINISHED_EXPENSES,
  SET_EVENTS_TAB,
}

export enum OwsType {
  USER_OWS,
  OWS_USER,
}

export enum EventsTabKeys {
  EVENTS = 'EVENTS',
  GROUPS = 'GROUPS',
  FRIENDS = 'FRIENDS',
}

export type Action =
  | ActionPayload<ActionType.CHANGE_OWS_TYPE, Pick<StateType, 'currentOwsType'>>
  | ActionPayload<ActionType.SET_FINISHED_EXPENSES, Pick<StateType, 'showFinished'>>
  | ActionPayload<ActionType.SET_EVENTS_TAB, Pick<StateType, 'activeEventsTab'>>;

const initialState: StateType = {
  currentOwsType: OwsType.OWS_USER,
  showFinished: false,
  activeEventsTab: EventsTabKeys.EVENTS,
};

const productReducer: Reducer<StateType, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_OWS_TYPE:
      return { ...state, currentOwsType: action.payload.currentOwsType };
    case ActionType.SET_FINISHED_EXPENSES:
      return { ...state, showFinished: action.payload.showFinished };
    case ActionType.SET_EVENTS_TAB:
      return { ...state, activeEventsTab: action.payload.activeEventsTab };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
