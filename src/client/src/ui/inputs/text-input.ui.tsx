import { InputText } from 'primereact/inputtext';
import type { UIInputProps } from '../../models/input.model';


const UIInputText: React.FC<UIInputProps> = ({ id, label, placeholder, registration, error }) => {
  
  return (
    <fieldset className="ui-input-wrapper">
      <label htmlFor={id}>{label?.toUpperCase()}</label>
      <InputText
        id={id}
        aria-describedby={`${id}-help`}
        className={error ? 'p-invalid' : ''}
        placeholder={placeholder}
        value={registration.value}
        onChange={registration.onChange}
        onBlur={registration.onBlur}
        name={registration.name}
        ref={registration.ref}
      />
      <small id={`${id}-help`} className={error ? 'p-error' : ''}>
        {error}
      </small>
    </fieldset>
  );
};

export default UIInputText;
