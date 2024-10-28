/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions } from 'react-hook-form';
import Label from '../Label';

type CustomInputProps = {
  label: string;
  name: string;
  registerOptions?: RegisterOptions;
  placeholder?: string;
  type: 'email' | 'password' | 'text' | 'number' | 'date' | 'datetime-local';
  register: any;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  registerOptions,
  register,
  placeholder = '',
  type = 'text',
}) => {
  return (
    <div className="mb-2">
      <Label name={name}>{label}</Label>
      <input
        type={type}
        className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md"
        placeholder={placeholder}
        {...register(name, registerOptions)}
      />
    </div>
  );
};

export default CustomInput;

