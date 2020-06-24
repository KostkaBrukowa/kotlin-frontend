export {};
// import React, { createContext, useReducer } from 'react';
// import App from '../App';
//
// type ProductType = {
//   id: number;
//   name: string;
//   price: number;
// };
//
// type InitialStateType = {
//   products: ProductType[];
// };
//
// const initialState = {
//   products: [],
// };
//
// export const productReducer = (): InitialStateType => ({
//   products: [],
// });
//
// const AppContext = createContext<{
//   state: InitialStateType;
//   dispatch: React.Dispatch<any>;
// }>({
//   state: initialState,
//   dispatch: () => null,
// });
//
// const AppProvider: React.FC = ({ children }) => {
//   const [state, dispatch] = useReducer(productReducer, initialState);
//
//   return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
// };
//
// export { AppContext, AppProvider };
