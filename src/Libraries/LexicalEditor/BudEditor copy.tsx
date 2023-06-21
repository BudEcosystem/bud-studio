// /* eslint-disable no-use-before-define */
// import { $getRoot, $getSelection } from 'lexical';
// import { CodeNode } from '@lexical/code';
// import { AutoLinkNode, LinkNode } from '@lexical/link';
// import { ListItemNode, ListNode } from '@lexical/list';
// import { TRANSFORMERS } from '@lexical/markdown';
// import { HeadingNode, QuoteNode } from '@lexical/rich-text';
// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
// import { ListPlugin } from '@lexical/react/LexicalListPlugin';
// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
// import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

// import { useState } from 'react';
// import { isValidUrl } from './utils/url';
// // import { ActionsPlugin } from "./plugins/Actions";
// import { AutoLinkPlugin } from './plugins/AutoLink';
// // import { EditLinkPlugin } from "./plugins/EditLink";
// import { FloatingMenuPlugin } from './plugins/FloatingMenu';
// import { LocalStoragePlugin } from './plugins/LocalStorage';
// // import { OpenLinkPlugin } from "./plugins/OpenLink";

// import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';

// import {
//   EditorHistoryStateContext,
//   useEditorHistoryState,
// } from './context/EditorHistoryState';

// export const EDITOR_NAMESPACE = 'lexical-editor';

// const EDITOR_NODES = [
//   AutoLinkNode,
//   CodeNode,
//   HeadingNode,
//   LinkNode,
//   ListNode,
//   ListItemNode,
//   QuoteNode,
// ];

// type EditorProps = {
//   className?: string;
// };

// // export function BudEditorOld() {
// //   const theme = {
// //     // Theme styling goes here
// //     // ...
// //   };

// //   // function onChange(editorState) {
// //   //   editorState.read(() => {
// //   //     // Read the contents of the EditorState here.
// //   //     const root = $getRoot();
// //   //     const selection = $getSelection();

// //   //     console.log(root, selection);
// //   //   });
// //   // }

// //   function onError(error) {
// //     console.error(error);
// //   }

// //   const initialConfig = {
// //     namespace: 'MyEditor',
// //     theme,
// //     onError,
// //   };

// //   return (
// //     <div className="editor-container">
// //       <LexicalComposer initialConfig={initialConfig}>
// //         <RichTextPlugin
// //           contentEditable={<ContentEditable />}
// //           placeholder={<div>Enter some text...</div>}
// //           ErrorBoundary={LexicalErrorBoundary}
// //         />
// //       </LexicalComposer>
// //       {/* <OnChangePlugin onChange={onChange} /> */}
// //     </div>
// //   );
// // }

// export default function BudEditor(props: EditorProps) {
//   const content = localStorage.getItem(EDITOR_NAMESPACE);

//   return (
//     <div className="editor-wrapper">
//       <EditorHistoryStateContext>
//         <LexicalEditor
//           config={{
//             namespace: EDITOR_NAMESPACE,
//             nodes: EDITOR_NODES,
//             editorState: content,
//             theme: {
//               link: 'cursor-pointer',
//               text: {
//                 bold: 'font-semibold',
//                 underline: 'underline decoration-wavy',
//                 italic: 'italic',
//                 strikethrough: 'line-through',
//                 underlineStrikethrough: 'underlined-line-through',
//               },
//             },
//             onError: (error) => {
//               console.log(error);
//             },
//           }}
//         />
//       </EditorHistoryStateContext>
//     </div>
//   );
// }

// type LexicalEditorProps = {
//   config: Parameters<typeof LexicalComposer>['0']['initialConfig'];
// };

// export function LexicalEditor(props: LexicalEditorProps) {
//   const { historyState } = useEditorHistoryState();
//   const [floatingAnchorElem, setFloatingAnchorElem] =
//     useState<HTMLDivElement | null>(null);

//   const onRef = (_floatingAnchorElem: HTMLDivElement) => {
//     if (_floatingAnchorElem !== null) {
//       setFloatingAnchorElem(_floatingAnchorElem);
//     }
//   };

//   return (
//     <LexicalComposer initialConfig={props.config}>
//       {/* Official Plugins */}
//       <RichTextPlugin
//         contentEditable={<ContentEditable spellCheck={false} />}
//         placeholder={<Placeholder />}
//         ErrorBoundary={LexicalErrorBoundary}
//       />
//       <HistoryPlugin externalHistoryState={historyState} />
//       <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
//       <ListPlugin />
//       <LinkPlugin validateUrl={isValidUrl} />
//       {/* Custom Plugins */}
//       {/* <ActionsPlugin /> */}
//       <AutoLinkPlugin />
//       {/* <EditLinkPlugin /> */}
//       {/* <FloatingMenuPlugin /> */}
//       <LocalStoragePlugin namespace={EDITOR_NAMESPACE} />
//       <DraggableBlockPlugin />
//       {/* <OpenLinkPlugin /> */}
//     </LexicalComposer>
//   );
// }

// function Placeholder() {
//   return <div>Start writing...</div>;
// }
