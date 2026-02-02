import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert("Google Sign-In failed. Make sure it is enabled in Firebase Console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl w-full max-w-sm bg-white/70 shadow-2xl border-white/50"
      >
        <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          {isLogin ? 'Welcome Back' : 'Join Us'}
        </h2>
        <p className="text-center text-slate-500 mb-8 text-sm">
          {isLogin ? 'Enter your details to access tasks' : 'Create an account to get started'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-slate-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-slate-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-rose-400/30 transition-all active:scale-95"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300/50"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/50 px-2 text-slate-400 backdrop-blur-sm">Or continue with</span>
          </div>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full bg-white hover:bg-rose-50 text-slate-600 font-medium py-3 rounded-xl border border-rose-100 shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-rose-500 hover:text-rose-600 font-semibold transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;