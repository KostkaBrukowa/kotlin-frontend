import React, { FormEvent, useRef } from 'react';
import { Button, Form, Modal } from 'antd';
import { FormInstance } from 'antd/es/form';

import { stopPropagation } from '../utils/functions/utilFunctions';
import { FormFields, FormValues } from './useExpenseForm';

import style from './NewExpense.module.less';

export interface SaveExpenseButtonProps {
  submitting: boolean;
  editMode: boolean;
  initialValues: FormValues | undefined;
  form: FormInstance;
}

export const SaveExpenseButton: React.FC<SaveExpenseButtonProps> = ({
  submitting,
  editMode,
  initialValues,
  form,
}) => {
  const modalContent =
    'Właśnie zmieniasz kwotę wydatku. Wszyscy którzy zaakceptowali ten wydatek będą musieli go zaakceptować ponownie. Jesteś pewien, że chcesz to zrobić?';

  const showPromiseModal = () =>
    Modal.confirm({
      title: 'Edytujesz kwotę',
      content: modalContent,
      maskClosable: true,
      onOk: form.submit,
    });

  const handleClick = (e: FormEvent) => {
    if (!editMode) return;

    const { cost } = form.getFieldsValue() as Record<FormFields, any>;

    if (+cost !== +(initialValues?.cost ?? 0)) {
      e.preventDefault();
      showPromiseModal();
    }
  };

  return (
    <div onClick={handleClick}>
      <Button
        className={style.submitButton}
        htmlType="submit"
        loading={submitting}
        size="large"
        type="primary"
      >
        {editMode ? 'Edytuj' : 'Utwórz wydatek'}
      </Button>
    </div>
  );
};
