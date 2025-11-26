# 🚀 JobRocket Theme Customization Guide

## Overview

This guide explains all the Rocket theme changes made to your application and how you can customize them yourself.

---

## What Was Changed

### 1. **Core Theme Configuration** (`frontend/src/theme.ts`)

**What it does:** Defines the base colors and styling system for your entire app.

**Changes made:**
- Created custom `rocketOrange` color palette (10 shades)
- Created custom `rocketRed` accent palette (10 shades)
- Set `primaryColor: 'rocketOrange'`
- Configured component defaults for Button, Card, Badge, ThemeIcon

**How to customize:**

```typescript
// frontend/src/theme.ts

// Adjust the color values in the palette arrays
const rocketOrange: MantineColorsTuple = [
  '#FFF4E6', // 0 - Lightest (change this for lighter tones)
  '#FFE8CC', // 1
  // ... adjust any shade
  '#FF6B35', // 6 - Main brand color (THIS IS THE KEY ONE)
  // ... darker shades
  '#D9480F', // 9 - Darkest
];

// To change the primary color entirely:
export const theme = createTheme({
  primaryColor: 'rocketOrange', // Change to 'blue', 'rocketRed', or any Mantine color

  // Add more component defaults:
  components: {
    Button: {
      defaultProps: {
        radius: 'md', // Try 'sm', 'lg', 'xl' for different roundedness
      },
    },
  },
});
```

---

### 2. **Button Colors**

**What was changed:**
- Login/Register buttons: `blue` → `rocketOrange`
- Logout button: `black` → `dark`
- Social media icons: `indigo` → `rocketOrange`
- Apply buttons: `blue` → `rocketOrange`

**Files modified:**
- `frontend/src/components/Navigation/Header.tsx`
- `frontend/src/components/SocialMedia.tsx`
- `frontend/src/components/ListingComponents/ListingPanel/ListingDetailsPanel.tsx`
- `frontend/src/pages/Jobseekers/Favorites.pages.tsx`

**How to customize:**

```tsx
// Find any Button component:
<Button color="rocketOrange" variant="filled">
  Click Me
</Button>

// Change color to:
// - 'rocketOrange' (your custom orange)
// - 'rocketRed' (your custom red)
// - 'blue', 'green', 'red', etc. (Mantine defaults)

// Change variant to:
// - 'filled' (solid background)
// - 'outline' (border only)
// - 'light' (light background)
// - 'subtle' (very subtle)
// - 'default' (gray)
```

---

### 3. **Badge Colors**

**What was changed:**
- Work arrangement badges: `teal` → `rocketOrange`
- Industry badges: `blue` → `rocketRed`

**Files modified:**
- `frontend/src/components/ListingComponents/ListingCard/ListingCard.tsx`
- `frontend/src/components/Modals/ListingDetailsModal.tsx`
- `frontend/src/components/ListingComponents/ListingPanel/ListingDetailsPanel.tsx`

**How to customize:**

```tsx
<Badge variant="filled" color="rocketOrange">
  Remote
</Badge>

// Try different variants:
// - 'filled' (solid)
// - 'light' (light background)
// - 'outline' (border only)
// - 'dot' (with a dot indicator)

// Try gradient badges:
<Badge
  variant="gradient"
  gradient={{ from: 'rocketOrange', to: 'rocketRed' }}
>
  Featured
</Badge>
```

---

### 4. **Dashboard Metric Cards**

**What was changed:**
- Total Applications card → Light orange gradient background
- Total Listings card → Light red/pink gradient background
- Icons changed to `rocketOrange` and `rocketRed`

**File modified:**
- `frontend/src/pages/BusinessUsers/Dashboard/DashMetrics.tsx`

**Current implementation:**
```tsx
<Paper
  shadow="sm"
  p="md"
  radius="md"
  withBorder
  className={styles.cardGradientSubtle} // Using CSS module
>
```

**How to customize with inline styles:**

```tsx
<Paper
  shadow="sm"
  p="md"
  radius="md"
  style={{
    background: 'linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%)',
    border: '1px solid #YOUR_BORDER_COLOR',
    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.15)' // Colored shadow
  }}
>
```

