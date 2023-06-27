import KanbanUI from 'components/KanbanNew';
import TableviewNew from 'components/TableviewNew/TableviewNew';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

export default function DatabaseView(): JSX.Element {
  const { activestate }: any = useSelector((state) => state);
  const { currentSelectedUI: csUI, nodeIDs } = activestate;

  const [currentSelectedUI, setCurrentSelectedUI] = useState('');

  return (
    <div>
      <TableviewNew workspaceObj={} uiDetails={currentSelectedUI} />
    </div>
  );
}
