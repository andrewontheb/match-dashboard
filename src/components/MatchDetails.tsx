import React from 'react';
import { Player, Team } from '../types';
import PlayerInfo from './PlayerInfo';
import TeamOverview from './TeamOverview';

const MatchDetails: React.FC<Team> = ({ players, points, place, total_kills }) => (
    <div className="flex items-center justify-center flex-wrap match-details gap-2 sm:after:hidden">
      {players.map((player: Player, index: number) => (
        <PlayerInfo key={index} {...player} />
      ))}
      <TeamOverview points={points} place={place} total_kills={total_kills} />
    </div>
  );

  export default MatchDetails;
