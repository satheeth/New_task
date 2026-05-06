/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                accent: '#ec4899',
            },
            animation: {
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.3s ease-out',
                'bounce-soft': 'bounceSoft 1.5s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
                },
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'soft-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
                'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
                'inset-top': 'inset 0 2px 0 rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
}
