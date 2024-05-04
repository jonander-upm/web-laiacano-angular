module.exports = {
  jit: true,
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      main: 'var(--main-color)',
      basic: 'var(--base-color)',
      hint: 'var(--hint-color)',
      basicDarker: 'var(--base-darker-color)',
    },
    extend: {
      height: {
        header: 'var(--header-height)',
        subheader: 'var(--subheader-height)',
        content: 'var(--content-height-base)',
        contentSmall: 'var(--content-height-sm)',
      },
      padding: {
        page: '70px',
      },
      boxShadow: {
        toolbarBottom: 'rgba(0, 0, 0, 0.1) 0px 11px 11px 0px',
      }
    },
  },
  important: true,
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  options: {
    safelist: {
      standard: [
        'text-2xl',
        'text-3xl',
        'text-4xl',
        'text-5xl',
        'text-6xl',
        'sm:text-2xl',
        'sm:text-3xl',
        'sm:text-4xl',
        'sm:text-5xl',
        'sm:text-6xl',
        'md:text-2xl',
        'md:text-3xl',
        'md:text-4xl',
        'md:text-5xl',
        'md:text-6xl',
        'lg:text-2xl',
        'lg:text-3xl',
        'lg:text-4xl',
        'lg:text-5xl',
        'lg:text-6xl',
      ],
    },
  },
  plugins: [],
}
