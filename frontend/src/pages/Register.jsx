// import React from 'react'

// const Register = () => {
//   return (
//     <div>Register</div>
//   )
// }

// export default Register

import React, { useState } from 'react';
import InputBox from '../components/InputBox';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Placeholder: just log values for now
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">Register</h2>
        <InputBox
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-4 rounded-lg transform transition-transform duration-200 hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;