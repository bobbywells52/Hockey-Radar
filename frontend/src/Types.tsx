export type LocalizedString = {
  default: string;
  [key: string]: string;
};

export type DraftDetails = {
  year: number;
  teamAbbrev: string;
  round: number;
  pickInRound: number;
  overallPick: number;
};

export type Stats = {
  assists: number;
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  otGoals: number;
  pim: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  shootingPctg: number;
  shorthandedGoals: number;
  shorthandedPoints: number;
  shots: number;
  avgToi?: string;
  faceoffWinningPctg?: number;
};

export type SeasonAward = {
  assists: number;
  blockedShots: number;
  gameTypeId: number;
  gamesPlayed: number;
  goals: number;
  hits: number;
  pim: number;
  plusMinus: number;
  points: number;
  seasonId: number;
};

export type Award = {
  trophy: LocalizedString;
  seasons: SeasonAward[];
};

export type Player = {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: LocalizedString;
  teamCommonName: LocalizedString;
  teamPlaceNameWithPreposition: LocalizedString;
  firstName: LocalizedString;
  lastName: LocalizedString;
  badges: any[];
  teamLogo: string;
  sweaterNumber: number;
  position: string;
  headshot: string;
  heroImage: string;
  heightInInches: number;
  heightInCentimeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: LocalizedString;
  birthCountry: string;
  shootsCatches: string;
  draftDetails: DraftDetails;
  playerSlug: string;
  inTop100AllTime: number;
  inHHOF: number;
  featuredStats: {
    season: number;
    playoffs: {
      subSeason: Stats;
      career: Stats;
    };
  };
  careerTotals: {
    regularSeason: Stats;
    playoffs: Stats;
  };
  awards: Award[];
};
