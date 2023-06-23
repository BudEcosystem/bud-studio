import { $getRoot, $getSelection } from 'lexical';
import { useEffect, useState, useRef } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import bgImage from '../../components/EditorHeader/images/bgImage.png';
import iconImage from '../../components/EditorHeader/images/iconImage.png';

import './styles.css';

// Custom Plugins
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import TextFormatFloatingToolbar from './plugins/FloatingTextFormatToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import EditorHeader from 'components/EditorHeader';

const theme = {};

function onError(error) {
  console.error(error);
}

// Effect
const emptyEditor =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
export function MyLexicalPlugin({ data = null }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // defines whether the editor is on edit or read mode
    if (data === null) return;

    const initialEditorState = editor.parseEditorState(
      data === '' ? emptyEditor : data
    );
    editor.setEditorState(initialEditorState);
  }, [editor, data]);

  // editor.setEditorState(data);

  // console.log('Editor', editor.isEditable());

  // editor.update((root) => {
  //   console.log('Root', root);
  // });

  // useEffect(() => {
  //   //editor.setEditorState(data);

  //   const root = $getRoot();

  //   console.log('Empty State', root.isEmpty());
  // },[editor]);
}

export default function BudEditor({ data }): JSX.Element {
  const initialConfig = {
    namespace: 'bud-editor',
    theme,
    onError,
    editorState: JSON.stringify(data),
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  // useEffect(() => {

  // });

  function onChange(editorState) {
    // editorStateRef.current = editorState;
    // editorState.read(() => {
    //   // Read the contents of the EditorState here.
    //   // const root = $getRoot();
    //   // const selection = $getSelection();
    //   // console.log(root, selection);
    //   // console.log('State', JSON.stringify(editorState.toJSON()));
    // });
  }

  return (
    <div>
      <EditorHeader coverImg={bgImage} iconImg={iconImage} />
      <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable className="contentEditable" />
              </div>
            </div>
          }
          placeholder={
            <span className="placeholder">
              Press "space" for task , "/" for ask Bud
            </span>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        {/* <MyCustomAutoFocusPlugin /> */}
        {floatingAnchorElem && (
          <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        )}
        <ComponentPickerPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MyLexicalPlugin data={data} />
        <TextFormatFloatingToolbar />
        {/* <TreeViewPlugin /> */}
      </div>
    </LexicalComposer>
    </div> 
  );
}
