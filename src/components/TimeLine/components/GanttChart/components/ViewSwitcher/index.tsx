import React from 'react';
import 'gantt-task-react/dist/index.css';
import { ViewMode } from 'gantt-task-react';
import './viewSwitcher.scss'

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
    const [activeVmde, setActiveVmde] = React.useState(ViewMode.Day)
    const viewModeChangeHandler = (vmde:any) => {
        onViewModeChange(vmde)
        setActiveVmde(vmde)
    }
  return (
    <div className="viewContainer">
        <div className='viewContainer-inner'>
      <button className={`${activeVmde === ViewMode.Day? 'active':''}`} onClick={() => viewModeChangeHandler(ViewMode.Day)}>
        Day
      </button>
      <button
        className={`${activeVmde === ViewMode.Week? 'active':''}`}
        onClick={() => viewModeChangeHandler(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className={`${activeVmde === ViewMode.Month? 'active':''}`}
        onClick={() => viewModeChangeHandler(ViewMode.Month)}
      >
        Month
      </button>
        </div>
    </div>
  );
};
