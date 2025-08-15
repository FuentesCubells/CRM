import React from 'react';
import { Calendar } from 'primereact/calendar'; // ejemplo si usas PrimeReact
import './input.ui.scss';
import type { UIInputProps } from '../../models/input.model';

const UIDateInput :React.FC<UIInputProps>= ({ id, label, placeholder, registration, error }) => {
  return (
    <fieldset className="ui-input-wrapper">
        
      {label && (
        <label htmlFor={id}>
          {label.toUpperCase()}
        </label>
      )}

      <Calendar
        id={id}
        value={registration.value}
        onChange={registration.onChange}
        onBlur={registration.onBlur}
        name={registration.name}
        placeholder={placeholder}
        dateFormat="dd/mm/yy"
        className={error ? 'p-invalid' : ''}
      />

      {error && (
        <small id={`${id}-help`} className="p-error">
          {error}
        </small>
      )}
    </fieldset>
  );
};

export default UIDateInput;
