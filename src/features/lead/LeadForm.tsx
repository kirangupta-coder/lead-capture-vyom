import { useState, type FormEvent } from "react";
import { Button } from "../../design-system/atoms/Button";
import { Checkbox } from "../../design-system/atoms/Checkbox";
import { Select } from "../../design-system/atoms/Select";
import { TextArea } from "../../design-system/atoms/TextArea";
import { TextInput } from "../../design-system/atoms/TextInput";
import { FormField } from "../../design-system/molecules/FormField";
import { leadFormConfig, type LeadFieldConfig } from "./leadConfig";
import {
  isFieldVisible,
  validateLeadForm,
  type LeadErrors,
  type LeadValues,
} from "./leadValidation";
import styles from "./LeadForm.module.css";

const initialValues: LeadValues = {
  fullName: "",
  email: "",
  leadType: "",
  companyName: "",
  phone: "",
  notes: "",
  consent: false,
};

interface Props {
  onSubmit: (values: LeadValues) => void;
}

function controlId(name: string): string {
  return `lead-${name}`;
}

export function LeadForm({ onSubmit }: Props) {
  const [values, setValues] = useState<LeadValues>(initialValues);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const visibleFields = leadFormConfig.filter((field) => isFieldVisible(field, values));

  function updateValue(name: string, value: string | boolean) {
    const nextValues = { ...values, [name]: value };
    // Clear hidden company data when switching to Individual.
    if (name === "leadType" && value !== "Company") {
      nextValues.companyName = "";
    }
    setValues(nextValues);

    // Revalidate changed fields that have already been touched, plus conditional company name.
    const nextErrors = validateLeadForm(leadFormConfig, nextValues);
    setErrors((current) => {
      const updated = { ...current };
      if (touched[name] || submitted) {
        if (nextErrors[name]) updated[name] = nextErrors[name];
        else delete updated[name];
      }
      if (name === "leadType" || name === "companyName") {
        if (nextErrors.companyName) updated.companyName = nextErrors.companyName;
        else delete updated.companyName;
      }
      // Errors for hidden fields should never remain visible.
      if (nextValues.leadType !== "Company") delete updated.companyName;
      return updated;
    });
  }

  function validateField(field: LeadFieldConfig) {
    setTouched((current) => ({ ...current, [field.name]: true }));
    const currentErrors = validateLeadForm(leadFormConfig, values);
    setErrors((current) => {
      const updated = { ...current };
      if (currentErrors[field.name]) updated[field.name] = currentErrors[field.name];
      else delete updated[field.name];
      if (values.leadType !== "Company") delete updated.companyName;
      return updated;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const currentErrors = validateLeadForm(leadFormConfig, values);
    setErrors(currentErrors);
    setTouched(Object.fromEntries(visibleFields.map((field) => [field.name, true])));
    if (Object.keys(currentErrors).length > 0) {
      const firstInvalid = visibleFields.find((field) => currentErrors[field.name]);
      if (firstInvalid) {
        document.getElementById(controlId(firstInvalid.name))?.focus();
      }
      return;
    }

    const cleanValues = { ...values };
    if (cleanValues.leadType !== "Company") delete cleanValues.companyName;
    onSubmit(cleanValues);
  }

  function renderControl(field: LeadFieldConfig) {
    const id = controlId(field.name);
    const error = errors[field.name];
    const describedBy = [
      field.hint ? `${id}-hint` : undefined,
      error ? `${id}-error` : undefined,
    ].filter(Boolean).join(" ") || undefined;
    const common = {
      id,
      name: field.name,
      required: field.required,
      "aria-invalid": Boolean(error),
      "aria-describedby": describedBy,
      onBlur: () => validateField(field),
    };

    switch (field.type) {
      case "text":
      case "email":
        return (
          <TextInput
            {...common}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            value={String(values[field.name] ?? "")}
            onChange={(value) => updateValue(field.name, value)}
            autoComplete={field.name === "fullName" ? "name" : field.name === "email" ? "email" : field.name === "phone" ? "tel" : "organization"}
            inputMode={field.name === "phone" ? "numeric" : undefined}
          />
        );
      case "select":
        return (
          <Select
            {...common}
            label={field.label}
            value={String(values[field.name] ?? "")}
            options={field.options ?? []}
            onChange={(value) => updateValue(field.name, value)}
          />
        );
      case "textarea":
        return (
          <TextArea
            {...common}
            label={field.label}
            placeholder={field.placeholder}
            maxLength={field.validations?.maxLength}
            value={String(values[field.name] ?? "")}
            onChange={(value) => updateValue(field.name, value)}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            id={id}
            name={field.name}
            checked={values[field.name] === true}
            label={field.label}
            onChange={(checked) => updateValue(field.name, checked)}
            onBlur={() => validateField(field)}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
          />
        );
      default: {
        const exhaustive: never = field.type;
        return exhaustive;
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.requiredNote}><span className="requiredMark">*</span> Required fields</p>

      {submitted && Object.keys(errors).length > 0 && (
        <div className={styles.formError} role="alert" aria-live="polite">
          Please correct the {Object.keys(errors).length} highlighted {Object.keys(errors).length === 1 ? "field" : "fields"} before submitting.
        </div>
      )}

      <div className={styles.grid}>
        {visibleFields.map((field) => {
          const id = controlId(field.name);
          const error = errors[field.name];
          const isConsent = field.type === "checkbox";
          return (
            <div
              className={[
                styles.field,
                field.fullWidth ? styles.fullWidth : "",
                isConsent ? styles.fullWidth : "",
                isConsent ? styles.checkboxField : "",
              ].filter(Boolean).join(" ")}
              key={field.name}
            >
              {isConsent ? (
                <>
                  {renderControl(field)}
                  {error && <p className="consentError" id={`${id}-error`} role="alert">{error}</p>}
                </>
              ) : (
                <FormField
                  id={id}
                  label={field.label}
                  required={field.required}
                  hint={field.name === "notes"
                    ? `${String(values.notes ?? "").length}/200 characters`
                    : field.hint}
                  error={error}
                >
                  {renderControl(field)}
                </FormField>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <Button type="submit" fullWidth className={styles.submitButton}>
          Submit enquiry <span aria-hidden="true">→</span>
        </Button>
      </div>
    </form>
  );
}