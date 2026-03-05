import { forwardRef } from 'react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Input label (required for accessibility) */
  label: string
  /** Error message to display */
  error?: string
  /** Hint text below input */
  hint?: string
  /** Additional CSS classes for the wrapper */
  wrapperClassName?: string
  /** Additional CSS classes for the input */
  inputClassName?: string
  /** Hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean
}

/**
 * Input Component
 *
 * Form input with label, error, and hint text support.
 * Follows accessibility best practices with proper labeling.
 *
 * @example
 * <Input
 *   label="Nombre completo"
 *   name="name"
 *   placeholder="Juan Perez"
 *   error={errors.name}
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      wrapperClassName = '',
      inputClassName = '',
      hideLabel,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={`space-y-1.5 ${wrapperClassName}`}>
        <label
          htmlFor={inputId}
          className={`block font-body text-sm font-medium text-ink ${
            hideLabel ? 'sr-only' : ''
          }`}
        >
          {label}
          {props.required && (
            <span className="text-pink ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={`input ${error ? 'input-error' : ''} ${inputClassName}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="font-body text-xs text-pink-dark"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="font-body text-xs text-ink-faint"
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
