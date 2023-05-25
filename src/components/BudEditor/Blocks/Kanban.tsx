/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import ContentEditable from 'react-contenteditable';
import { useEffect } from 'react';
import KanbanUI from '../../KanbanNew';
import { useSelector } from 'react-redux';
import ListView from 'components/ListView/ListView';

// import Header from './Blocks/H1';

function Kanban({ data, handleChange, handleKeyDown }) {
  const { workspace } = useSelector((state) => state);
  useEffect(() => {
    console.log("Sdasas", data);
  }, []);

  return (
    <>
    <KanbanUI workspaceObj={workspace}/>
    <ListView workspaceObj={workspace} contentRef={undefined}/>
    </>
    // <ContentEditable
    //   html={`<h${data.data.level}>${data.data.text}</h${data.data.level}>`} // innerHTML of the editable div
    //   disabled={false} // use true to disable editing
    //   onChange={handleChange} // handle innerHTML change
    //   tagName="div" // Use a custom HTML tag (uses a div by default)
    //   onKeyDown={handleKeyDown}
    //   className="bud-header"
    // />
  );
}

export default Kanban;
