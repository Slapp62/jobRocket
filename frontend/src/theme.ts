// theme.ts - Rocket Theme Configuration
import {
  ActionIcon,
  Badge,
  Button,
  createTheme,
  CSSVariablesResolver,
  defaultVariantColorsResolver,
  MantineColorsTuple,
} from '@mantine/core';

// Custom Rocket Orange color palette
const rocketOrange: MantineColorsTuple = [
  '#FFF4E6', // 0 - Lightest (backgrounds, subtle highlights)
  '#FFE8CC', // 1 - Very light (hover backgrounds)
  '#FFD8A8', // 2 - Light (disabled states)
  '#FFC078', // 3 - Light-medium
  '#FFA94D', // 4 - Medium-light
  '#FF922B', // 5 - Medium (default shade)
  '#FF6B35', // 6 - Flame Orange (primary brand color)
  '#F77F00', // 7 - Burn Orange
  '#E8590C', // 8 - Dark orange
  '#D9480F', // 9 - Darkest (text on light backgrounds)
];

// Custom Rocket Red accent palette
const rocketRed: MantineColorsTuple = [
  '#ffe9e9ff', // 0 - Lightest
  '#ffd4d4ff', // 1 - Very light
  '#ffbfbfff', // 2 - Light
  '#ffa8a8ff', // 3 - Light-medium
  '#ff8f8fff', // 4 - Medium-light
  '#ff7575ff', // 5 - Medium
  '#E63946', // 6 - Rocket Red (accent color)
  '#D62839', // 7 - Dark red
  '#C6172C', // 8 - Darker red
  '#B6061F', // 9 - Darkest
];

// Custom Rocket Yellow palette
const rocketYellow: MantineColorsTuple = [
  '#FFFEF0', // 0 - Lightest (subtle backgrounds)
  '#FFFACD', // 1 - Very light (hover states) - lemon chiffon
  '#FFF59D', // 2 - Light (disabled states)
  '#FFF176', // 3 - Light-medium
  '#FFEE58', // 4 - Medium-light
  '#FFEB3B', // 5 - Medium (default shade) - true yellow
  '#FDD835', // 6 - Rocket Yellow (bright, energetic) - vivid yellow
  '#f9d925ff', // 7 - Golden yellow
  '#f5c917ff', // 8 - Dark golden
  '#e6b000ff', // 9 - Darkest (text on light backgrounds)
];

// Custom Gray palette for light mode backgrounds and neutrals
const rocketGray: MantineColorsTuple = [
  '#fafafa', // 0 - Lightest background
  '#f5f5f5', // 1 - Very light background
  '#eeeeee', // 2 - Light background (primary use - headers, sections in light mode)
  '#e0e0e0', // 3 - Medium-light (borders, dividers)
  '#bdbdbd', // 4 - Medium gray (disabled states, hover backgrounds)
  '#9e9e9e', // 5 - Medium-dark (muted text)
  '#757575', // 6 - Dark gray (secondary text)
  '#616161', // 7 - Darker (body text)
  '#424242', // 8 - Very dark (emphasis text)
  '#212121', // 9 - Darkest (headers, primary text in light mode)
];

// Custom Black palette for dark mode text and backgrounds
const rocketBlack: MantineColorsTuple = [
  '#e8e8e8', // 0 - Light gray (brightest text in dark mode)
  '#d0d0d0', // 1 - Medium-light gray (primary text in dark mode, light cards in light mode)
  '#b8b8b8', // 2 - Medium gray (secondary text in dark mode)
  '#a0a0a0', // 3 - Muted text (body text in dark mode)
  '#888888', // 4 - Icons, tertiary text, buttons
  '#505050', // 5 - Dividers, borders in dark mode
  '#383838', // 6 - Elevated surfaces in dark mode
  '#282828', // 7 - Cards, papers in dark mode (also used for text in light mode)
  '#1a1a1a', // 8 - Secondary backgrounds in dark mode
  '#0f0f0f', // 9 - Primary dark background (page background in dark mode)
];

