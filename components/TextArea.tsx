import { TextArea as TA } from '../ts/types/ui';

const TextArea = ({ className, id, name, placeholder }: TA): JSX.Element => {
  return (
    <textarea
      name={name}
      id={id}
      placeholder={placeholder}
      className={` ${className} dark:border-dark focus:outline-none focus:border-indigo-600 p-2  w-full border rounded-md resize-none`}
    />
  );
};
export default TextArea;
