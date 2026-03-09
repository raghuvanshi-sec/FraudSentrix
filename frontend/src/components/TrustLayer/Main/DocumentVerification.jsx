import React, { useState } from 'react';
import { FileSearch, UploadCloud, CheckCircle2 } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function DocumentVerification() {
  const [status, setStatus] = useState('idle'); // idle, uploading, done

  const handleUpload = () => {
    setStatus('uploading');
    setTimeout(() => setStatus('done'), 2000);
  };

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] p-6 animate-fade-slide-up opacity-0 relative" style={{ animationDelay: '500ms' }}>
      <div className="absolute top-0 left-0 w-[4px] h-full bg-[#10b981]" />

      <div className="flex items-center gap-2 mb-6">
        <FileSearch size={18} className="text-[#10b981]" />
        <h2 className="font-syne font-bold text-white tracking-wide">Document Verification</h2>
      </div>

      {status === 'done' ? (
        <div className="bg-[#0d1520] border border-[#10b981]/30 p-8 flex flex-col items-center justify-center text-center animate-fade-slide-up">
          <CheckCircle2 size={48} className="text-[#10b981] mb-6" strokeWidth={1.5} />
          <h3 className="font-syne font-bold text-white text-xl mb-2">Signature Verified</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            The document <span className="text-white font-medium">Example_Contract.pdf</span> has not been tampered with. Digital seals match the original issuer.
          </p>
          <div className="mb-6">
            <Badge level="LOW" />
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className="text-[11px] font-bold uppercase tracking-widest text-[#10b981] hover:text-[#10b981]/80 transition-colors"
          >
            Scan Another Document
          </button>
        </div>
      ) : (
        <div 
          onClick={handleUpload}
          className={`
            border border-dashed border-[#1b2636] hover:border-[#10b981]/50 bg-[#0d1520]/50 
            p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group
            ${status === 'uploading' ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          {status === 'uploading' ? (
            <div className="w-12 h-12 border-4 border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin mb-4" />
          ) : (
            <UploadCloud size={48} strokeWidth={1} className="text-slate-600 group-hover:text-[#10b981] transition-colors mb-4" />
          )}
          <h3 className="font-syne font-bold font-medium text-white mb-2">Drop PDF here or click to upload</h3>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Supports PDF, DOCX up to 10MB</p>
        </div>
      )}
    </section>
  );
}
