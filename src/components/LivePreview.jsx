import React from 'react';

export default function LivePreview({ schema, setJsonResult }) {

    // Form Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default browser page reload
        const formData = new FormData(e.target);
        const result = {};

        // Iterate over the schema to correctly handle different field types, especially checkboxes
        schema.forEach(field => {
            const name = field.label;
            if (field.type === 'checkbox') {
                result[name] = formData.getAll(name); // .getAll() captures all values for multi-select checkboxes
            } else {
                result[name] = formData.get(name); // .get() captures the single value for other inputs
            }
        });
        setJsonResult(result); // Pass the final JSON object to the parent component
    };

    return (
        <div className="flex-1 border-l border-slate-200 shadow-lg flex flex-col overflow-hidden bg-slate-50">

            {/* Preview Header */}
            <div className="h-16 border-b border-slate-200 flex items-center justify-center px-8 bg-white shrink-0">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Live Preview</h1>
                    <p className="text-xs text-slate-500 font-medium hidden sm:block">Interact with your form in real-time</p>
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-bl from-slate-50 via-white to-slate-50">
                <div className="max-w-2xl mx-auto h-full">
                    {schema.length === 0 ? (
                        <div className="h-full flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">✨</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Live Preview</h3>
                                <p className="text-slate-600 max-w-sm">Your form will appear here in real-time as you build it on the left.</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {schema.map(field => (
                                <div key={field.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-6 animate-slide-up">
                                    <label className="block text-sm font-bold text-slate-700 mb-3">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>

                                    {field.type === 'dropdown' ? (
                                        <div className="relative w-1/2">
                                            <select name={field.label} required={field.required} className="w-full appearance-none px-4 py-2.5 border border-slate-300 hover:border-emerald-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white text-slate-800 text-sm cursor-pointer shadow-sm">
                                                <option value="">{field.placeholder || 'Select an option'}</option>
                                                {field.options.map((opt, i) => (
                                                    <option key={i} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    ) : field.type === 'checkbox' ? (
                                        <div className="space-y-3">
                                            {field.options.map((opt, i) => (
                                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="checkbox" name={field.label} value={opt} className="w-4 h-4 text-emerald-600 rounded border-slate-300 hover:border-emerald-500 focus:ring-emerald-500 transition-colors cursor-pointer" />
                                                    <span className="text-slate-700 group-hover:text-slate-900 text-sm">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ) : field.type === 'radio' ? (
                                        <div className="space-y-3">
                                            {field.options.map((opt, i) => (
                                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="radio" name={field.label} value={opt} required={field.required} className="w-4 h-4 text-emerald-600 border-slate-300 hover:border-emerald-500 focus:ring-emerald-500 transition-colors cursor-pointer" />
                                                    <span className="text-slate-700 group-hover:text-slate-900 text-sm">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ) : field.type === 'textarea' ? (
                                        <textarea name={field.label} placeholder={field.placeholder || 'Enter text here....'} required={field.required} rows="4" className="w-full px-4 py-2.5 border border-slate-300 hover:border-emerald-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none bg-white text-slate-800 text-sm shadow-sm" />
                                    ) : (
                                        <input type={field.type} name={field.label} placeholder={field.placeholder} required={field.required} className="w-1/2 px-4 py-2.5 border border-slate-300 hover:border-emerald-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white text-slate-800 text-sm shadow-sm" />
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 flex justify-end">
                                <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm">
                                    Submit Form
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}