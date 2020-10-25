import { useEditUserDataMutation } from '../../../generated/graphql';

export const useEditUserData = () => {
  const [editUserData, { loading }] = useEditUserDataMutation();

  return {
    loading,
    editUserData: (name: string | null, bankAccount: string | null) =>
      editUserData({ variables: { name, bankAccount } }),
  };
};
