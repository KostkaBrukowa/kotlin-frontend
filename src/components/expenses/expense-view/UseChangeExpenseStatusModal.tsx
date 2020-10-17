import React from 'react';
import { Form, Input, Modal } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';

import { validateMessages } from '../../utils/form/validationMessages';
import { useChangeExpenseStatus } from './graphql/useChangeExpenseStatus';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { ExpenseStatus } from '../../../generated/graphql';

export interface ChangeExpenseModalProps {
  expenseId: string;
  expenseStatus: ExpenseStatus;
}

export const useChangeExpenseStatusModal = ({
  expenseId,
  expenseStatus,
}: ChangeExpenseModalProps) => {
  const { loading, changeExpenseStatus } = useChangeExpenseStatus(expenseId, expenseStatus);

  const openModal = () => {
    Modal.confirm({
      maskClosable: true,
      title: getTitleForStatus(expenseStatus),
      icon: <ExclamationCircleOutlined />,
      content: getModalContentForStatus(expenseStatus),
      onOk: changeExpenseStatus,
      onCancel() {},
    });
  };

  return openModal;
};

const getTitleForStatus = (expenseStatus: ExpenseStatus): string => {
  switch (expenseStatus) {
    case ExpenseStatus.Resolved:
      return 'Właśnie kończysz wydatek';
    case ExpenseStatus.InProgressPaying:
      return 'Potwierdź płatności użytkowników';
    default:
      return '';
  }
};

const getModalContentForStatus = (expenseStatus: ExpenseStatus): string => {
  switch (expenseStatus) {
    case ExpenseStatus.Resolved:
      return 'Potwierdzasz, że każdy uczestnik oddał swoja część i wszystko jest git.';
    case ExpenseStatus.InProgressPaying:
      return `Wszyscy uczestnicy wydatku potwierdzili albo odrzucili swój udział. Właśnie potwierdzasz, że
      zgadzasz się ze wszystkimi i uczestnicy mogą zacząć płacić za swoją część.`;
    default:
      return '';
  }
};