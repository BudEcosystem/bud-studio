/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import ContentEditable from 'react-contenteditable';
import { useEffect } from 'react';
import KanbanUI from '../../KanbanNew';

// import Header from './Blocks/H1';

function Kanban({ data, handleChange, handleKeyDown }) {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <KanbanUI />
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
