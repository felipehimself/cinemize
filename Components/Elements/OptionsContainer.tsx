import { OptionsContainer as OC } from '../../ts/types/ui';

const OptionsContainer = ({ children, className }: OC): JSX.Element => {
  return (
    <div className={` ${className} flex items-center gap-3 flex-wrap `}>
      {children}
    </div>
  );
};
export default OptionsContainer;
