import { CheckBox as CB } from '../ts/types/ui';

const CheckBox = ({ className, name, id }: CB): JSX.Element => {
  return <input type='checkbox' name={name} id={id} className={`${className} accent-indigo-500`} />;
};
export default CheckBox;
