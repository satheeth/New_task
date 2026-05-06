import React, { useState, useEffect } from 'react';
import FormBuilder from './components/FormBuilder';
import LivePreview from './components/LivePreview';
import { Icons } from './components/Icons';

export default function App() {
  const [schema, setSchema] = useState([]);
  const [jsonResult, setJsonResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('form_builder_schema');
    if (saved) setSchema(JSON.parse(saved));
  }, []);

  // Clear everything
  const handleClear = () => {
    if (window.confirm('Clear all fields and results?')) {
      setSchema([]);
      setJsonResult(null);
      localStorage.removeItem('form_builder_schema');
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-800">
      <FormBuilder schema={schema} setSchema={setSchema} onClear={handleClear} />
      <LivePreview schema={schema} setJsonResult={setJsonResult} />

      {/* JSON Output Popup Modal */}
      {jsonResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700 animate-slide-up flex flex-col max-h-[90vh]">
            {/* Header - Terminal Style */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-700 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest ml-2">
                  FormData.json
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(jsonResult, null, 2));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={`p-2 rounded-lg transition-all transform hover:scale-110 ${copied
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'hover:bg-slate-700 text-slate-400'
                    }`}
                  title="Copy to clipboard"
                >
                  {copied ? '✓' : <Icons.Copy />}
                </button>
                <button
                  onClick={() => setJsonResult(null)}
                  className="p-2 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-auto bg-slate-900">
              <pre className="font-mono text-sm leading-relaxed text-emerald-400 selection:bg-indigo-500 selection:text-white whitespace-pre-wrap break-words">
                {JSON.stringify(jsonResult, null, 2)}
              </pre>
            </div>

            {/* Footer - Status Bar */}
            <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-700 flex justify-between items-center text-xs shrink-0">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Successfully Submitted
              </span>
              <span className="text-slate-500 font-mono">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
