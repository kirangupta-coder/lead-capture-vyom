export type LeadFieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export interface LeadOption {
  label: string;
  value: string;
}

export interface LeadFieldConfig {
  name: string;
  type: LeadFieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: LeadOption[];
  validations?: {
    email?: boolean;
    pattern?: string;
    patternMessage?: string;
    maxLength?: number;
  };
  visibleWhen?: {
    field: string;
    equals: string;
  };
  fullWidth?: boolean;
}

export const leadFormConfig: LeadFieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    placeholder: "e.g. Kiran Gupta",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Work email",
    placeholder: "you@company.com",
    required: true,
    validations: { email: true },
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    required: true,
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Company", value: "Company" },
    ],
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    placeholder: "Enter company name",
    required: true,
    visibleWhen: { field: "leadType", equals: "Company" },
  },
  {
    name: "phone",
    type: "text",
    label: "Phone number",
    placeholder: "10-digit mobile number",
    required: true,
    hint: "Enter a 10-digit phone number without a country code.",
    validations: {
      pattern: "^\\d{10}$",
      patternMessage: "Enter exactly 10 digits.",
    },
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Tell us a little about what you need (optional)",
    hint: "Maximum 200 characters.",
    validations: { maxLength: 200 },
    fullWidth: true,
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted about my enquiry.",
    required: true,
    fullWidth: true,
  },
];