import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1520] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-[#131d2b]/50 p-8 border border-[#1b2636] shadow-xl w-full max-w-md space-y-6 animate-fade-slide-up"
      >
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-white font-syne uppercase tracking-wider italic">Initialize Account</h2>
           <p className="text-slate-500 text-sm mt-2 font-medium">Create your TrustLayer-X credentials</p>
        </div>
        
        <div>
          <label className="text-[10px] text-[#22d3ee] font-bold block mb-2 font-syne tracking-[0.2em] uppercase">Email Identity</label>
          <input
            type="email"
            placeholder="system@access.root"
            className="w-full bg-[#0d1520] border border-[#1b2636] px-4 py-3 rounded-none text-white focus:outline-none focus:border-[#22d3ee] transition-all font-dmsans placeholder:text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
           <label className="text-[10px] text-[#22d3ee] font-bold block mb-2 font-syne tracking-[0.2em] uppercase">Secure Cipher</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-[#0d1520] border border-[#1b2636] px-4 py-3 rounded-none text-white focus:outline-none focus:border-[#22d3ee] transition-all font-dmsans"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#22d3ee] hover:bg-[#0891b2] text-[#0d1520] font-bold py-4 px-4 transition-all duration-300 uppercase tracking-[0.25em] text-[10px] font-syne mt-4 shadow-lg shadow-[#22d3ee]/10"
        >
          Activate Credentials
        </button>
      </form>
    </div>
  );
};

export default Register;