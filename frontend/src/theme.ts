// theme.ts - Rocket Theme Configuration
import {
  createTheme,
  MantineColorsTuple,
  defaultVariantColorsResolver,
  Title,
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
  '#FFE9EC', // 0 - Lightest
  '#FFD4D9', // 1 - Very light
  '#FFBFC6', // 2 - Light
  '#FFA8B3', // 3 - Light-medium
  '#FF8FA0', // 4 - Medium-light
  '#FF758D', // 5 - Medium
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

export const theme = createTheme({
  primaryColor: 'rocketOrange',

  colors: {
    rocketOrange,
    rocketRed,
    rocketYellow,
  },

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

    return defaultResolvedColors;
  },

  // Typography - Space-inspired, modern and bold
  fontFamily: 'Poppins, Inter, Roboto, sans-serif',
  fontSizes: {xs: '12px', md: '16px'},
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
        c: 'black'
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
        fw: 400,
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
        fw: 400,
      },
    },
    Text: {
      defaultProps: {
        fw: 400,
      }
    },
    Title: {
      defaultProps:{
        fw: 400
      }
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