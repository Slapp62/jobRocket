/**
 * Accessibility Utilities for WCAG 2.0 Level AA Compliance (Israeli Standard 5568)
 *
 * This file provides helper functions for implementing accessible features
 * that meet legal requirements for web accessibility in Israel.
 */

/**
 * Screen reader only styles - hides content visually but keeps it available to assistive technology
 *
 * WHEN TO USE:
 * - Form field hints that provide context but clutter the visual design
 * - Loading state announcements ("Loading job listings...")
 * - Icon button labels when the icon meaning is obvious to sighted users
 * - Additional instructions for screen reader users
 *
 * EXAMPLE:
 * <span style={srOnly}>This field is required</span>
 */
export const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
} as const;

/**
 * Announces a message to screen readers without displaying it visually
 *
 * This is critical for dynamic content changes that sighted users can see
 * but screen reader users might miss (search results loading, form submission, etc.)
 *
 * HOW IT WORKS:
 * - Creates a temporary DOM element with aria-live region
 * - Screen readers detect the content change and announce it
 * - Element is removed after 1 second (after screen reader has processed it)
 *
 * @param message - The text to announce to screen reader users
 * @param priority - 'polite' (default) waits for user to finish, 'assertive' interrupts immediately
 *
 * EXAMPLES:
 * - Search results: announceToScreenReader('Found 25 job listings')
 * - Form success: announceToScreenReader('Application submitted successfully')
 * - Form error: announceToScreenReader('Form contains errors', 'assertive')
 * - Favorites: announceToScreenReader('Job added to favorites')
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');

  // Apply screen reader only styles
  announcement.style.position = 'absolute';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.padding = '0';
  announcement.style.margin = '-1px';
  announcement.style.overflow = 'hidden';
  announcement.style.clip = 'rect(0, 0, 0, 0)';
  announcement.style.whiteSpace = 'nowrap';
  announcement.style.borderWidth = '0';

  announcement.textContent = message;
  document.body.appendChild(announcement);

  // Remove after screen reader has had time to announce
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

/**
 * Gets all focusable elements within a container
 *
 * USED FOR:
 * - Focus trap in modals (keep Tab key within the modal)
 * - Keyboard navigation in custom components
 * - Ensuring all interactive elements are keyboard-accessible
 *
 * RETURNS: NodeList of all focusable elements in DOM order
 *
 * EXAMPLE:
 * const modal = document.querySelector('#my-modal');
 * const focusableElements = getFocusableElements(modal);
 * focusableElements[0].focus(); // Focus first element
 */
export const getFocusableElements = (container: HTMLElement): NodeListOf<HTMLElement> => {
  return container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
};

/**
 * Creates a focus trap within a container (for modals, drawers, etc.)
 *
 * WHAT IT DOES:
 * - Prevents Tab key from leaving the container
 * - Loops focus from last element back to first (and vice versa)
 * - Critical for modal accessibility - users shouldn't tab out of a modal
 *
 * HOW TO USE:
 * const cleanup = trapFocus(modalElement);
 * // When modal closes:
 * cleanup();
 *
 * @param container - The element to trap focus within
 * @returns Cleanup function to remove the trap
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') {
      return;
    }

    if (e.shiftKey) {
      // Shift + Tab (going backwards)
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else if (document.activeElement === lastElement) {
      // Tab (going forwards)
      e.preventDefault();
      firstElement?.focus();
    }
  };

  container.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Generates a unique ID for form fields (prevents duplicate IDs)
 *
 * WHY THIS MATTERS:
 * - Screen readers use IDs to link labels to inputs
 * - Multiple forms on same page (tabs, etc.) can cause duplicate IDs
 * - Duplicate IDs break screen reader form navigation
 *
 * EXAMPLE:
 * const emailId = generateFieldId('email', 'jobseeker');
 * // Returns: "jobseeker-email-a1b2c3"
 *
 * @param fieldName - The field name (e.g., "email", "password")
 * @param prefix - Optional prefix to distinguish forms (e.g., "jobseeker", "business")
 * @returns Unique ID string
 */
export const generateFieldId = (fieldName: string, prefix?: string): string => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}-${fieldName}-${randomSuffix}` : `${fieldName}-${randomSuffix}`;
};

/**
 * Common autocomplete values for form fields
 *
 * AUTOCOMPLETE IMPROVES ACCESSIBILITY BY:
 * - Helping users with cognitive disabilities fill forms faster
 * - Reducing typing errors
 * - Making forms faster for everyone
 *
 * Reference: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
 */
export const autocompleteValues = {
  // Personal info
  email: 'email',
  firstName: 'given-name',
  lastName: 'family-name',
  fullName: 'name',
  phone: 'tel',

  // Authentication
  currentPassword: 'current-password',
  newPassword: 'new-password',
  username: 'username',

  // Business
  organization: 'organization',
  jobTitle: 'organization-title',

  // Address
  street: 'street-address',
  city: 'address-level2',
  region: 'address-level1',
  country: 'country',
  postalCode: 'postal-code',
} as const;

/**
 * Validates if an element has proper accessibility attributes
 *
 * USE IN DEVELOPMENT:
 * - Check if buttons have labels
 * - Verify forms have proper structure
 * - Find accessibility issues before users do
 *
 * @param element - DOM element to validate
 * @returns Object with validation results and warnings
 */
export const validateAccessibility = (
  element: HTMLElement
): {
  isValid: boolean;
  warnings: string[];
} => {
  const warnings: string[] = [];

  // Check buttons have accessible names
  if (
    element.tagName === 'BUTTON' &&
    !element.textContent?.trim() &&
    !element.getAttribute('aria-label')
  ) {
    warnings.push('Button has no accessible name (needs text content or aria-label)');
  }

  // Check images have alt text
  if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
    warnings.push('Image missing alt attribute');
  }

  // Check form inputs have labels
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
    const id = element.id;
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);

    if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
      warnings.push('Form field has no associated label');
    }
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  };
};
