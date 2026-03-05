import React from 'react';

const Loader = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-safe-green animate-spin"></div>
    </div>
  );
};

export default Loader;
