import { Ui } from '../../ts/types/ui';

const Input = ({
  type,
  className,
  placeHolder,
}: Ui & { type: string; placeHolder: string }): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      className={`${className}  py-2 px-2 dark:focus:outline-none focus:outline-none border focus:border-indigo-600 border-gray-300 `}
    />
  );
};
export default Input;
