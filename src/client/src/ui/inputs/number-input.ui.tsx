import { InputNumber } from 'primereact/inputnumber';
import type { UIInputProps } from '../../models/input.model';


const UINumberInput: React.FC<UIInputProps> = ({ id, label, value, placeholder, registration, error }) => {
  
  return (
    <fieldset className="ui-input-wrapper">
      <label htmlFor={id}>{label?.toUpperCase()}</label>
      <InputNumber
        id={id}
        aria-describedby={`${id}-help`}
        className={error ? 'p-invalid' : ''}
        placeholder={placeholder}
        value={value}
        name={registration.name}
      />
      <small id={`${id}-help`} className={error ? 'p-error' : ''}>
        {error}
      </small>
    </fieldset>
  );
};

export default UINumberInput;
