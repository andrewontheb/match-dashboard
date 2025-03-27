export interface Match {
  awayTeam: Team;
  awayScore: number;
  homeTeam: Team;
  homeScore: number;
  time: string;
  title: string;
  status: string;
}

export interface ApiResponse {
  data: {
    matches: Match[];
  };
}

export interface Team {
  name: string;
  points: number;
  place: number;
  total_kills: number;
  players: Player[]
}

export type Player = {
  username: string;
  kills: number;
}

export enum MatchStatus {
  ALL = 'All',
  ONGOING = 'Ongoing',
  SCHEDULED = 'Scheduled',
  FINISHED = 'Finished'
}
