import { TabContent as TBC } from '../../ts/types/ui';


const TabContent = ({ activeTab, tab, children }: TBC): JSX.Element => {

  return (
    <div className={`pt-48 ${activeTab === tab ? 'block' : 'hidden'} `}>
      {children}
    </div>
  );
};
export default TabContent;
