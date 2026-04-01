import React from 'react';

export default function AuthField({
  label,
  icon,
  placeholder,
  type = 'text',
  value,
  onChange,
  autoComplete,
  name,
  error,
  hint,
  maxLength,
  inputProps = {},
}) {
  return (
    <label className={`suite-field-group ${error ? 'invalid' : ''}`.trim()}>
      <span className="suite-field-label">{label}</span>
      <span className="suite-field-shell">
        <span className="suite-field-icon">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          name={name}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          {...inputProps}
        />
      </span>
      {error ? <span className="suite-field-note error">{error}</span> : null}
      {!error && hint ? <span className="suite-field-note">{hint}</span> : null}
    </label>
  );
}
