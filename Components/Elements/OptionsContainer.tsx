import { OptionsContainer as OC } from '../../ts/types/ui';

const OptionsContainer = ({ children, className }: OC): JSX.Element => {
  return (
    <div className={` ${className} flex items-center gap-4 flex-wrap mb-4`}>
      {children}
    </div>
  );
};
export default OptionsContainer;
