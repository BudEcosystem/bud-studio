import { $getRoot, $getSelection } from 'lexical';
import { useEffect, useState, useRef } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HashtagNode } from '@lexical/hashtag';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';

import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';

// Table
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

// Table Cell
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import InlineImagePlugin from './plugins/InlineImagePlugin';

import './styles.css';

// Custom Plugins
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import TextFormatFloatingToolbar from './plugins/FloatingTextFormatToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import EditorHeader from 'components/EditorHeader';
import { imageGeneration, jsonResult } from 'api';
import iconImage from '../../components/EditorHeader/images/iconImage.png';
import { ImageNode } from './nodes/ImageNode';

const theme = {
  hashtag: 'editor-text-hashtag',
  list: {
    listitem: 'PlaygroundEditorTheme__listItem',
    listitemChecked: 'PlaygroundEditorTheme__listItemChecked',
    listitemUnchecked: 'PlaygroundEditorTheme__listItemUnchecked',
    nested: {
      listitem: 'PlaygroundEditorTheme__nestedListItem',
    },
    olDepth: [
      'PlaygroundEditorTheme__ol1',
      'PlaygroundEditorTheme__ol2',
      'PlaygroundEditorTheme__ol3',
      'PlaygroundEditorTheme__ol4',
      'PlaygroundEditorTheme__ol5',
    ],
    ul: 'PlaygroundEditorTheme__ul',
  },
};

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
}

export default function BudEditor({ data, persistEditorRoot }): JSX.Element {
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
      HashtagNode,
      ImageNode,
    ],
  };

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const [coverImgAPI, setCoverImageAPI] = useState('');

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    const apiData = await imageGeneration();
    console.log('API DATA', apiData);
    if (!apiData) {
      const imageSource = `data:image/jpeg;base64,${jsonResult.output[0]}`;
      setCoverImageAPI(imageSource);
    } else {
      const imageSource = `data:image/jpeg;base64,${apiData.output[0]}`;
      setCoverImageAPI(imageSource);
    }
  };

  function onChange(editorState) {
    // editorStateRef.current = editorState;
    editorState.read(() => {
      // const root = $getRoot();
      // console.log('Updated Content', JSON.stringify(editorState));
      persistEditorRoot(editorState);

      //   // Read the contents of the EditorState here.
      //   // const root = $getRoot();
      //   // const selection = $getSelection();
      //   // console.log(root, selection);
      //   // console.log('State', JSON.stringify(editorState.toJSON()));
    });
  }

  const contentEditableRef = useRef(null);

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor-innter" ref={onRef}>
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
          <HashtagPlugin />
          <HistoryPlugin />
          {/* <MyCustomAutoFocusPlugin /> */}
          {floatingAnchorElem && (
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          )}
          <ComponentPickerPlugin />

          <ListPlugin />
          <LinkPlugin />
          <MyLexicalPlugin data={data} />
          <CheckListPlugin />
          <InlineImagePlugin />

          <TextFormatFloatingToolbar />

          {/* <TreeViewPlugin /> */}
        </div>
      </LexicalComposer>
    </div>
  );
}
