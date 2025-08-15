import { Dropdown } from 'primereact/dropdown';
import './input.ui.scss';
import type { UIInputProps } from '../../models/input.model';



const UIDropdown: React.FC<UIInputProps> = ({ id, label, value, options, placeholder, registration, error }) => {
  
  return (
    <fieldset className="ui-input-wrapper">
      <label htmlFor={id}>{label?.toUpperCase()}</label>
      <Dropdown
        id={id}
        options={options}
        optionLabel={registration.value}
        placeholder={placeholder}
        value={value}
        onChange={registration.onChange}
        onBlur={registration.onBlur}
        name={registration.name}
      />
      {error && <small className="p-error">{error}</small>}
    </fieldset>
  );
};

export default UIDropdown;
