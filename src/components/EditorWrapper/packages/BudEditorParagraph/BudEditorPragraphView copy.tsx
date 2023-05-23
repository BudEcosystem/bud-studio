/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';

import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';

function BudEditorPragraphView({
  data,
  config,
  readOnly,
  defaultPlaceholder,
  onKeyUpHandler,
  onDataChange,
}) {
  const wrapperRef = useRef(null);
  const [text, setText] = useState(data.text || '');
  const [preserveBlank, setPreserveBlank] = useState(
    config.preserveBlank !== undefined ? config.preserveBlank : false
  );



  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleKeyPress = (event) => {
    setShowDropdown(false);
    if (event.key === '@') {
      // wait and see if user pressed a non space character
      // Show EditorJs block
      // setIsCaseCaderVisible(true);

      const { target } = event;
      const rect = wrapperRef.current.getBoundingClientRect();
      const { top, left } = getCaretPosition(target);
      setDropdownPosition({ top: top + rect.top, left: left + rect.left });
      setShowDropdown(true);
    }

    const newData = wrapperRef.current.innerHTML;
    onDataChange(newData);
  };

  const getCaretPosition = (element) => {
    const caretRange = window.getSelection().getRangeAt(0);
    const rect = caretRange.getBoundingClientRect();
    const { top, left, height } = rect;
    const caretPosition = {
      top: top + window.pageYOffset,
      left: left + window.pageXOffset,
      height: height,
    };
    return caretPosition;
  };

  useEffect(() => {
    const { current } = wrapperRef;
    current.addEventListener('keypress', handleKeyPress);
    return () => {
      current.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        contentEditable={!readOnly}
        data-placeholder={defaultPlaceholder}
        placeholder="Press “@” for bud , “/”  for editor blocks"
        // dangerouslySetInnerHTML={{ __html: text }}
      ></div>

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
          className=""
        >
          {/* Render your dropdown content */}
qo
        </div>
      )}
    </>
  );
}

export default BudEditorPragraphView;
