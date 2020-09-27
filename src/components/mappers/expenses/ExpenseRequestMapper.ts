import { NewExpenseInput, UpdateExpenseInput } from '../../../generated/graphql';
import { FormValues } from '../../new-expense/useExpenseForm';
import { RequestMapper } from '../mapper';

export class ExpenseRequestMapper extends RequestMapper<FormValues, NewExpenseInput> {
  public toRequest(model: FormValues): NewExpenseInput {
    const { partyId, partyType, name, cost, date, participantIds, description } = model;

    return {
      amount: +cost,
      description,
      expenseDate: date.toISOString(),
      name: name ?? '',
      participants: participantIds,
      partyId: partyId ?? '0',
    };
  }

  public toUpdateRequest(model: FormValues, expenseId: string): UpdateExpenseInput {
    const { name, cost, date, description } = model;

    return {
      id: expenseId,
      amount: +cost,
      description,
      expenseDate: date.toISOString(),
      name: name ?? '',
    };
  }
}
