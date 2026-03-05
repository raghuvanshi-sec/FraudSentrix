import React from 'react';

const RiskBadge = ({ level }) => {
  const getBadgeStyle = () => {
    switch (level?.toUpperCase()) {
      case 'LOW':
      case 'SAFE':
      case 'AUTHENTIC':
        return 'bg-safe-green/20 text-safe-green border-safe-green/30';
      case 'MEDIUM':
      case 'SUSPICIOUS':
        return 'bg-suspicious-yellow/20 text-suspicious-yellow border-suspicious-yellow/30';
      case 'HIGH':
      case 'TAMPERED':
      case 'SCAM':
        return 'bg-risk-red/20 text-risk-red border-risk-red/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!level) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}
    >
      {level.toUpperCase()}
    </span>
  );
};

export default RiskBadge;
