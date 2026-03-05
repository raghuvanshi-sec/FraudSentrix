import React from 'react';

const InputBox = ({ label, id, type = 'text', as = 'input', rows = 4, className = '', ...props }) => {
  const Component = as;
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <Component
        id={id}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        className="bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-safe-green focus:border-transparent px-4 py-2.5 outline-none transition-all placeholder-slate-500"
        {...props}
      />
    </div>
  );
};

export default InputBox;
