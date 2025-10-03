# Contributing Guide

> Guidelines for contributing to Tim Superville's portfolio project

## Welcome

Thank you for your interest in contributing! While this is primarily a personal portfolio, contributions that improve the codebase, fix bugs, or enhance documentation are welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and professional in all interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Personal or political attacks
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**Good bug reports include:**
- **Clear title**: Summarize the issue in one line
- **Description**: Detailed explanation of the problem
- **Steps to reproduce**: How to trigger the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable
- **Additional context**: Any other relevant information

**Example:**
```markdown
**Title:** Contact form fails to submit on mobile Safari

**Description:**
When submitting the contact form on mobile Safari (iOS 15+), 
the form appears to submit but no data is sent to Formspree.

**Steps to Reproduce:**
1. Open site on iPhone with Safari
2. Fill out contact form
3. Click Submit
4. Form shows success message but no email received

**Expected:** Form submission sent to Formspree
**Actual:** Form validation passes, but fetch fails silently
**Environment:** iOS 15.7, Safari, iPhone 12
**Screenshot:** [attach image]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**Good enhancement suggestions include:**
- **Clear title**: Summarize the enhancement
- **Use case**: Why would this be useful?
- **Current behavior**: How does it work now?
- **Proposed behavior**: How should it work?
- **Alternatives considered**: Other approaches you thought about
- **Additional context**: Mockups, examples, etc.

**Example:**
```markdown
**Title:** Add dark mode toggle

**Use Case:**
Many users prefer dark mode, especially for evening browsing.
A dark mode would reduce eye strain and improve user experience.

**Current Behavior:**
Site uses light theme only.

**Proposed Behavior:**
- Toggle button in header
- Persists preference in localStorage
- Smooth transition between themes
- Respects prefers-color-scheme media query

**Alternatives:**
- Automatic based on system preference only
- Time-based (dark after 6pm)

**Mockup:**
[attach design mockup]
```

### Contributing Code

Areas where contributions are particularly welcome:

**Bug Fixes:**
- Form validation edge cases
- Browser compatibility issues
- Responsive design problems
- Analytics tracking bugs

**Improvements:**
- Performance optimizations
- Accessibility enhancements
- SEO improvements
- Code quality (reducing complexity, improving readability)

**Documentation:**
- Fixing typos or unclear instructions
- Adding examples to documentation
- Improving code comments
- Creating tutorials

**Not Accepting:**
- Major feature additions without prior discussion
- Style changes without clear improvement
- Dependencies without strong justification
- Breaking changes without migration path

## Development Setup

### Prerequisites

- **Node.js**: 14.x or higher (18.x recommended)
- **npm**: 6.x or higher
- **Git**: For version control
- **Modern browser**: Chrome, Firefox, or Safari

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/timsuperville.github.io.git
   cd timsuperville.github.io
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/timsuperville/timsuperville.github.io.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5173`
   - Make changes and see them live with HMR

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your main branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## Pull Request Process

### Before Creating a PR

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Follow coding standards (see below)
   - Write clear, descriptive commit messages
   - Test your changes thoroughly

3. **Build and test**
   ```bash
   npm run build
   npm run preview
   ```

4. **Update documentation**
   - Update README.md if adding features
   - Add comments for complex code
   - Update DEVELOPER.md if changing architecture

### Creating the PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open Pull Request on GitHub**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch

3. **Fill out PR template**

```markdown
## Description
[Clear description of what this PR does]

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
Fixes #[issue number]

## Changes Made
- [List specific changes]
- [Be detailed but concise]

## Screenshots (if applicable)
[Add before/after screenshots for UI changes]

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Tested responsive design
- [ ] Built successfully (`npm run build`)

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly
```

### PR Review Process

1. **Automated checks**: CI builds must pass (if configured)
2. **Code review**: Maintainer will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Cleanup**: Delete your feature branch after merge

## Coding Standards

### JavaScript/React

**Style:**
```javascript
// ✅ Good: Clear, descriptive names
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ❌ Avoid: Vague names
function v(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}
```

**Components:**
```javascript
// ✅ Good: Small, focused component
function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

// ❌ Avoid: Too many responsibilities
function MegaComponent() {
  // 500 lines of mixed concerns...
}
```

**Hooks:**
```javascript
// ✅ Good: Clear dependencies
useEffect(() => {
  fetchData()
}, [userId])  // Re-run when userId changes

// ❌ Avoid: Missing dependencies
useEffect(() => {
  fetchData()
}, [])  // Warning: fetchData depends on userId
```

### CSS

**Variables:**
```css
/* ✅ Good: CSS variables for consistency */
:root {
  --color-primary: #4f46e5;
}

.button {
  background-color: var(--color-primary);
}

/* ❌ Avoid: Hardcoded values */
.button {
  background-color: #4f46e5;
}
```

