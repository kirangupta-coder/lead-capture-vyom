import type { LeadFieldConfig } from "./leadConfig";

export type LeadValues = Record<string, string | boolean>;
export type LeadErrors = Record<string, string>;

export function isFieldVisible(field: LeadFieldConfig, values: LeadValues): boolean {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

/**
 * Pure validator: no React state, DOM access, or side effects.
 * Returns all errors for currently visible fields.
 */
export function validateLeadForm(
  config: LeadFieldConfig[],
  values: LeadValues,
): LeadErrors {
  const errors: LeadErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) continue;

    const rawValue = values[field.name];
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;
    const isEmpty = field.type === "checkbox"
      ? value !== true
      : value === undefined || value === null || value === "";

    if (field.required && isEmpty) {
      errors[field.name] = field.type === "checkbox"
        ? "Please provide your consent to continue."
        : `${field.label} is required.`;
      continue;
    }

    if (isEmpty) continue;

    if (field.validations?.email && typeof value === "string") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errors[field.name] = "Enter a valid email address.";
        continue;
      }
    }

    if (field.validations?.pattern && typeof value === "string") {
      const pattern = new RegExp(field.validations.pattern);
      if (!pattern.test(value)) {
        errors[field.name] = field.validations.patternMessage ?? `${field.label} has an invalid format.`;
        continue;
      }
    }

    if (
      field.validations?.maxLength !== undefined &&
      typeof value === "string" &&
      value.length > field.validations.maxLength
    ) {
      errors[field.name] = `${field.label} must be ${field.validations.maxLength} characters or fewer.`;
    }
  }

  return errors;
}