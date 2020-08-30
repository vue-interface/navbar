const plugin = require('tailwindcss/plugin');
const { colors } = require('tailwindcss/defaultTheme');
const { breakpoints, divide, escapeSvg, flatten, multiply, rgba, subtract } = require('@vue-interface/tailwindcss/utils');

module.exports = plugin(function({ addComponents, theme }) {
    const navbar = {
        ':root': flatten(theme('navbar')),

        // Navbar
        //
        // Provide a static navbar from which we expand to create full-width, fixed, and
        // other navbar variations.
        '.navbar': {
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap', // allow us to do the line break for collapsing content
            alignItems: 'center',
            justifyContent: 'space-between', // space out brand from logo
            paddingTop: theme('navbar.paddingY'),
            paddingRight: theme('navbar.paddingX'), // default: null
            paddingBottom: theme('navbar.paddingY'),
            paddingLeft: theme('navbar.paddingX'), // default: null
            // @include gradient-bg();
        },
    
        '.navbar .container, .navbar .container-fluid': theme('navbar.container.flex')
    };
    
    const containerWidths = breakpoints(theme('navbar.container.width'));

    containerWidths
        .sortMin()
        .forEach(([key]) => {
            Object.assign(navbar, {
                [`.navbar .${containerWidths.infix('container', key)}`]: theme('navbar.container.flex')
            });
        });

    Object.assign(navbar, {
        // Navbar brand
        //
        // Used for brand, project, or site names.
        
        '.navbar-brand': {
            paddingTop: theme('navbar.brand.paddingY'),
            paddingBottom: theme('navbar.brand.paddingY'),
            marginRight: theme('navbar.brand.marginRight'),
            fontSize: theme('navbar.brand.fontSize'),
            textDecoration: 'none',
            whiteSpace: 'nowrap',
        },
        
        '.navbar-brand:hover, .navbar-brand:focus': {
            textDecoration: 'none'
        },        
        
        // Navbar nav
        //
        // Custom navbar navigation (doesn't require `.nav`, but does make use of `.nav-link`).
        
        '.navbar-nav': {
            display: 'flex',
            flexDirection: 'column', // cannot use `inherit` to get the `.navbar`s value
            paddingLeft: 0,
            marginButton: 0,
            listStyle: 'none',
        },
        
        '.navbar-nav .nav-link': {
            paddingRight: 0,
            paddingLeft: 0,
        },
    
        '.navbar-nav .dropdown-menu': {
            position: 'static'
        },        
        
        // Navbar text
        //
        //
        
        '.navbar-text': {
            paddingTop: theme('navbar.text.paddingY'),
            paddingBottom: theme('navbar.text.paddingY'),
        },        
        
        // Responsive navbar
        //
        // Custom styles for responsive collapsing and toggling of navbar contents.
        // Powered by the collapse Bootstrap JavaScript plugin.
        
        // When collapsed, prevent the toggleable navbar contents from appearing in
        // the default flexbox row orientation. Requires the use of `flexWrap: wrap`
        // on the `.navbar` parent.
        '.navbar-collapse': {
            // For always expanded or extra full navbars, ensure content aligns itself
            // properly vertically. Can be easily overridden with flex utilities.
            alignItems: 'center',
            width: '100%',
        },
        
        // Button for toggling the navbar when in its collapsed state
        '.navbar-toggler': {
            padding: `${theme('navbar.toggler.paddingY')} ${theme('navbar.toggler.paddingX')}`,
            fontSize: theme('navbar.toggler.fontSize'),
            lineHeight: 1,
            backgroundColor: 'transparent', // remove default button style
            border: '1px solid transparent', // remove default button style
            borderRadius: theme('navbar.toggler.borderRadius'),
            transition: theme('navbar.toggler.transition')
        },
        
        '.navbar-toggler:hover': {
            textDecoration: 'none'
        },
        
        '.navbar-toggler:focus': {
            textDecoration: 'none',
            outline: 0,
            boxShadow: `0 0 0 ${theme('navbar.toggler.focus.width')}`
        },
        
        // Keep as a separate element so folks can easily override it with another icon
        // or image file as needed.
        '.navbar-toggler-icon': {
            display: 'inline-block',
            width: '1.5em',
            height: '1.5em',
            verticalAlign: 'middle',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100%',
        }
    });
    
    const breaks = breakpoints(theme('screens'));
    
    breaks
        .sortMin()
        .forEach(([ name ]) => {
            if(!breaks.next(name)) {
                return;
            }

            const [ key, next ] = breaks.next(name);
            const selector = breaks.infix('.navbar-expand', next);

            Object.assign(navbar, {
                [selector]: {
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start'
                },
                [`@media (min-width: ${next.min()})`]: {
                    [`${selector} .navbar-nav`]: {
                        flexDirection: 'row',
                    },
                    [`${selector} .navbar-nav .dropdown-menu`]: {
                        position: 'absolute',
                    },
                    [`${selector} .navbar-nav .nav-link`]: {
                        paddingRight: theme('navbar.link.paddingX'),
                        paddingLeft: theme('navbar.link.paddingX')
                    },
                    [`${selector} .navbar-collapse`]: {
                        display: 'flex !important',
                    },
                    [`${selector} .navbar-toggler`]: {
                        display: 'none'
                    }
                }
            });
        });
        
    
    Object.assign(navbar, {
        // Navbar themes
        //
        // Styles for switching between navbars with light or dark background.
        
        // Dark links against a light background
        '.navbar-light .navbar-brand': {
            color: theme('navbar.light.brand.color')
        },

        '.navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus': {
            color: theme('navbar.light.brand.hover.color')
        },
    
        '.navbar-nav .nav-link': {
            color: theme('navbar.light.color')
        },

        '.navbar-nav .nav-link:hover, .navbar-nav .nav-link:focus': {
            color: theme('navbar.light.hover.color')
        },

        '.navbar-nav .nav-link.disabled': {
            color: theme('navbar.light.disabled.color')
        },
    
        '.navbar-nav .show > .nav-link, .navbar-nav .nav-link.active': {
            color: theme('navbar.light.active.color')
        },
        
        '.navbar-toggler': {
            color: theme('navbar.light.color'),
            borderColor: theme('navbar.light-toggler-border-color')
        },
        
        '.navbar-toggler .navbar-toggler-icon': {
            backgroundImage: escapeSvg(theme('navbar.light.toggler.icon.backgroundImage'))
        },
        
        '.navbar-toggler .navbar-text': {
            color: theme('navbar.light.color')
        },
        
        '.navbar-toggler .navbar-text a, .navbar-toggler .navbar-text a:hover, .navbar-toggler .navbar-text a:focus': {
            color: theme('navbar.light.active.color')
        },
        
        // White links against a dark background
        '.navbar-dark .navbar-brand': {
            color: theme('navbar.dark.brand.color')
        },

        '.navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus': {
            color: theme('navbar.dark.brand.hover.color')
        },
        
        '.navbar-dark .navbar-nav .nav-link': {
            color: theme('navbar.dark.color')
        },

        '.navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus': {
            color: theme('navbar.dark.hover.color')
        },

        '.navbar-dark .navbar-nav .nav-link.disabled': {
            color: theme('navbar.dark.disabled.color')
        },
    
        '.navbar-dark .navbar-nav .show > .nav-link, .navbar-dark .navbar-nav .nav-link.active': {
            color: theme('navbar.dark.active.color')
        },
            
        '.navbar-dark .navbar-toggler': {
            color: theme('navbar.dark.color'),
            borderColor: theme('navbar.dark.toggler.borderColor')
        },
    
        '.navbar-dark .navbar-toggler-icon': {
            backgroundImage: escapeSvg(theme('navbar.dark.toggler.icon.backgroundImage'))
        },
    
        '.navbar-dark .navbar-text': {
            color: theme('navbar.dark.color')
        },
        
        '.navbar-dark .navbar-text a, .navbar-dark .navbar-text a:hover, .navbar-dark .navbar-text a:focus': {
            color: theme('navbar.dark.active.color')
        }
    });
    
    addComponents(navbar);
}, {
    theme: {
        navbar: theme => {
            const linkHeight = `${theme('interface.fontSize.base')} * ${theme('interface.lineHeight.base')} + ${theme('interface.spacer')}`;
            const brandHeight = multiply(theme('interface.fontSize.lg'), theme('interface.lineHeight.base'));
            
            return {
                paddingY: `${divide(theme('interface.spacer'), 2)}`,
                link: {
                    paddingX: '.5rem'
                },
                brand: {
                    fontSize: theme('interface.fontSize.lg'),
                    height: brandHeight,
                    marginRight: '1rem',
                    paddingY: divide(subtract(linkHeight, brandHeight), 2)
                },
                toggler: {
                    paddingY: '.25rem',
                    paddingX: '.75rem',
                    fontSize: theme('interface.fontSize.lg', '1.25em'),
                    borderRadius: theme('btn.borderRadius', theme('interface.borderRadius.base', '.25rem')),
                    transition: 'box-shadow .15s ease-in-out',
                    focus: {
                        width: theme('btn.focus.width', '.25rem')
                    }
                },
                container: {
                    flex: {
                        display: 'flex',
                        flexWrap: 'inherit',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                    width: {
                        sm: '540px',
                        md: '720px',
                        lg: '960px',
                        xl: '1140px',
                        xxl: '1320px'
                    },
                },
                text: {
                    paddingY: '.5rem'
                },
                dark: {
                    color: rgba(theme('colors.white', colors.white), .55),
                    hover: {
                        color: rgba(theme('colors.white', colors.white), .75)
                    },
                    active: {
                        color: theme('colors.white', colors.white)
                    },
                    disabled: {
                        color: rgba(theme('colors.white', colors.white), .25)
                    },
                    toggler: {
                        borderColor: rgba(theme('colors.white', colors.white), .1),
                        icon: {
                            backgroundImage: escapeSvg(`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='#{$navbar-dark-color}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>")`)
                        }
                    },
                    brand: {
                        color: theme('colors.white', colors.white),
                        hover: {
                            color: theme('colors.white', colors.white)
                        }
                    }
                },
                light: {
                    color: rgba(theme('colors.black', colors.black), .55),
                    hover: {
                        color: rgba(theme('colors.black', colors.black), .7)
                    },
                    active: {
                        color: rgba(theme('colors.black', colors.black), .9)
                    },
                    disabled: {
                        color: rgba(theme('colors.white', colors.white), .3)
                    },
                    toggler: {
                        borderColor: rgba(theme('colors.black', colors.black), .1),
                        icon: {
                            backgroundImage: escapeSvg(`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='#{$navbar-light-color}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>")`)
                        }
                    },
                    brand: {
                        color: rgba(theme('colors.black', colors.black), .9),
                        hover: {
                            color: rgba(theme('colors.black', colors.black), .9)
                        }
                    }
                }
            }
        }
    }
});