export const theme = createTheme({
  primaryColor: 'rocketOrange',

  colors: {
    rocketOrange,
    rocketRed,
    rocketYellow,
    rocketGray,
    rocketBlack,
  },

  // Dark mode color overrides
  // These ensure the custom rocket colors work well in dark mode
  // while maintaining brand identity and proper contrast
  black: '#0d0d0eff',
  white: '#ffffff',

  // Override default dark mode colors for better differentiation
  // Mantine's default dark palette is used for backgrounds and surfaces in dark mode
  // We enhance it to provide better section differentiation
  autoContrast: true, // Automatically adjust text color for contrast

  // Use default variant resolver - let each component handle its own variants
  variantColorResolver: defaultVariantColorsResolver,

  // Typography - Space-inspired, modern and bold
  fontFamily: 'Poppins, Inter, Roboto, sans-serif',
  fontSizes: { xs: '12px', md: '16px' },
  // font weight set in global css
  headings: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
  },

  // Border radius - Sleek and modern
  defaultRadius: 'md',

  // Component defaults
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        radius: 'md',
        color: 'rocketOrange',
      },
      vars: (theme, props) => {
        if (props.variant === 'rocketAction') {
          return {
            root: {
              '--ai-bg': 'transparent',
              '--ai-hover': `light-dark(${theme.colors.gray[3]}, ${theme.colors.dark[6]})`,
              '--ai-color': `light-dark(${theme.black}, ${theme.white})`,
            },
          };
        }
        return { root: {} };
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        radius: 'md',
        fw: 500,
      },
      vars: (theme, props) => {
        if (props.variant === 'rocketBadge') {
          return {
            root: {
              '--badge-bg': `light-dark(${theme.colors.rocketGray[1]}, ${theme.colors.rocketGray[6]})`,
              '--badge-color': `light-dark(${theme.colors.rocketGray[8]}, ${theme.colors.rocketGray[1]})`,
              '--badge-bd': `1px solid light-dark(${theme.colors.rocketGray[6]}, ${theme.colors.rocketGray[6]})`,
            },
          };
        }
        if (props.variant === 'rocketStatus') {
          // Uses the color prop to determine styling
          // Transparent background with colored border and text
          const badgeColor = props.color ? theme.colors[props.color]?.[6] || props.color : theme.colors.gray[6];
          return {
            root: {
              '--badge-bg': 'transparent',
              '--badge-color': badgeColor,
              '--badge-bd': `1px solid ${badgeColor}`,
            },
          };
        }
        return { root: {} };
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: 'md',
        fw: 400,
        color: 'rocketOrange', // Default color for all buttons
      },
      vars: (theme, props) => {
        if (props.variant === 'rocketFilled') {
          return {
            root: {
              '--button-bg': theme.colors.rocketOrange[6], // Same in light and dark
              '--button-hover': theme.colors.rocketOrange[8],
              '--button-color': theme.white,
              '--button-bd': 'none',
            },
          };
        }

        if (props.variant === 'rocketOutline') {
          return {
            root: {
              '--button-bg': 'transparent',
              '--button-hover': `light-dark(${theme.colors.gray[3]}, ${theme.colors.dark[6]})`,
              '--button-color': `light-dark(${theme.black}, ${theme.white})`,
              '--button-bd': `1px solid light-dark(${theme.colors.rocketBlack[3]}, ${theme.white})`,
            },
          };
        }

        if (props.variant === 'rocketSubtle') {
          return {
            root: {
              '--button-bg': 'transparent',
              '--button-hover': `light-dark(${theme.colors.gray[3]}, ${theme.colors.dark[6]})`,
              '--button-color': `light-dark(${theme.black}, ${theme.white})`,
            },
          };
        }

        if (props.variant === 'rocketLight') {
          return {
            root: {
              '--button-bg': `light-dark(${theme.colors.gray[3]}, ${theme.colors.dark[6]})`,
              '--button-hover': `light-dark(${theme.colors.gray[4]}, ${theme.colors.dark[7]})`,
              '--button-color': `light-dark(${theme.black}, ${theme.white})`,
            },
          };
        }
        return { root: {} };
      },
    }),
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
        fw: 400,
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'md',
      },
    },
    Drawer: {
      defaultProps: {
        radius: 'md',
      },
    },
    Text: {
      defaultProps: {
        fw: 400,
      },
    },
    Title: {
      defaultProps: {
        fw: 400,
      },
    },
    ThemeIcon: {
      defaultProps: {
        radius: 'md',
        fw: 400,
      },
    },
  },

  // Custom gradients for rocket theme
  other: {
    gradients: {
      fire: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
      launch: 'linear-gradient(135deg, #E63946 0%, #FF6B35 50%, #F77F00 100%)',
      subtle: 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)',
    },
  },
});

// CSS Variables Resolver - Override default Mantine background colors
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-body': '#ffffffff',
  },
  dark: {
    '--mantine-color-body': '#222222ff', // rocketBlack.9 - darkest background
  },
});
