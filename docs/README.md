# JobRocket Documentation

This folder contains all technical documentation, implementation guides, and policies for the JobRocket platform.

## 📚 Documentation Index

### Implementation Guides

#### [DATE_HANDLING.md](./DATE_HANDLING.md)
**Complete guide to date handling implementation**
- Explains the DD/MM/YYYY standardization across the site
- Details timezone handling to prevent date shift bugs
- Provides code examples and testing guidelines
- **Use this when:** Working with dates, debugging timezone issues, or understanding how listing expiration works

**Key Topics:**
- `formatDate()`, `parseLocalDate()`, and other date utilities
- Preventing timezone shift bugs in date inputs
- How dates are stored in MongoDB and displayed to users
- Testing checklist for date-related features

---

### Accessibility Documentation

#### [ACCESSIBILITY_AUDIT.md](./ACCESSIBILITY_AUDIT.md)
**WCAG 2.0 Level AA accessibility audit and compliance report**
- Documents accessibility standards implementation
- Lists all accessibility features and compliance status
- **Use this when:** Verifying accessibility compliance, onboarding new developers, or preparing for audits

**Key Topics:**
- WCAG 2.0 Level AA compliance
- Screen reader compatibility
- Keyboard navigation support
- Color contrast ratios
- Semantic HTML structure

#### [ACCESSIBILITY_MAINTENANCE.md](./ACCESSIBILITY_MAINTENANCE.md)
**Ongoing accessibility maintenance guide**
- Best practices for maintaining accessibility
- Guidelines for new feature development
- Testing procedures for accessibility
- **Use this when:** Adding new features, reviewing pull requests, or maintaining accessibility standards

**Key Topics:**
- Accessibility checklist for new features
- Common accessibility pitfalls to avoid
- Testing with screen readers
- ARIA attribute usage guidelines

---

### Policies & Legal

#### [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)
**JobRocket Privacy Policy**
- User data collection and usage policies
- GDPR compliance information
- Data retention and deletion procedures
- **Use this when:** Understanding data handling obligations, updating privacy features, or handling user data requests

**Key Topics:**
- What data is collected from users
- How data is stored and protected
- User rights (access, deletion, portability)
- Third-party integrations (OpenAI, Cloudinary)
- Cookie and session management

---

## 🔍 Quick Reference

### Finding Information

| I need to... | Read this document |
|--------------|-------------------|
| Fix a date displaying incorrectly | [DATE_HANDLING.md](./DATE_HANDLING.md) |
| Understand timezone handling | [DATE_HANDLING.md](./DATE_HANDLING.md) |
| Add a new date field | [DATE_HANDLING.md](./DATE_HANDLING.md) |
| Make a feature accessible | [ACCESSIBILITY_MAINTENANCE.md](./ACCESSIBILITY_MAINTENANCE.md) |
| Check accessibility compliance | [ACCESSIBILITY_AUDIT.md](./ACCESSIBILITY_AUDIT.md) |
| Understand data privacy rules | [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) |
| Handle user data deletion request | [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) |

---

## 📝 Document Maintenance

### Ownership

| Document | Owner | Last Updated | Review Frequency |
|----------|-------|--------------|------------------|
| DATE_HANDLING.md | Development Team | 24/12/2025 | When date requirements change |
| ACCESSIBILITY_AUDIT.md | Development Team | (Check file) | Quarterly |
| ACCESSIBILITY_MAINTENANCE.md | Development Team | (Check file) | Quarterly |
| PRIVACY_POLICY.md | Legal/Development | (Check file) | Annually or when laws change |

### Contributing to Documentation

When updating these documents:

1. **Update the "Last Updated" date** at the top of the document
2. **Keep code examples current** - verify they match the actual codebase
3. **Test any code snippets** before adding them to docs
4. **Use clear, beginner-friendly language** - assume the reader is new to the codebase
5. **Add examples** - real-world scenarios help understanding

### Creating New Documentation

When creating new documentation files:

1. Add them to this `docs/` folder
2. Use a descriptive, ALL_CAPS filename (e.g., `API_DOCUMENTATION.md`)
3. Include a table of contents for documents over 100 lines
4. Add an entry to this README's index
5. Follow the same structure as existing docs (Overview, Details, Examples, Troubleshooting)

---

## 🚀 Related Documentation

### Main Project Documentation

- **[../README.md](../README.md)** - Project overview, setup instructions, and API reference
- **[../CLAUDE.md](../CLAUDE.md)** - Guidelines for Claude Code when working with this codebase

### Code Documentation

For inline code documentation, refer to:
- JSDoc comments in utility files (e.g., `frontend/src/utils/dateUtils.ts`)
- Component prop types and descriptions
- API endpoint descriptions in `backend/routes/`

---

## 📧 Questions?

If you can't find what you're looking for in these docs:

1. Check the main [README.md](../README.md) for project setup and API info
2. Look for JSDoc comments in the actual code files
3. Search the codebase for similar implementations
4. Ask in team chat or create a GitHub issue

---

**Last Updated:** 24/12/2025
