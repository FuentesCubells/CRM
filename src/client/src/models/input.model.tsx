

export interface UIInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  registration: {
    value?: string;
    onChange: (event: any) => void;
    onBlur?: (event: any) => void;
    name?: string;
    ref?: (instance: HTMLInputElement | null) => void;
  };
  error?: string;
}
