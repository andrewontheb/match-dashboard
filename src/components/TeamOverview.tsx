import React from 'react'

// TeamOverview Component
const TeamOverview: React.FC<{ points: number; place: number; total_kills: number }> = ({ points, place, total_kills }) => (
    <div className="match-details__teamOverview flex items-center basis-full justify-between px-[24px]">
      <span className="overview-label">
        Points: <span className="overview-value">+{points}</span>
      </span>
      <span className="overview-label">
        Место: <span className="overview-value">{place}</span>
      </span>
      <span className="overview-label">
        Всего убийств: <span className="overview-value">{total_kills}</span>
      </span>
    </div>
  );

  export default TeamOverview;