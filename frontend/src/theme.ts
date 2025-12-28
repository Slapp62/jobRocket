// theme.ts - Rocket Theme Configuration
import {
  createTheme,
  defaultVariantColorsResolver,
  MantineColorsTuple,
  MantineTheme,
  Title,
  CSSVariablesResolver,
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

// Custom Dark Mode palette for high contrast
// This palette provides named references for all dark mode colors
const rocketDark: MantineColorsTuple = [
  '#f5f5f5', // 0 - Brightest text (primary text in dark mode)
  '#e0e0e0', // 1 - Very light gray (secondary text)
  '#c2c2c2', // 2 - Light gray (disabled text, placeholders)
  '#a0a0a0', // 3 - Medium-light gray (muted text)
  '#808080', // 4 - Medium gray (icons, dividers)
  '#606060', // 5 - Medium-dark gray (subtle borders)
  '#333333', // 6 - Dark gray (borders, separators)
  '#1f1f1f', // 7 - Very dark gray (hover states, elevated cards)
  '#1a1a1a', // 8 - Nearly black (cards, papers, modals)
  '#0f0f0f', // 9 - Darkest (drawers, secondary backgrounds)
];

// Pure Black palette for page backgrounds in dark mode
// Provides the deepest blacks for maximum contrast
const rocketBlack: MantineColorsTuple = [
  '#ffffff', // 0 - Pure white (for contrast reference)
  '#f0f0f0', // 1 - Near white
  '#d0d0d0', // 2 - Very light gray
  '#b0b0b0', // 3 - Light gray
  '#909090', // 4 - Medium gray
  '#707070', // 5 - Gray
  '#505050', // 6 - Dark gray
  '#303030', // 7 - Very dark gray
  '#121212', // 8 - Near black (alternative page background)
  '#0a0a0a', // 9 - Pure black (primary page background in dark mode)
];

export const theme = createTheme({
  primaryColor: 'rocketOrange',

  colors: {
    rocketOrange,
    rocketRed,
    rocketYellow,
    rocketDark,
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

  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);

    if (input.variant === 'rocketRedFilled') {
      return {
        background: input.theme.colors.rocketRed[8],
        hover: input.theme.colors.rocketRed[9],
        color: '#ffffffff',
        border: 'none',
      };
    }

    if (input.variant === 'outline') {
      return {
        ...defaultResolvedColors,
        color: `light-dark(${input.theme.colors.rocketOrange[9]}, var(--mantine-color-white))`,
        border: `1px solid light-dark(${input.theme.colors.rocketOrange[9]}, var(--mantine-color-white))`,
      };
    }

    return defaultResolvedColors;
  },

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
    Badge: {
      defaultProps: {
        radius: 'md',
        fw: 600,
        c: 'black',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
        fw: 400,
        c: 'white'
      },
    },
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
  light: {},
  dark: {
    '--mantine-color-body': '#222222ff', // rocketBlack.9 - darkest background
  },
});