**Naming:**
```css
/* ✅ Good: BEM-style naming */
.card {}
.card__title {}
.card__body {}
.card--featured {}

/* ❌ Avoid: Generic names */
.item {}
.text {}
.thing {}
```

### File Organization

```
src/
├── App.jsx              # Main component
├── ComponentName.jsx    # PascalCase for components
├── utilityName.js       # camelCase for utilities
└── styles.css           # Global styles
```

### Comments

**Do comment:**
- Complex algorithms
- Non-obvious workarounds
- Business logic
- Public API functions (JSDoc)

```javascript
/**
 * Calculate the optimal image size based on viewport
 * 
 * This uses a progressive enhancement approach:
 * - Mobile: 480px
 * - Tablet: 768px
 * - Desktop: 1200px
 * 
 * @param {number} viewportWidth - Current viewport width in pixels
 * @returns {number} Optimal image width
 */
function getOptimalImageSize(viewportWidth) {
  if (viewportWidth < 768) return 480
  if (viewportWidth < 1024) return 768
  return 1200
}
```

**Don't comment:**
- Obvious code
- What code does (code should be self-documenting)
- Old code (delete it instead)

```javascript
// ❌ Bad: Obvious comment
// Set name to firstName
const name = firstName

// ✅ Good: No comment needed
const name = firstName
```

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

**Good commits:**
```bash
git commit -m "feat: Add dark mode toggle to header"
git commit -m "fix: Resolve contact form validation on Safari"
git commit -m "docs: Update installation instructions in README"
git commit -m "perf: Optimize image loading with lazy loading"
```

**Bad commits:**
```bash
git commit -m "updates"
git commit -m "fix"
git commit -m "changes"
```

**With body:**
```
feat: Add email validation to contact form

- Add regex pattern for email validation
- Display error message for invalid emails
- Prevent form submission if invalid

Closes #42
```

### Commit Best Practices

1. **One logical change per commit**: Don't mix unrelated changes
2. **Present tense**: "Add feature" not "Added feature"
3. **Imperative mood**: "Fix bug" not "Fixes bug"
4. **50 character subject**: Keep it concise
5. **72 character body**: Wrap body text
6. **Reference issues**: Use "Fixes #123" or "Closes #456"

## Testing

### Manual Testing Checklist

Before submitting a PR, test:

**Functionality:**
- [ ] Feature works as intended
- [ ] No console errors
- [ ] No visual regressions
- [ ] Form validation works
- [ ] Links work correctly

**Browsers:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

**Responsive Design:**
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (basic check)
- [ ] Sufficient color contrast
- [ ] Focus indicators visible

### Automated Testing (Future)

When automated tests are added:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Check coverage
npm test -- --coverage
```

## Documentation

### When to Update Documentation

Update documentation when:
- Adding new features
- Changing existing behavior
- Fixing bugs that were documented
- Improving setup instructions
- Adding configuration options

### Documentation Files

- **README.md**: Main project documentation
- **DEVELOPER.md**: Developer guide and best practices
- **CUSTOMIZATION.md**: How to customize the portfolio
- **ANALYTICS.md**: Analytics setup and privacy
- **Code comments**: Inline documentation

### Writing Documentation

**Be clear and concise:**
```markdown
✅ Good:
To start the development server, run `npm run dev`.

❌ Avoid:
You might want to consider possibly running the npm run dev
command if you want to start the server for development purposes.
```

**Use examples:**
```markdown
✅ Good:
Set your analytics ID in `.env`:
```env
VITE_GA_ID=G-ABC123XYZ
```

❌ Avoid:
Configure analytics in the environment file.
```

**Structure content:**
```markdown
✅ Good:
## Installation

1. Clone repository
2. Install dependencies
3. Start server

❌ Avoid:
To install, you need to clone the repository and then install
dependencies using npm and after that start the server...
```

## Questions?

If you have questions about contributing:

1. Check existing documentation:
   - [README.md](./README.md)
   - [DEVELOPER.md](./DEVELOPER.md)
   - [GitHub Issues](https://github.com/timsuperville/timsuperville.github.io/issues)

2. Create a discussion:
   - Open a GitHub Discussion
   - Tag as "question"
   - Provide context

3. Contact maintainer:
   - Email: [tim@timsuperville.dev](mailto:tim@timsuperville.dev)
   - Include "Portfolio Contribution Question" in subject

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see [LICENSE](./LICENSE) if available, or refer to README.md).

## Thank You!

Your contributions help make this project better for everyone. Thank you for taking the time to contribute!

---

**Last Updated**: January 2025  
**Maintained by**: Tim Superville
