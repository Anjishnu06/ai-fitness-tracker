import React from 'react';
import { IconType } from 'react-icons';
import { HiOutlineClock, HiFire, HiOutlineAdjustments } from 'react-icons/hi';

interface StatsCardProps {
  title: string;
  value: string;
  Icon: IconType;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, color }) => {
  return (
    <div className={`bg-${color}-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between w-full`}>
      <div>
        <Icon className="text-2xl" />
        <p className="text-sm">{title}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
