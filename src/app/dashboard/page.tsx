'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { updateDailyGoal } from '@/lib/db';
import StudyRoom from "@/components/timer/StudyRoom";
import MingMascot from '@/components/pet/MingMascot';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const { userData, loading } = useUser();
  const router = useRouter();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const prevLevel = useRef<number | null>(null);

  useEffect(() => {
    if (!loading && !userData) router.push('/login');
    
    if (userData?.level && prevLevel.current !== null && userData.level > prevLevel.current) {
      toast.success(`Level Up: LVL ${userData.level}`);
    }
    prevLevel.current = userData?.level || null;
  }, [userData, loading, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen pb-12 bg-[#F8FAFC]">
      <Toaster position="bottom-right" />
      
      <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-slate-100/50">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <div>
              <h2 className="font-black text-2xl tracking-tighter text-slate-900">Ming</h2>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Focus Studio</p>
            </div>
          </div>
          <div className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl shadow-slate-200">
            <span className="text-xs font-black tracking-widest uppercase text-slate-300">Level {userData?.level || 1}</span>
            <div className="w-5 h-5 bg-blue-500 rounded-md" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Mascot & Timer */}
        <div className="lg:col-span-8 space-y-8"> {/* Reduced space-y-12 to space-y-8 */}
          <section className="bg-white rounded-[3rem] p-10 shadow-premium border border-white/50 flex flex-col items-center">
             
             {/* Mascot Area */}
             <MingMascot action={isTimerActive ? 'studying' : 'idle'} />
             
             {/* Divider & Timer Area - Reduced top margin significantly */}
             <div className="w-full mt-6 border-t border-slate-50 pt-6"> 
                <StudyRoom onStatusChange={(running) => setIsTimerActive(running)} />
             </div>
             
          </section>

          {/* Growth Progress */}
          <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100/50">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="font-black text-slate-800 text-xl tracking-tight">Growth Progress</h3>
              <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black">
                {Math.round(userData?.progressPercentage || 0)}%
              </div>
            </div>
            <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-inner">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000 rounded-full"
                style={{ width: `${userData?.progressPercentage || 0}%` }}
              />
            </div>
          </section>
        </div>

        {/* Right Column: Daily Goals */}
        <div className="lg:col-span-4 space-y-12">
          <section className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100/50">
            <h3 className="font-black text-slate-800 text-lg mb-8 tracking-tight">Daily Protocol</h3>
            <div className="space-y-4">
              {[
                { id: 'session', label: 'Start First Session', checked: userData?.xp > 0, auto: true },
                { id: 'studyTwoHours', label: '2h Focus Target', checked: userData?.dailyGoals?.studyTwoHours },
                { id: 'feedMing', label: 'Clean Mascot Habitat', checked: userData?.dailyGoals?.feedMing },
              ].map((goal) => (
                <div key={goal.id} className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all ${
                  goal.checked ? 'bg-slate-50 border-transparent opacity-60' : 'bg-white border-slate-50 hover:border-blue-100'
                }`}>
                  <input 
                    type="checkbox"
                    checked={goal.checked || false}
                    onChange={(e) => !goal.auto && updateDailyGoal(userData.uid, goal.id, e.target.checked)}
                    className="w-6 h-6 rounded-xl border-2 border-slate-200 text-blue-600 cursor-pointer"
                    disabled={goal.auto}
                  />
                  <span className={`text-sm font-bold tracking-tight ${goal.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {goal.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Card */}
          <section className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px]" />
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-4 block">Lifetime Focus</span>
              <h2 className="text-6xl font-black tracking-tighter mb-8 italic">
                {(userData?.totalMinutes / 60 || 0).toFixed(1)}
                <span className="text-xl font-medium text-slate-500 ml-2 not-italic">HRS</span>
              </h2>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl inline-block text-[10px] font-bold tracking-widest text-slate-300">PUSPIN EDITION</div>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}