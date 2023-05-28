/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import ContentEditable from 'react-contenteditable';
import { useEffect } from 'react';

// import Header from './Blocks/H1';

function Header({ data, handleChange, handleKeyDown }) {
  // useEffect(() => {
  //   console.log(data);
  // }, []);

  return (
    <ContentEditable
      html={`<h${data.data.level}>${data.data.text}</h${data.data.level}>`} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={handleChange} // handle innerHTML change
      tagName="div" // Use a custom HTML tag (uses a div by default)
      onKeyDown={handleKeyDown}
      className="bud-header"
    />
  );
}

export default Header;
