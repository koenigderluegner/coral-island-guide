export const Seasons = ['Spring', 'Summer', 'Fall', 'Winter'] as const;

export type Season = typeof Seasons[number];
