export interface CountableWordVariations {
  singular: string;
  betweenTwoAndFour: string;
  plural: string;
}

export class CountableWordVariator {
  public constructor(private variations: CountableWordVariations) {}

  public forCount(count: number): string {
    const { singular, betweenTwoAndFour, plural } = this.variations;

    if (count === 1) {
      return singular;
    }

    const lastDigit = count % 10;
    const lastDecimal = count % 100;
    const lastDigitBetweenTwoAndFour = lastDigit >= 2 && lastDigit <= 4;
    const lastDecimalBesidesTenToTwenty = lastDecimal < 10 || lastDecimal >= 20;

    if (lastDigitBetweenTwoAndFour && lastDecimalBesidesTenToTwenty) {
      return betweenTwoAndFour;
    }

    return plural;
  }
}

export class Xaaaa {}
