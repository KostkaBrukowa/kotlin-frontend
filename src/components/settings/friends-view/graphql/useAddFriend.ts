import { Reference } from '@apollo/client';

import { useAddFriendMutation, UserListDataFragmentDoc } from '../../../../generated/graphql';

export const useAddFriend = () => {
  const [addFriendMutation, { loading }] = useAddFriendMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      console.log('data', data);
      cache.modify({
        fields: {
          findUsersFriends(existingFriends: Reference[] = []) {
            const newTodoRef = cache.writeFragment({
              data: data?.addFriend,
              fragment: UserListDataFragmentDoc,
            });

            return [...existingFriends, newTodoRef];
          },
        },
      });
    },
  });

  return {
    loading,
    addFriend: (friendEmail: string) =>
      addFriendMutation({ variables: { userEmail: friendEmail } }),
  };
};
