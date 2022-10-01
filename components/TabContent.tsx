import { TabContent as TBC } from '../ts/types/ui';


const TabContent = ({ activeTab, tab, children }: TBC): JSX.Element => {

  return (
    <div className={`pt-4 flex-col gap-4 ${activeTab === tab ? 'flex' : 'hidden'} `}>
      {children}
    </div>
  );
};
export default TabContent;
