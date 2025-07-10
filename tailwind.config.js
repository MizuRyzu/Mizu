/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        'akcent-modra': 'var(--color-akcent-modra)',
        'akcent-zluta': 'var(--color-akcent-zluta)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        courier: 'var(--font-courier)',
      },
    },
  },
  plugins: [],
}
