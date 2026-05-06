import React, { useState } from 'react';
import { Icons } from './Icons';

export const FIELD_TYPES = [
    { type: 'text', label: 'Text Field', icon: <Icons.Text />, color: 'bg-blue-50 text-blue-700' },
    { type: 'number', label: 'Number', icon: <Icons.Number />, color: 'bg-amber-50 text-amber-700' },
    { type: 'dropdown', label: 'Dropdown', icon: <Icons.Dropdown />, color: 'bg-pink-50 text-pink-700' },
    { type: 'email', label: 'Email', icon: <Icons.Email />, color: 'bg-purple-50 text-purple-700' },
    { type: 'textarea', label: 'Long Text', icon: <Icons.Textarea />, color: 'bg-cyan-50 text-cyan-700' },
    { type: 'checkbox', label: 'Checkbox', icon: <Icons.Checkbox />, color: 'bg-green-50 text-green-700' },
    { type: 'radio', label: 'Radio', icon: <Icons.Radio />, color: 'bg-indigo-50 text-indigo-700' },
];

export default function FormBuilder({ schema, setSchema, onClear }) {
    const [copied, setCopied] = useState(false);

    // Save to LocalStorage with success feedback
    const handleSave = () => {
        localStorage.setItem('form_builder_schema', JSON.stringify(schema));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Add Field
    const addField = (type) => {
        const newField = {
            id: crypto.randomUUID(),
            type,
            label: `New ${FIELD_TYPES.find(f => f.type === type)?.label || type}`,
            placeholder: ['dropdown', 'checkbox', 'radio'].includes(type) ? '' : 'Enter text here...',
            required: false,
            options: ['dropdown', 'checkbox', 'radio'].includes(type) ? ['Option 1', 'Option 2'] : []
        };
        setSchema([...schema, newField]);
    };

    // Update Field Properties
    const updateField = (id, key, val) => {
        setSchema(schema.map(f => f.id === id ? { ...f, [key]: val } : f));
    };

    // Remove Field
    const removeField = (id) => {
        setSchema(schema.filter(f => f.id !== id));
    };

    // Reorder Fields
    const moveField = (index, direction) => {
        const newSchema = [...schema];
        const target = index + direction;
        if (target >= 0 && target < newSchema.length) {
            [newSchema[index], newSchema[target]] = [newSchema[target], newSchema[index]];
            setSchema(newSchema);
        }
    };

    // Update Dropdown/Checkbox/Radio Options
    const updateOption = (fieldId, optIdx, val) => {
        setSchema(schema.map(f => {
            if (f.id !== fieldId) return f;
            const newOpts = [...f.options];
            newOpts[optIdx] = val;
            return { ...f, options: newOpts };
        }));
    };

    // Add option to field
    const addOption = (fieldId) => {
        setSchema(schema.map(f =>
            f.id === fieldId ? { ...f, options: [...f.options, 'New Option'] } : f
        ));
    };

    // Remove option from field
    const removeOption = (fieldId, optIdx) => {
        setSchema(schema.map(f =>
            f.id === fieldId ? { ...f, options: f.options.filter((_, i) => i !== optIdx) } : f
        ));
    };

    // Get field type info
    const getFieldTypeInfo = (type) => {
        return FIELD_TYPES.find(ft => ft.type === type) || FIELD_TYPES[0];
    };

    return (
        <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">

            {/* TOP NAVIGATION BAR */}
            <div className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Form Builder</h1>
                        <p className="text-xs text-slate-500">Create beautiful forms effortlessly</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-sm text-slate-600 font-medium">
                        {schema.length > 0 && (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                {schema.length} field{schema.length !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 flex items-center gap-2 ${copied
                            ? 'bg-green-500 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                            }`}
                    >
                        {copied ? (
                            <>
                                <span>✓</span>
                                <span>Saved</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V3" />
                                </svg>
                                <span>Save</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClear}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all text-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* CANVAS AREA */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-2xl mx-auto">

                    {/* Field Types Toolbar */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                        <p className="text-xs font-black text-slate-600 uppercase mb-4 tracking-widest">Add Field</p>
                        <div className="flex flex-wrap gap-3">
                            {FIELD_TYPES.map((fieldType) => (
                                <button
                                    key={fieldType.type}
                                    onClick={() => addField(fieldType.type)}
                                    className="group flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                                    title={`Add ${fieldType.label}`}
                                >
                                    <span className={`text-lg transition-transform group-hover:scale-110 ${fieldType.color.split(' ')[1]}`}>
                                        {fieldType.icon}
                                    </span>
                                    <span className="text-sm font-bold text-slate-700">{fieldType.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {schema.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">📝</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Start Building Your Form</h3>
                                <p className="text-slate-600 max-w-sm">Select a field type from the top toolbar to add fields to your form. Customize labels, add options, and build the perfect form.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Form Fields</h2>
                            {schema.map((field, idx) => {
                                const fieldInfo = getFieldTypeInfo(field.type);
                                return (
                                    <div
                                        key={field.id}
                                        className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all p-6 animate-slide-up"
                                    >
                                        {/* Field Header */}
                                        <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-100">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${fieldInfo.color}`}>
                                                    {fieldInfo.label}
                                                </div>
                                                <span className="text-xs text-slate-500 font-medium">#{idx + 1}</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => moveField(idx, -1)}
                                                    disabled={idx === 0}
                                                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-slate-500"
                                                    title="Move up"
                                                >
                                                    <Icons.ChevronUp />
                                                </button>
                                                <button
                                                    onClick={() => moveField(idx, 1)}
                                                    disabled={idx === schema.length - 1}
                                                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-slate-500"
                                                    title="Move down"
                                                >
                                                    <Icons.ChevronDown />
                                                </button>
                                                <button
                                                    onClick={() => removeField(field.id)}
                                                    className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                                                    title="Delete field"
                                                >
                                                    <Icons.Trash />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Field Configuration */}
                                        <div className="space-y-5">
                                            {/* Label Input */}
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 uppercase block mb-2">Field Label</label>
                                                <input
                                                    value={field.label}
                                                    onChange={e => updateField(field.id, 'label', e.target.value)}
                                                    className="w-1/2 px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                                                    placeholder="e.g., Your Name"
                                                />
                                            </div>

                                            {/* Placeholder & Required */}
                                            <div className="flex items-end gap-4">
                                                <div className="w-1/2">
                                                    <label className="text-xs font-bold text-slate-600 uppercase block mb-2">Placeholder</label>
                                                    <input
                                                        value={field.placeholder}
                                                        onChange={e => updateField(field.id, 'placeholder', e.target.value)}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                                                        placeholder="e.g., John Doe"
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <label className="flex items-center gap-3 cursor-pointer px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors w-full">
                                                        <input
                                                            type="checkbox"
                                                            checked={field.required}
                                                            onChange={e => updateField(field.id, 'required', e.target.checked)}
                                                            className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                                                        />
                                                        <span className="text-sm font-bold text-slate-700">Make this field required</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Options Editor */}
                                            {['dropdown', 'checkbox', 'radio'].includes(field.type) && (
                                                <div className="pt-3 border-t border-slate-200">
                                                    <label className="text-xs font-bold text-slate-600 uppercase block mb-3">Options</label>
                                                    <div className="space-y-2.5">
                                                        {field.options.map((opt, i) => (
                                                            <div key={i} className="flex gap-3 items-center">
                                                                <span className="text-xs font-bold text-slate-400 w-6 text-right shrink-0">{i + 1}.</span>
                                                                <input
                                                                    value={opt}
                                                                    onChange={e => updateOption(field.id, i, e.target.value)}
                                                                    className="w-1/2 px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                                                    placeholder={`Option ${i + 1}`}
                                                                />
                                                                <button
                                                                    onClick={() => removeOption(field.id, i)}
                                                                    className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors shrink-0"
                                                                    title="Delete option"
                                                                >
                                                                    <Icons.Trash />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-6 shrink-0"></span>
                                                            <button
                                                                onClick={() => addOption(field.id)}
                                                                className="w-1/2 py-2.5 border-2 border-dashed border-indigo-300 text-indigo-600 font-bold text-sm rounded-lg hover:bg-indigo-50 transition-colors"
                                                            >
                                                                + Add Option
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}