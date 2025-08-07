import './input.ui.scss';
import type { UIInputProps } from '../../models/input.model';

import { Password } from "primereact/password";


const UIInputPassword: React.FC<UIInputProps> = ({
  id = 'password',
  label = 'Contraseña',
  placeholder = 'Contraseña',
  registration,
  error
}) => {
  return (
    <fieldset className="ui-input-wrapper">
      <label htmlFor={id}>{label}</label>
      <Password
        id={id}
        placeholder={placeholder}
        toggleMask
        feedback={false}
        aria-describedby={`${id}-help`}
        className={error ? 'p-invalid' : ''}
        value={registration.value}
        onChange={registration.onChange}
        onBlur={registration.onBlur}
        name={registration.name}
        inputRef={registration.ref}
      />
      <small id={`${id}-help`} className={error ? 'p-error' : ''}>
        {error || `Introduce tu ${label?.toLowerCase()}`}
      </small>
    </fieldset>
  );
};

export default UIInputPassword;
