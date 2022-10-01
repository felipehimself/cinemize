import { Fieldset } from '../ts/types/ui';

const Fieldset = ({
  children,
  disabled,
  className,
}: Fieldset): JSX.Element => {
  return (
    <fieldset disabled={disabled} className={`${className}`}>
      {children}
    </fieldset>
  );
};
export default Fieldset;
