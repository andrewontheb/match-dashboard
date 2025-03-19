export interface Match {
    awayTeam: { name: string };
    awayScore: number;
    homeTeam: { name: string };
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
  