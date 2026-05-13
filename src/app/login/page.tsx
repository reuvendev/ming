'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { createNewUser } from '@/lib/db';
import { useRouter } from 'next/navigation';
import MingMascot from '@/components/pet/MingMascot';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createNewUser(userCredential.user.uid, email);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message.replace('Firebase:', ''));
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 mb-2">
            <MingMascot mood={isLogin ? "happy" : "chill"} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 font-medium">Focus and grow with Ming</p>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-blue-100/20 border border-slate-100">
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password" 
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:scale-95">
              {isLogin ? 'Sign In' : 'Get Started'}
            </button>
          </form>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-6 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"
          >
            {isLogin ? "New here? Create an account" : "Have an account? Sign in instead"}
          </button>
        </div>
      </div>
    </main>
  );
}