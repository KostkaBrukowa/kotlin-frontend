import React from 'react';
import { RouteComponentProps } from '@reach/router';

export type NewExpenseProps = RouteComponentProps;

export const NewExpense: React.FC<NewExpenseProps> = (props) => <p>Hello from new expense</p>;
