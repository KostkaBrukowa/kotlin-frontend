import { Reference } from '@apollo/client';

import { useRemoveFriendMutation } from '../../../../generated/graphql';

export const useRemoveFriend = (id: string) => {
  const [removeFriend] = useRemoveFriendMutation({
    variables: { friendId: id },
    update: (cache) => {
      cache.modify({
        fields: {
          findUsersFriends(existingFriends: Reference[] = [], { readField }) {
            return existingFriends.filter((it) => id !== readField('id', it));
          },
        },
      });
    },
  });

  return {
    removeFriend,
  };
};
