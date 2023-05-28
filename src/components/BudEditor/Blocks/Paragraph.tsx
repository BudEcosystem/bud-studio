/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import ContentEditable from 'react-contenteditable';
import { useEffect } from 'react';

// import Header from './Blocks/H1';

function Paragraph({ data, handleChange, handleKeyDown }) {
  return (
    <ContentEditable
      html={`${data.data.text}`} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={handleChange} // handle innerHTML change
      tagName="div" // Use a custom HTML tag (uses a div by default)
      onKeyDown={handleKeyDown}
      className="bud-paragragh"
    />
  );
}

export default Paragraph;
