import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Loader from '../components/Loader';
import { uploadDocument, verifyDocument } from '../services/api';

const DocumentVerification = () => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [uploadResult, setUploadResult] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Reset state on new file
      setUploadResult(null);
      setVerifyResult(null);
      setHash('');
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadDocument(file);
      setUploadResult(response);
      setHash(response.hash);
    } catch (err) {
      setError('Failed to process document hash.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVerify = async () => {
    if (!hash) return;

    setIsVerifying(true);
    setError(null);

    try {
      const response = await verifyDocument(hash);
      setVerifyResult(response);
    } catch (err) {
      setError('Failed to verify document.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Document Verification</h1>
        <p className="text-slate-400">Generate cryptographic hashes of physical documents and verify them against an authentic record.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Document File</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-xl hover:border-slate-500 hover:bg-slate-800/50 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-400 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-safe-green hover:text-emerald-400 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
              {file && (
                <p className="mt-3 text-sm text-slate-300 flex items-center gap-2">
                  <svg className="w-4 h-4 text-safe-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Selected: <span className="font-semibold text-white">{file.name}</span>
                </p>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={isUploading || !file || uploadResult}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center mb-4"
            >
              {isUploading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 border-t-white" />
                  Generating Hash...
                </>
              ) : (
                'Upload & Generate Hash'
              )}
            </button>

            {uploadResult && (
              <div className="animate-in fade-in duration-300">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg mb-6">
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{uploadResult.hashType} HASH:</span>
                  <p className="text-sm font-mono text-safe-green mt-1 break-all bg-slate-950 p-2 rounded border border-slate-800">
                    {uploadResult.hash}
                  </p>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={isVerifying || !hash || verifyResult}
                  className="w-full bg-safe-green hover:bg-emerald-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isVerifying ? (
                    <>
                      <Loader className="mr-2 h-5 w-5" />
                      Verifying Ledger...
                    </>
                  ) : (
                    'Verify Document Integrity'
                  )}
                </button>
              </div>
            )}

          </div>

          {error && (
            <div className="p-4 bg-risk-red/10 border border-risk-red/30 rounded-lg text-risk-red text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          {verifyResult ? (
            <ResultCard title="Verification Status" className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6 flex flex-col items-center justify-center py-6">
                
                {verifyResult.status === 'AUTHENTIC' ? (
                  <div className="w-20 h-20 rounded-full bg-safe-green/20 flex items-center justify-center border border-safe-green/30 animate-in zoom-in">
                    <svg className="w-10 h-10 text-safe-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-risk-red/20 flex items-center justify-center border border-risk-red/30 animate-in zoom-in">
                    <svg className="w-10 h-10 text-risk-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${verifyResult.status === 'AUTHENTIC' ? 'text-safe-green' : 'text-risk-red'}`}>
                    {verifyResult.status}
                  </h3>
                  <p className="text-slate-300">{verifyResult.message}</p>
                </div>
                
                <div className="w-full pt-6 border-t border-slate-700">
                  <RiskBadge level={verifyResult.status} />
                </div>
              </div>
            </ResultCard>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-800/20 text-slate-500">
              <svg className="w-16 h-16 mb-4 text-slate-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Upload a document and generate its hash to verify its authenticity across the network.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
