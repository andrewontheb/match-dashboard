import { Match as MatchProps } from '../types'

function statusRewrite(status: string) {
  let rewrited: string;
  switch(status) {
    case 'Ongoing':
      rewrited = 'Live';
    break;
    case 'Scheduled':
      rewrited = 'Match preparing';
      break;
    default:
      rewrited = status;
  }
  return rewrited;
}

export const Match: React.FC<MatchProps> = ({ awayTeam, awayScore, homeTeam, homeScore, status }) => {
  return (
    <div className='flex items-center justify-between match-row-item px-[16px] py-[8px] br-[4px]'>
      <div className='flex items-center'>
        <img src="src/assets/imgs/teamIcon.svg" alt='matchRow' className='command-image' />
        <p className='ml-4 text-base'>{homeTeam.name} </p>
      </div>

      <div className='flex flex-col items-center'>
        <p className='match-score pb-2'>{homeScore} : {awayScore}</p>
        <div className={`match-status match-status--${status.toLowerCase()} text-xs`}>{statusRewrite(status)}</div>
      </div>

      <div className='flex items-center'>
        <p className='mr-4 text-base'>{awayTeam.name} </p>
        <img src="src/assets/imgs/teamIcon.svg" alt='matchRow' className='command-image' />
      </div>
    </div>
  );
};
