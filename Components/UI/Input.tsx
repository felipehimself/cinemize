import { Input as InpType } from '../../ts/types/ui';

const Input = ({ type, className, placeHolder, name,id, value, onChange }: InpType): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      name={name}
      onChange={onChange}
      id={id}
      value={value}
      className={`${className}  py-2 px-2 dark:focus:outline-none focus:outline-none border focus:border-indigo-600 border-gray-300 `}
    />
  );
};
export default Input;
