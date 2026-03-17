// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login


import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-lg space-y-6 animate-in fade-in duration-500">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-slate-400 text-sm mt-2">
            Sign in to continue
          </p>
        </div>

        <form className="space-y-4">

          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-safe-green transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-safe-green transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-safe-green hover:bg-emerald-500 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]"
          >
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
