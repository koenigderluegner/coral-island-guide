export const Weathers = ['Sunny', 'Rain', 'Storm', 'Windy', 'Snow', 'Blizzard'] as const;

export type Weather = typeof Weathers[number];
