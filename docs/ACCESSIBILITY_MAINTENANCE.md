# Accessibility Maintenance Guide
**Platform:** JobRocket
**Standard:** WCAG 2.0 Level AA & Israeli Standard 5568
**Last Updated:** December 23, 2025

---

## Table of Contents
1. [Daily Development Checklist](#daily-development-checklist)
2. [Component Creation Guidelines](#component-creation-guidelines)
3. [Form Accessibility Requirements](#form-accessibility-requirements)
4. [Common Patterns and Examples](#common-patterns-and-examples)
5. [Testing Procedures](#testing-procedures)
6. [Tools and Resources](#tools-and-resources)
7. [Troubleshooting](#troubleshooting)
8. [Legal Requirements](#legal-requirements)

---

## Daily Development Checklist

### Before Creating a New Component
- [ ] Check if similar accessible component already exists
- [ ] Review accessibility patterns in `accessibility.ts`
- [ ] Plan keyboard navigation flow
- [ ] Consider screen reader experience

### Before Committing Code
- [ ] Run `npm run lint` (includes accessibility rules)
- [ ] Test keyboard navigation (Tab through all interactive elements)
- [ ] Run Lighthouse accessibility audit (should score 100)
- [ ] Check for console accessibility warnings

### Before Deploying
- [ ] Full keyboard navigation test
- [ ] Screen reader spot check (NVDA or VoiceOver)
- [ ] Mobile touch target verification
- [ ] Contrast ratio verification for new colors

---

## Component Creation Guidelines

### Interactive Components (Buttons, Links, Form Controls)

#### ✅ DO: Use Semantic HTML
```tsx
// Good - Semantic button
<button onClick={handleClick} aria-label="Close modal">
  <IconX />
</button>

// Good - Link for navigation
<Link to="/search">Search Jobs</Link>
```

#### ❌ DON'T: Use Clickable Divs
```tsx
// BAD - Will cause lawsuit
<div onClick={handleClick}>
  <IconX />
</div>

// BAD - Clickable span
<span onClick={handleClick}>Click me</span>
```

### Icon-Only Buttons

**CRITICAL:** Every icon-only button MUST have an `aria-label`.

```tsx
import { ActionIcon } from '@mantine/core';

// ✅ CORRECT
<ActionIcon
  onClick={handleDelete}
  aria-label="Delete job listing"
>
  <IconTrash aria-hidden="true" />
</ActionIcon>

// ❌ WRONG - No aria-label
<ActionIcon onClick={handleDelete}>
  <IconTrash />
</ActionIcon>
```

### Images and Icons

```tsx
// Decorative icon (inside labeled button)
<IconHeart aria-hidden="true" />

// Informational icon (standalone)
<IconAlertCircle role="img" aria-label="Warning" />

// Image with meaningful content
<img src="/logo.png" alt="JobRocket logo" />

// Decorative image
<img src="/pattern.png" alt="" />
```

---

## Form Accessibility Requirements

### Complete Form Pattern

Every form MUST include:
1. Error summary at top (when errors exist)
2. Individual field errors with role="alert"
3. Unique field IDs
4. ARIA attributes (aria-required, aria-invalid, aria-describedby)
5. HTML5 autocomplete attributes
6. Screen reader announcements for submission

### Example: Accessible Form Field

```tsx
import { TextInput, Text } from '@mantine/core';
import { autocompleteValues } from '@/utils/accessibility';

function MyForm() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <Alert
          icon={<IconAlertCircle />}
          title="Please fix the following errors:"
          color="red"
          role="alert"
          aria-live="assertive"
        >
          <List size="sm">
            {errors.email && <List.Item>Email: {errors.email.message}</List.Item>}
            {/* ... other errors */}
          </List>
        </Alert>
      )}

      {/* Form Field */}
      <TextInput
        label="Email"
        {...register('email')}
        error={errors.email?.message}
        aria-required="true"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
        autoComplete={autocompleteValues.email}
        type="email"
        id="myform-email"
      />
      {errors.email && (
        <Text id="email-error" size="xs" c="red" role="alert">
          {errors.email.message}
        </Text>
      )}
    </>
  );
}
```

### Form Submission with Announcements

```tsx
import { announceToScreenReader } from '@/utils/accessibility';

const onSubmit = async (data) => {
  setIsLoading(true);
  announceToScreenReader('Submitting form, please wait', 'polite');

  try {
    await submitData(data);
    announceToScreenReader('Form submitted successfully', 'assertive');
    // Show notification
  } catch (error) {
    announceToScreenReader('Form submission failed. Please try again.', 'assertive');
    // Show error notification
  } finally {
    setIsLoading(false);
  }
};
```

---

## Common Patterns and Examples

### 1. Clickable Cards

```tsx
import { Card } from '@mantine/core';

// ✅ CORRECT - Semantic button
<Card
  component={onClick ? 'button' : 'div'}
  onClick={onClick}
  {...(onClick && {
    type: 'button',
    'aria-label': `View details for ${item.title}`,
  })}
>
  {/* Card content */}
</Card>
```

### 2. Toggle Buttons (Like Favorites)

```tsx
<ActionIcon
  onClick={handleToggle}
  aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
  aria-pressed={isActive}
>
  {isActive ? <IconHeartFilled aria-hidden="true" /> : <IconHeart aria-hidden="true" />}
</ActionIcon>

// Add announcement
const handleToggle = () => {
  const newState = !isActive;
  setIsActive(newState);
  announceToScreenReader(
    newState ? 'Added to favorites' : 'Removed from favorites',
    'polite'
  );
};
```

### 3. Modal/Dialog Focus Management

```tsx
import { Modal } from '@mantine/core';
import { useRef, useEffect } from 'react';

function MyModal({ opened, onClose }) {
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 100);
    }
  }, [opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Form">
      <TextInput ref={firstFieldRef} label="First field" />
      {/* Rest of form */}
    </Modal>
  );
}
```

### 4. Loading States

```tsx
// ✅ CORRECT - Screen reader knows button is loading
<Button
  type="submit"
  loading={isLoading}
  aria-label={isLoading ? 'Submitting...' : 'Submit'}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>

// Also announce via screen reader utility
useEffect(() => {
  if (isLoading) {
    announceToScreenReader('Loading data, please wait', 'polite');
  }
}, [isLoading]);
```

### 5. Dynamic Content Updates

```tsx
// Search results count
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  style={{
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  }}
>
  {count > 0 ? `Showing ${count} results` : 'No results found'}
</div>
```

### 6. Navigation Menus

```tsx
// ✅ CORRECT - Semantic nav with aria-label
<nav aria-label="Main navigation">
  <Group>
    <Button component={Link} to="/">Home</Button>
    <Button component={Link} to="/search">Search</Button>
    <Button component={Link} to="/about">About</Button>
  </Group>
</nav>

// Footer navigation
<nav aria-label="Footer links">
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li><a href="/privacy">Privacy Policy</a></li>
    <li><a href="/terms">Terms</a></li>
    <li><a href="/accessibility">Accessibility</a></li>
  </ul>
</nav>
```

---

## Testing Procedures

### Manual Keyboard Testing (5 minutes)

1. **Tab Navigation**
   - Press Tab from page load
   - Verify all interactive elements are reachable
   - Verify focus order is logical
   - Check focus indicator is visible (orange outline)

2. **Form Testing**
   - Tab through all form fields
   - Submit with validation errors
   - Verify error summary appears
   - Check individual field errors

3. **Modal Testing**
   - Open modal with keyboard (Enter on button)
   - Verify focus moves to modal
   - Tab through modal content
   - Verify Escape closes modal

### Screen Reader Testing (10 minutes)

**Windows + NVDA (Free):**
1. Install NVDA from https://www.nvaccess.org/
2. Press Insert+N to start NVDA
3. Navigate site using:
   - H = Next heading
   - K = Next link
   - B = Next button
   - F = Next form field
   - Tab = Next interactive element

**macOS + VoiceOver (Built-in):**
1. Press Cmd+F5 to start VoiceOver
2. Navigate site using:
   - Cmd+Option+H = Next heading
   - Cmd+Option+L = Next link
   - Cmd+Option+J = Next form control
   - Tab = Next interactive element

**What to Listen For:**
- Form labels are read correctly
- Buttons have meaningful labels
- Error messages are announced
- Loading states are announced
- Required fields are identified

### Automated Testing (2 minutes)

#### Lighthouse (Chrome DevTools)
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" only
4. Run audit
5. **Target Score: 100/100**

#### axe DevTools (Chrome Extension)
1. Install axe DevTools extension
2. Open extension on your page
3. Click "Scan ALL of my page"
4. **Target: 0 violations**

### Mobile Testing

1. **Touch Targets**
   - All buttons minimum 44x44px
   - No overlapping touch targets

2. **Zoom**
   - Pinch to zoom up to 500%
   - Content remains readable
   - No horizontal scrolling

3. **Orientation**
   - Rotate device
   - Verify content adapts

---

## Tools and Resources

### Browser Extensions
- **axe DevTools** - Automated accessibility testing
- **WAVE** - Visual accessibility evaluation
- **Lighthouse** - Built into Chrome DevTools
- **React DevTools** - Has accessibility inspection tab

### Screen Readers
- **NVDA** (Windows, Free) - https://www.nvaccess.org/
- **JAWS** (Windows, Paid) - https://www.freedomscientific.com/products/software/jaws/
- **VoiceOver** (macOS/iOS, Built-in) - Press Cmd+F5
- **TalkBack** (Android, Built-in) - Enable in Accessibility settings

### Color Contrast Checkers
- **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/
- **Colour Contrast Analyser** - Desktop app from TPGi

### Documentation
- **WCAG 2.0 Guidelines** - https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices** - https://www.w3.org/WAI/ARIA/apg/
- **MDN Accessibility** - https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Code Utilities
All accessibility utilities are in `frontend/src/utils/accessibility.ts`:
- `announceToScreenReader()` - Screen reader announcements
- `trapFocus()` - Modal focus management
- `generateFieldId()` - Unique field IDs
- `autocompleteValues` - HTML5 autocomplete constants
- `srOnly` - Screen reader only styles

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Forms are not keyboard accessible"
**Solution:** Ensure you're using `<button>` and `<input>` elements, not divs with onClick.

#### Issue: "Screen reader not announcing dynamic content"
**Solution:** Use `announceToScreenReader()` utility or add `role="status"` with `aria-live="polite"`.

#### Issue: "Focus indicator not visible"
**Solution:** Check that global focus styles in `App.css` are not being overridden.

#### Issue: "Form errors not announced to screen reader"
**Solution:**
1. Add error summary with `role="alert"` and `aria-live="assertive"`
2. Add `role="alert"` to individual field error messages
3. Use `aria-invalid="true"` on fields with errors

#### Issue: "Modal traps keyboard focus incorrectly"
**Solution:** Mantine's `<Modal>` component handles this automatically. If using custom modal, use `trapFocus()` from `accessibility.ts`.

#### Issue: "Duplicate ID warnings"
**Solution:** Use `generateFieldId()` utility to create unique IDs for form fields.

#### Issue: "Icon buttons have no accessible name"
**Solution:** Add `aria-label` to every `<ActionIcon>` component. Add `aria-hidden="true"` to the icon inside.

#### Issue: "Mobile zoom disabled"
**Solution:** Check `frontend/index.html` viewport meta tag. Should NOT have `user-scalable=no`.

---

## Legal Requirements (Israeli Standard 5568)

### Mandatory Elements

1. **Accessibility Statement Page**
   - Location: `/accessibility`
   - Must include:
     - WCAG 2.0 Level AA conformance statement
     - Israeli Standard 5568 compliance
     - Contact information (email)
     - Feedback mechanism
     - Response time commitments
     - Last updated date

2. **Contact Information**
   - Email: accessibility@jobrocket.com
   - Must respond within 5 business days
   - Must propose solution within 10 business days

3. **Ongoing Compliance**
   - Update accessibility statement annually
   - Log accessibility complaints
   - Address issues within committed timeframe
   - Keep audit documentation current

### Penalties for Non-Compliance
- First violation: Up to 18,200 NIS
- Repeat violations: Up to 50,000 NIS
- Legal action possible from users

### Required Updates to Accessibility Statement
- When adding major new features
- When changing contact information
- At least once per year
- After significant accessibility improvements

---

## Code Review Checklist

When reviewing pull requests, check for:

### Interactive Elements
- [ ] All icon buttons have `aria-label`
- [ ] Clickable elements use semantic HTML (`<button>`, `<a>`)
- [ ] Toggle buttons have `aria-pressed`
- [ ] Loading states have `aria-label` updates

### Forms
- [ ] Error summary included (when errors present)
- [ ] All fields have unique IDs
- [ ] Required fields have `aria-required="true"`
- [ ] Error fields have `aria-invalid="true"`
- [ ] Error fields have `aria-describedby` pointing to error message
- [ ] Autocomplete attributes added
- [ ] Screen reader announcements on submit

### Navigation
- [ ] Navigation wrapped in `<nav>` with `aria-label`
- [ ] Links use `<Link>` or `<a>` (not divs)
- [ ] Burger menu has `aria-label` and `aria-expanded`

### Dynamic Content
- [ ] Screen reader announcements for changes
- [ ] `aria-live` regions for status updates
- [ ] Loading states announced

### Focus Management
- [ ] Tab order is logical
- [ ] Modal focus trapped correctly
- [ ] Focus indicators visible

---

## Quick Reference: Accessibility Checklist

Print this and keep it at your desk:

```
NEW COMPONENT CHECKLIST:
[ ] Semantic HTML (button, nav, header, main, footer)
[ ] All icon buttons have aria-label
[ ] Form fields have labels and IDs
[ ] Error messages have role="alert"
[ ] Keyboard accessible (test with Tab)
[ ] Focus indicator visible
[ ] Screen reader tested (NVDA/VoiceOver)
[ ] Lighthouse score 100
[ ] No axe violations
[ ] Mobile touch targets 44x44px
[ ] Zoom works (no user-scalable=no)
```

---

## Emergency Accessibility Fixes

If you discover a critical accessibility issue in production:

### Priority 1 (Fix Immediately)
- Clickable divs/spans without role="button"
- Forms with no labels
- Icon buttons with no aria-label
- Viewport meta tag with user-scalable=no
- Keyboard traps

### Priority 2 (Fix Within 24 Hours)
- Missing error summaries on forms
- Missing autocomplete attributes
- Focus indicators not visible
- Screen reader announcements missing

### Priority 3 (Fix Within 1 Week)
- Suboptimal ARIA labels
- Missing loading state announcements
- Touch targets slightly too small

---

## Contact and Support

**Accessibility Questions:**
- Email: accessibility@jobrocket.com
- Internal: Check `accessibility.ts` for utilities
- Documentation: This file + `ACCESSIBILITY_AUDIT.md`

**Reporting Issues:**
- User reports: Forward to accessibility@jobrocket.com
- Internal bugs: Tag with "accessibility" label
- Urgent issues: Follow Emergency Fixes section above

---

**Last Updated:** December 23, 2025
**Next Review:** March 23, 2026
**Maintainer:** [To be assigned]
