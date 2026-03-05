import React from 'react';

const ResultCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-bg-card border border-slate-700 rounded-xl overflow-hidden shadow-xl ${className}`}>
      {title && (
        <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default ResultCard;
