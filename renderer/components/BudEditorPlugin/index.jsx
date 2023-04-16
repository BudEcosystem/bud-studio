import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';

import BudEditorPluginIcon from './BudEditorPluginIcon'; // import your icon component here

const BudEditorPlugin = ({ data, onChange }) => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const newEditor = new EditorJS({
      holder: 'my-plugin',
      tools: {
        paragraph: Paragraph,
        budEditorPlugin: {
          class: BudEditorPlugin,
          inlineToolbar: true,
          icon: BudEditorPluginIcon // pass the icon component here
        }
      },
      data: data,
      onChange: (api) => {
        onChange(api.blocks);
      }
    });

    setEditor(newEditor);

    return () => {
      newEditor.destroy();
    };
  }, []);

  return (
    <div id="my-plugin" />
  );
};

export default BudEditorPlugin;
