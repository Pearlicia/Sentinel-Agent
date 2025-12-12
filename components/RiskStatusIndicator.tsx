import React from 'react';
import { RiskStatus } from '../types';

interface RiskStatusIndicatorProps {
  status: RiskStatus;
}

const RiskStatusIndicator: React.FC<RiskStatusIndicatorProps> = ({ status }) => {
  const statusClasses = status === 'Green'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusClasses}`}>
      <span className={`h-2 w-2 rounded-full ${status === 'Green' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
      Risk Status: {status}
    </span>
  );
};

export default RiskStatusIndicator;
