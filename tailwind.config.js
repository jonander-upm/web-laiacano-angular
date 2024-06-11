module.exports = {
  jit: true,
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      main: 'var(--main-color)',
      basic: 'var(--base-color)',
      hint: 'var(--hint-color)',
      basicDarker: 'var(--base-darker-color)',
      basicHover: 'var(--base-hover-color)'
    },
    extend: {
      height: {
        '54': '13.5rem',
        header: 'var(--header-height)',
        subheader: 'var(--subheader-height)',
        filter: 'var(--filter-height)',
        subheaderFilters: 'var(--subheader-filter-height)',
        content: 'var(--content-height-base)',
        contentSmall: 'var(--content-height-sm)',
        contentXSmall: 'var(--content-height-xs)',
        orderFooter: 'var(--order-content-height)',
        orderContent: 'var(--order-footer-height)',
      },
      minHeight: {
        orderContent: 'var(--order-footer-height)',
      },
      padding: {
        page: '70px',
      },
      boxShadow: {
        toolbarBottom: 'rgba(0, 0, 0, 0.1) 0px 11px 11px 0px',
        sectionTopBottom: 'inset rgba(0, 0, 0, 0.07) -10px -6px 11px 0px, inset rgba(0, 0, 0, 0.07) 0px 6px 11px 0px',
        sectionDeeper: 'inset rgba(0, 0, 0, 0.15) 0px -3px 15px 5px',
      },
      dropShadow: {
        card: '0 0 0.4rem rgba(0, 0, 0, 0.15)',
      },
      transitionProperty: {
        height: 'height',
        visibility: 'visibility'
      },
      content: {
        checkOutline: 'url("/assets/icons/check_outline.svg")',
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
