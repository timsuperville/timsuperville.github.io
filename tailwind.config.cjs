/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0f1d',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#1e293b',
          800: '#131c31',
          900: '#0a0f1d',
          950: '#050811',
        },
        primary: {
          DEFAULT: '#06b6d4', // cyan-500
          glow: '#22d3ee',    // cyan-400
          dark: '#0891b2',
        },
        secondary: {
          DEFAULT: '#8b5cf6', // violet-500
          glow: '#a78bfa',    // violet-400
          dark: '#7c3aed',
        },
        accent: {
          DEFAULT: '#f43f5e', // rose-500
          glow: '#fb7185',
        },
        emerald: {
          glow: '#34d399',
        },
        amber: {
          glow: '#fbbf24',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora-mesh': 'radial-gradient(at 100% 0%, rgba(34, 211, 238, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(34, 211, 238, 0.35)',
        'glow-secondary': '0 0 25px -5px rgba(167, 139, 250, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
