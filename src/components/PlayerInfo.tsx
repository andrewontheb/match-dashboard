import React from 'react'
import { Player } from '../types'

// Non-breaking space utility
const Nbsp = () => '\u00A0';

// PlayerInfo Component
const PlayerInfo: React.FC<Player> = ({ username, kills }) => (
  <div className="flex justify-between items-center match-details__userInfo px-[24px]">
    <div className="flex items-center">
      <img src="src/assets/imgs/userAvatar.svg" alt="userAvatar" />
      <span className="text-base ml-2 font-semibold overflow-hidden text-ellipsis">{username}</span>
    </div>
    <span className="font-medium text-sm text-[#FAFAFA]/40">
      Убийств:<Nbsp />
      <span className="ml-2 text-base font-semibold text-[#F2F6F6]">{kills}</span>
    </span>
  </div>
);

export default PlayerInfo;