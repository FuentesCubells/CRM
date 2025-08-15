

export interface UIInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  options?: Option[];
  registration: {
    value?: any;
    onChange: (event: any) => void;
    onBlur?: (event: any) => void;
    name?: string;
    ref?: (instance: HTMLInputElement | null) => void;
  };
  error?: string;
}

interface Option {
  label: string;
  value: string | number;
}
