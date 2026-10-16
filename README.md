# Northstar — Dynamic Lead Capture Form

A responsive lead-capture form built with React and TypeScript. It renders fields from a typed configuration, keeps validation in a pure function, and uses a small custom design system without a component library.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To check a production build:

```bash
npm run build
npm run preview
```

## Folder layout

```text
src/
  design-system/
    tokens/
      tokens.css           # Color, spacing, type, breakpoints
    atoms/
      TextInput.tsx        # Generic text/email input
      Select.tsx           # Generic select
      TextArea.tsx         # Generic textarea
      Checkbox.tsx         # Generic checkbox
      Button.tsx           # Generic button
      atoms.module.css     # Atom styles
    molecules/
      FormField.tsx        # Label + control + hint + error
      FormField.module.css
  features/
    lead/
      leadConfig.ts        # Typed lead form configuration
      leadValidation.ts    # Pure config + values -> errors
      LeadForm.tsx         # Config-driven field renderer and form state
      LeadForm.module.css  # Responsive grid and mobile sticky action
      LeadPage.tsx         # Page shell and submission result
      LeadPage.module.css
  App.tsx
  main.tsx
```

## Architecture notes

- **Tokens:** `src/design-system/tokens/tokens.css`
- **Atoms:** `src/design-system/atoms/`
- **Field molecule:** `src/design-system/molecules/FormField.tsx`
- **Config:** `src/features/lead/leadConfig.ts`
- **Validation rules:** `src/features/lead/leadValidation.ts`
- **Form rendering and state:** `src/features/lead/LeadForm.tsx`
- **Page and submission output:** `src/features/lead/LeadPage.tsx`
- **Desktop and mobile layout:** `src/features/lead/LeadForm.module.css`

Add a supported field by adding a typed config entry and, if needed, an atom for its type. Field-specific lead rules belong in the validation module, never in atoms.

## Validation behavior

- Required fields, email format, 10-digit phone, and notes max length are validated on blur and submit.
- Company name is shown and required only for the Company lead type.
- Hidden company name is removed from submitted values and does not produce a validation error.
- Submission is blocked while errors exist; valid values are displayed on the page.
- Consent is a required checkbox.
