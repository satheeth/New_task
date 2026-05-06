import React from 'react';

const IconWrapper = ({ children }) => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://w3.org"
  >
    {children}
  </svg>
);

export const Icons = {
  Text: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </IconWrapper>
  ),
  Number: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </IconWrapper>
  ),
  Dropdown: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </IconWrapper>
  ),
  Email: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </IconWrapper>
  ),
  Textarea: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
    </IconWrapper>
  ),
  Checkbox: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconWrapper>
  ),
  Radio: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 8a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
    </IconWrapper>
  ),
  Trash: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </IconWrapper>
  ),
  ChevronUp: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </IconWrapper>
  ),
  ChevronDown: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </IconWrapper>
  ),
  Copy: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </IconWrapper>
  ),
  Eye: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </IconWrapper>
  ),
  Plus: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </IconWrapper>
  ),
  Undo: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </IconWrapper>
  ),
  Download: () => (
    <IconWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </IconWrapper>
  ),
};
