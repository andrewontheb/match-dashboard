import React, { useState, Suspense } from 'react'
import { Match as MatchProps } from '../types'
import { useSpring, animated } from '@react-spring/web'


const statusRewrite = (status: string): string => {
  const statusMap: Record<string, string> = {
    Ongoing: 'Live',
    Scheduled: 'Match preparing',
  };
  return statusMap[status] || status;
};

const MatchDetails = React.lazy(() => import("./MatchDetails"));

export const Match: React.FC<MatchProps> = ({ awayTeam, awayScore, homeTeam, homeScore, status }) => {
  const [isDetailsOpened, setIsDetailsOpened] = useState<boolean>(false);
  const { homeScore: animatedHomeScore, awayScore: animatedAwayScore } = useSpring({
    homeScore,
    awayScore,
  });
  const toggleDetails = () => setIsDetailsOpened((prev) => !prev);

  return (
    <div className='match-row-item px-[16px] py-[8px]'>

      <div className="flex items-center justify-between w-full">
        <div className='flex items-center'>
          <img src="src/assets/imgs/teamIcon.svg" alt='matchRow' className='command-image' />
          <p className='ml-4 text-base'>{homeTeam.name} </p>
        </div>

        <div className='flex flex-col items-center'>
          <p className='match-score pb-2'>
            <animated.span>{animatedHomeScore.to((n: number) => n.toFixed(0))}</animated.span> :{' '}
            <animated.span>{animatedAwayScore.to((n: number) => n.toFixed(0))}</animated.span>
          </p>
          <div className={`match-status match-status--${status.toLowerCase()} text-xs`}>
            {statusRewrite(status)}
          </div>
        </div>

        <div className='flex items-center'>
          <p className='mr-4 text-base'>{awayTeam.name} </p>
          <img src="src/assets/imgs/teamIcon.svg" alt='matchRow' />
          <div className="arrow-dropdown" onClick={toggleDetails}>
            <svg className="w-4 h-4 ms-5 cursor-pointer" fill="none" viewBox="0 0 10 6" style={{
              transition: "transform 0.3s ease",
              transform: isDetailsOpened ? "rotate(180deg)" : "rotate(0deg)",
            }}>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>
      {
        isDetailsOpened && (
          <>
              <Suspense fallback={<div className='flex items-center justify-center flex-1 px-[16px]'>Загрузка...</div>}>
                <div className='fade-in flex gap-[32px] mt-12 max-sm:flex-col'>
                  <MatchDetails {...homeTeam} />
                  <MatchDetails {...awayTeam} />
                </div>
              </Suspense>            
          </>
        )
      }
    </div>
  );
};
