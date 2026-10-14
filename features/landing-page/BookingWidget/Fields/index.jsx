import { useId } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';

const CONTROL = cn(
  'min-h-13 w-full min-w-0 rounded-xl border bg-white py-3 text-sm text-ink',
  'transition disabled:bg-soft disabled:text-muted',
  FOCUS,
);

function Field({ id, label, error, className, children }) {
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-ink">
        {label}
      </label>

      {children}

      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs leading-5 text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  options,
  placeholder,
  icon,
  error,
  className,
  required = true,
  ...props
}) {
  const id = useId();

  return (
    <Field id={id} label={label} error={error} className={className}>
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="pointer-events-none absolute left-3 top-4 size-5 text-ocean"
          />
        )}

        <select
          {...props}
          id={id}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            CONTROL,
            'appearance-none truncate pr-9',
            icon ? 'pl-10' : 'pl-3',
            error ? 'border-danger' : 'border-line hover:border-ink/30',
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <Icon
          name="chevron-down"
          className="pointer-events-none absolute right-3 top-[18px] size-4 text-muted"
        />
      </div>
    </Field>
  );
}

export function DateField({
  label,
  error,
  className,
  required = true,
  ...props
}) {
  const id = useId();

  return (
    <Field id={id} label={label} error={error} className={className}>
      <input
        {...props}
        id={id}
        type="date"
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          CONTROL,
          'block px-3',
          error ? 'border-danger' : 'border-line hover:border-ink/30',
        )}
      />
    </Field>
  );
}

export function CheckboxField({ label, ...props }) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer items-start gap-3 text-sm leading-5 text-ink"
    >
      <input
        {...props}
        id={id}
        type="checkbox"
        className={cn('mt-0.5 size-4 shrink-0 rounded accent-ink', FOCUS)}
      />
      <span>{label}</span>
    </label>
  );
}

export function ChoiceGroup({ label, name, options, value, onChange, error }) {
  const id = useId();

  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="sr-only">{label}</legend>

      <div className="inline-flex flex-wrap gap-1 rounded-full bg-mist p-1">
        {options.map((option) => (
          <label key={option.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={`${id}-${name}`}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              aria-invalid={Boolean(error)}
              className="peer sr-only"
            />
            <span className="block rounded-full px-4 py-2 text-xs font-semibold text-muted transition peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ocean peer-focus-visible:ring-offset-2">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
