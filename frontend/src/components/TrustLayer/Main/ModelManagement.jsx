import React, { useState, useEffect } from 'react';
import { Brain, RefreshCw, CheckCircle2, AlertCircle, History, BarChart2 } from 'lucide-react';
import axios from 'axios';

export default function ModelManagement() {
  const [status, setStatus] = useState(null);
  const [training, setTraining] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/ml/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus(response.data);
    } catch (err) {
      console.error("Failed to fetch ML status:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTrain = async () => {
    setTraining(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/ml/train', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStatus();
    } catch (err) {
      setError(err.response?.data?.error || "Training failed");
    } finally {
      setTraining(false);
    }
  };

  if (!status) return null;

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] p-8 animate-fade-slide-up rounded-none opacity-0" style={{ animationDelay: '800ms' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff2a2a]/10 flex items-center justify-center">
            <Brain size={20} className="text-[#ff2a2a]" />
          </div>
          <div>
            <h2 className="font-syne font-bold text-white tracking-wide">Neural Engine Control</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Model Management & Training</p>
          </div>
        </div>
        
        <button 
          onClick={handleTrain}
          disabled={training}
          className={`flex items-center gap-2 px-6 py-2 rounded-none font-syne font-bold text-xs tracking-widest transition-all ${
            training 
            ? 'bg-[#1b2636] text-slate-500 cursor-not-allowed' 
            : 'bg-[#ff2a2a] text-white hover:bg-[#e62020]'
          }`}
        >
          {training ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <RefreshCw size={14} />
          )}
          {training ? 'EVOLVING...' : 'RETRAIN BRAIN'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Status Card */}
        <div className="p-4 bg-[#0d1520] border border-[#1b2636] flex items-center gap-4">
          {status.isTrained ? (
            <CheckCircle2 size={24} className="text-[#10b981]" />
          ) : (
            <AlertCircle size={24} className="text-[#fde047]" />
          )}
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Deploy Status</span>
            <span className="text-sm font-bold text-white">{status.isTrained ? 'ACTIVE' : 'INACTIVE'}</span>
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="p-4 bg-[#0d1520] border border-[#1b2636] flex items-center gap-4">
          <BarChart2 size={24} className="text-[#22d3ee]" />
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Confidence Index</span>
            <span className="text-sm font-bold text-white">{status.accuracy}</span>
          </div>
        </div>

        {/* Dataset Card */}
        <div className="p-4 bg-[#0d1520] border border-[#1b2636] flex items-center gap-4">
          <History size={24} className="text-[#fde047]" />
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Training Corpus</span>
            <span className="text-sm font-bold text-white">{status.totalSamples} Datapoints</span>
          </div>
        </div>

        {/* Last Trained Card */}
        <div className="p-4 bg-[#0d1520] border border-[#1b2636] flex items-center gap-4">
          <RefreshCw size={24} className="text-slate-500" />
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Last Synapse</span>
            <span className="text-sm font-bold text-white">
              {status.lastTrained ? new Date(status.lastTrained).toLocaleTimeString() : 'NEVER'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-[#ff2a2a]/10 border border-[#ff2a2a]/30 text-[#ff2a2a] text-xs font-bold flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Progress Visualization */}
      {training && (
        <div className="mt-8 space-y-3">
          <div className="flex justify-between items-end">
             <span className="text-[10px] font-bold text-[#ff2a2a] uppercase tracking-widest animate-pulse">Processing Neural Weights...</span>
             <span className="text-xs font-syne font-bold text-white">GEN-V PHASE</span>
          </div>
          <div className="h-1 bg-[#1b2636] w-full relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-[#ff2a2a] animate-shimmer" style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </section>
  );
}