**Pro tip:** Use a gradient generator like [cssgradient.io](https://cssgradient.io/) to create custom gradients visually.

---

### 5. **Card Hover Effects**

**What was changed:**
- Listing cards now have orange glow on hover instead of gray background
- Added subtle lift effect (`translateY(-2px)`)
- Changed selected outline from blue to orange

**File modified:**
- `frontend/src/components/ListingComponents/ListingCard/ListingCard.module.css`

**Current CSS:**
```css
.hover:hover {
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
  transform: translateY(-2px);
}
```

**How to customize:**

```css
.hover:hover {
  /* Change shadow color (adjust RGB values) */
  box-shadow: 0 8px 24px rgba(RED, GREEN, BLUE, 0.3);

  /* Change lift amount (2px, 4px, 6px, etc.) */
  transform: translateY(-2px);

  /* Add scale effect */
  transform: translateY(-2px) scale(1.02);

  /* Change shadow size (first number is vertical, second is blur) */
  box-shadow: 0 12px 32px rgba(255, 107, 53, 0.4);
}
```

---

### 6. **Form Tab Indicators** (Login/Register)

**What was changed:**
- Active tab indicator has gradient background
- Light mode: Peach gradient
- Dark mode: Fire gradient (orange→red)

**File modified:**
- `frontend/src/pages/AllUsers/formTabs.module.css`

**Current CSS:**
```css
.indicator {
  background: linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%);
  border: 1px solid #FFD8A8;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);

  @mixin dark {
    background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%);
    border-color: #E63946;
  }
}
```

**How to customize:**

```css
.indicator {
  /* Light mode gradient */
  background: linear-gradient(135deg, #YOUR_LIGHT_START 0%, #YOUR_LIGHT_END 100%);

  /* Dark mode */
  @mixin dark {
    background: linear-gradient(135deg, #YOUR_DARK_START 0%, #YOUR_DARK_END 100%);
  }
}
```

---

### 7. **Footer**

**What was changed:**
- Light mode: Subtle orange gradient background
- Dark mode: Dark brown/black gradient
- Border changed from gray to orange

**File modified:**
- `frontend/src/components/ComponentStyles/FooterStyles.module.css`

**How to customize:**

```css
.footer {
  /* Change gradients for light and dark mode */
  background: light-dark(
    linear-gradient(135deg, #LIGHT_START 0%, #LIGHT_END 100%),
    linear-gradient(135deg, #DARK_START 0%, #DARK_END 100%)
  );

  /* Change border color */
  border-top: 2px solid light-dark(#LIGHT_COLOR, #DARK_COLOR);
}
```

---

### 8. **Global Utility Classes** (`frontend/src/App.css`)

**What was added:**
Reusable gradient and shadow classes you can apply anywhere.

**Available classes:**

```css
/* Gradient backgrounds */
.gradient-fire        /* Orange→Red diagonal */
.gradient-launch      /* Red→Orange→Yellow diagonal */
.gradient-subtle      /* Light peach diagonal */
.gradient-orange      /* Medium orange diagonal */
.gradient-red         /* Pink→Red diagonal */
.gradient-dark        /* Dark brown diagonal */

/* Colored shadows */
.shadow-orange        /* Medium orange shadow */
.shadow-orange-lg     /* Large orange shadow */
.shadow-red           /* Red shadow */

/* Hover effects */
.hover-glow-orange    /* Adds orange glow on hover */
```

**How to use:**

```tsx
// Apply to any Mantine component
<Paper className="gradient-fire">
  Content with fire gradient background
</Paper>

<Button className="hover-glow-orange">
  Button with orange glow on hover
</Button>

// Combine multiple classes
<Card className="gradient-subtle shadow-orange">
  Card with gradient and shadow
</Card>
```

---

## Advanced Customization Techniques

### Creating Your Own Gradient Backgrounds

**Option 1: Inline Styles (Quick & Easy)**

```tsx
<Box style={{
  background: 'linear-gradient(135deg, #START_COLOR 0%, #END_COLOR 100%)',
  borderRadius: '8px',
  padding: '20px'
}}>
  Your content
</Box>
```

**Option 2: CSS Module (Reusable)**

Create a new CSS file (`MyComponent.module.css`):

```css
.myGradient {
  background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%);
  border-radius: 8px;
  padding: 20px;
}

/* With light-dark mode support */
.myGradientResponsive {
  background: light-dark(
    linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%),
    linear-gradient(135deg, #2C1810 0%, #1A0A05 100%)
  );
}
```

Import and use:

```tsx
import styles from './MyComponent.module.css';

<Box className={styles.myGradient}>
  Content
</Box>
```

---

### Working with Mantine's Color System

**Using theme colors in components:**

```tsx
// Access theme colors directly
<Box bg="rocketOrange.6">  {/* Use shade 6 of rocketOrange */}
  Content
</Box>

<Text c="rocketRed.7">  {/* Text color using shade 7 */}
  Red text
</Text>

// All shades 0-9 are available
// 0 = lightest, 9 = darkest
```

**Creating buttons with theme colors:**

```tsx
<Button color="rocketOrange" variant="filled">Solid Orange</Button>
<Button color="rocketOrange" variant="outline">Orange Outline</Button>
<Button color="rocketOrange" variant="light">Light Orange</Button>

<Button
  variant="gradient"
  gradient={{ from: 'rocketOrange', to: 'rocketRed', deg: 45 }}
>
  Gradient Button
</Button>
```

---

### Adding Colored Shadows

**Technique 1: Box Shadow with RGBA**

```tsx
<Paper style={{
  boxShadow: '0 4px 12px rgba(255, 107, 53, 0.2)'
  // Format: horizontal vertical blur spread rgba(R, G, B, Alpha)
}}>
```

**Technique 2: Multiple Shadows**

```tsx
<Card style={{
  boxShadow: `
    0 4px 6px rgba(255, 107, 53, 0.1),
    0 8px 16px rgba(255, 107, 53, 0.15),
    0 12px 24px rgba(255, 107, 53, 0.1)
  `
}}>
```

**Technique 3: Hover State Shadows**

```css
.myCard {
  transition: box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
}

.myCard:hover {
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}
```

---

### Light-Dark Mode Support

**Mantine's `light-dark()` function:**

```css
/* In CSS modules */
.myComponent {
  background: light-dark(
    #LIGHT_MODE_COLOR,
    #DARK_MODE_COLOR
  );

  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
}
```

**In TypeScript/JSX:**

```tsx
import { useMantineColorScheme } from '@mantine/core';

function MyComponent() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box style={{
      background: colorScheme === 'light'
        ? 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)'
        : 'linear-gradient(135deg, #2C1810 0%, #1A0A05 100%)'
    }}>
      Content
    </Box>
  );
}
```

---

## Color Reference

### Rocket Orange Palette

```
0: #FFF4E6 (Lightest - backgrounds)
1: #FFE8CC (Very light)
2: #FFD8A8 (Light - borders)
3: #FFC078
4: #FFA94D
5: #FF922B
6: #FF6B35 (MAIN BRAND COLOR)
7: #F77F00 (Burn orange)
8: #E8590C (Dark)
9: #D9480F (Darkest - text)
```

### Rocket Red Palette

```
0: #FFE9EC (Lightest)
1: #FFD4D9 (Very light)
2: #FFBFC6 (Light - borders)
3: #FFA8B3
4: #FF8FA0
5: #FF758D
6: #E63946 (MAIN ACCENT COLOR)
7: #D62839 (Dark)
8: #C6172C (Darker)
9: #B6061F (Darkest)
```

### Suggested Combinations

**For cards:**
- Background: rocketOrange.0 or rocketOrange.1
- Border: rocketOrange.2
- Shadow: `rgba(255, 107, 53, 0.15)`

**For buttons:**
- Primary: rocketOrange.6 (filled)
- Secondary: rocketRed.6 (outline)
- Text: white on orange, black on white

**For badges:**
- Status: rocketOrange (active/featured)
- Category: rocketRed (type/industry)
- Neutral: gray.5

---

## Quick Recipes

### 1. Glowing Card on Hover

```tsx
<Paper
  p="md"
  radius="md"
  style={{
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }}
  sx={{
    '&:hover': {
      boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)',
      transform: 'translateY(-4px)'
    }
  }}
>
  Your content
</Paper>
```

### 2. Gradient Header

```tsx
<Box
  p="xl"
  style={{
    background: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
    color: 'white'
  }}
>
  <Title order={1}>Page Title</Title>
</Box>
```

### 3. Themed Button Group

```tsx
<Group>
  <Button color="rocketOrange" variant="filled">Primary</Button>
  <Button color="rocketRed" variant="outline">Secondary</Button>
  <Button color="dark" variant="subtle">Tertiary</Button>
</Group>
```

### 4. Stat Card with Gradient

```tsx
<Paper
  p="md"
  radius="md"
  style={{
    background: 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)',
    border: '1px solid #FFD8A8'
  }}
>
  <Group>
    <ThemeIcon size="xl" color="rocketOrange" variant="light">
      <Icon />
    </ThemeIcon>
    <div>
      <Text size="xl" fw={700}>1,234</Text>
      <Text size="sm" c="dimmed">Total Users</Text>
    </div>
  </Group>
</Paper>
```

### 5. Gradient Text

```tsx
<Title
  style={{
    background: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }}
>
  Gradient Headline
</Title>
```

---

## Tools & Resources

### Color Tools
- **Gradient Generator:** https://cssgradient.io/
- **Color Picker:** https://coolors.co/
- **Shadow Generator:** https://shadows.brumm.af/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/

### Mantine Documentation
- **Theme Object:** https://mantine.dev/theming/theme-object/
- **Colors:** https://mantine.dev/theming/colors/
- **Styles API:** https://mantine.dev/styles/styles-api/
- **CSS Modules:** https://mantine.dev/styles/css-modules/

### Inspiration
- **Dribbble:** Search "rocket theme" or "orange UI"
- **Awwwards:** https://www.awwwards.com/
- **UI8:** https://ui8.net/

---

## Troubleshooting

### Colors not showing?
1. Make sure you've restarted the dev server after changing `theme.ts`
2. Check that you're using the correct color name: `rocketOrange` not `rocket-orange`
3. Verify imports are correct

### Dark mode looks wrong?
- Use `light-dark()` function in CSS
- Or check `colorScheme` in TypeScript
- Test both modes using the theme toggle

### Gradients not working?
- Check CSS syntax: `linear-gradient(angle, color1 pos%, color2 pos%)`
- Try using hex colors instead of color names
- Use browser dev tools to inspect the element

---

## Next Steps

1. **Experiment:** Try changing values in `theme.ts` and see what happens
2. **Consistency:** Pick 2-3 gradient styles and use them throughout
3. **Balance:** Don't overuse gradients - save them for emphasis
4. **Accessibility:** Always check text contrast on colored backgrounds
5. **Performance:** Too many gradients can impact performance on older devices

---

## Summary of Key Files

```
✅ Core Theme
frontend/src/theme.ts

✅ Components
frontend/src/components/Navigation/Header.tsx
frontend/src/components/SocialMedia.tsx
frontend/src/components/InfoCards/homePageCards.tsx
frontend/src/components/ListingComponents/ListingCard/ListingCard.tsx

✅ Styling
frontend/src/App.css (global utilities)
frontend/src/components/ComponentStyles/Header.module.css
frontend/src/components/ComponentStyles/FooterStyles.module.css
frontend/src/components/ListingComponents/ListingCard/ListingCard.module.css
frontend/src/pages/AllUsers/formTabs.module.css

✅ Pages
frontend/src/pages/BusinessUsers/Dashboard/DashMetrics.tsx
frontend/src/pages/AllUsers/LoginPage/Login.pages.tsx
frontend/src/pages/AllUsers/Register.pages.tsx
```

Happy theming! 🚀
