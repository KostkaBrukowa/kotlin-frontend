import { CountableWordVariator } from '../../utils/functions/WordVariator';

export const differentLabel = new CountableWordVariator({
  singular: 'inny',
  betweenTwoAndFour: 'innych',
  plural: 'innych',
});

export const getFriendCountText = (wordsCount: number): string | null =>
  wordsCount >= 1 ? ` i ${wordsCount} ${differentLabel.forCount(wordsCount)}` : null;
