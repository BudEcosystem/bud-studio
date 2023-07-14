/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $createCodeNode } from '@lexical/code';
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  TextNode,
} from 'lexical';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import catTypingGif from '../../images/cat-typing.gif';
import useModal from '../../hooks/useModal';

import ActionMenu from '../../../../components/ActionMenu';
import { InsertImageDialog } from '../ImagesPlugin';
import TextInput from '../../ui/TextInput';
import { DialogActions } from '../../ui/Dialog';
import Button from '../../ui/Button';

import { createNewEmptyDatabase } from '../../../../redux/slices/database';

// import { EmbedConfigs } from '../AutoEmbedPlugin';
// import { INSERT_COLLAPSIBLE_COMMAND } from '../CollapsiblePlugin';
// import { InsertEquationDialog } from '../EquationsPlugin';
// import { INSERT_EXCALIDRAW_COMMAND } from '../ExcalidrawPlugin';
// import { INSERT_IMAGE_COMMAND, InsertImageDialog } from '../ImagesPlugin';
// import { InsertPollDialog } from '../PollPlugin';
// import { InsertNewTableDialog, InsertTableDialog } from '../TablePlugin';

class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string;

  // Icon for display
  icon?: JSX.Element;

  // For extra searching.
  keywords: Array<string>;

  // TBD
  keyboardShortcut?: string;

  // Description
  description?: string;

  // What happens when you select this option?
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon?: JSX.Element;
      keywords?: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
      description?: string;
    }
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
    this.description = options.description;
  }
}

function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: ComponentPickerOption;
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={`typeahead-item-${index}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* {option.icon}
      <span className="text">{option.title}</span>
      <span>Embed a subpage inside this.</span> */}
      <div className="bud-action-menu">
        <div className="bud-action-menu-icon">Icon</div>
        <div className="bud-action-menu-item">
          <div className="bud-action-menu-item-title">{option.title}</div>
          <div className="bud-action-menu-item-description">
            {option.description
              ? option.description
              : 'No Description Available.'}
          </div>
        </div>
      </div>
    </li>
  );
}

function CustomComponent({ selectedIndex }) {
  useEffect(() => {
    console.log('Selected Index', selectedIndex);
  }, [selectedIndex]);

  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }

  return (
    <div>
      <div className="">ok</div>
    </div>
  );
}

export default function ComponentPickerMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useModal();
  const [queryString, setQueryString] = useState<string | null>(null);

  // redux integration
  const dispatch = useDispatch();
  const { workspace }: any = useSelector((state) => state);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const getDynamicOptions = useCallback(() => {
    const options: Array<ComponentPickerOption> = [];

    if (queryString == null) {
      return options;
    }

    const fullTableRegex = new RegExp(/^([1-9]|10)x([1-9]|10)$/);
    const partialTableRegex = new RegExp(/^([1-9]|10)x?$/);

    const fullTableMatch = fullTableRegex.exec(queryString);
    const partialTableMatch = partialTableRegex.exec(queryString);

    if (fullTableMatch) {
      const [rows, columns] = fullTableMatch[0]
        .split('x')
        .map((n: string) => parseInt(n, 10));

      options.push(
        new ComponentPickerOption(`${rows}x${columns} Table`, {
          icon: <i className="icon table" />,
          keywords: ['table'],
          onSelect: () =>
            // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
            editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
        })
      );
    } else if (partialTableMatch) {
      const rows = parseInt(partialTableMatch[0], 10);

      options.push(
        ...Array.from({ length: 5 }, (_, i) => i + 1).map(
          (columns) =>
            new ComponentPickerOption(`${rows}x${columns} Table`, {
              icon: <i className="icon table" />,
              keywords: ['table'],
              onSelect: () =>
                // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
                editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
            })
        )
      );
    }

    return options;
  }, [editor, queryString]);

  const [rows, setRows] = useState('5');
  const [columns, setColumns] = useState('5');
  const [showTableModal, setShowTableModal] = useState(false);

  const options = useMemo(() => {
    const baseOptions = [
      new ComponentPickerOption('Page', {
        icon: <i className="icon paragraph" />,
        keywords: ['page', 'p'],
        description: 'Embed a subpage inside this..',
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode());
            }
          }),
      }),
      new ComponentPickerOption('List - Database', {
        icon: <i className="icon paragraph" />,
        keywords: ['list', 'database'],
        description: 'Database list view.',
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode());
            }
          }),
      }),
      new ComponentPickerOption('Table - Database', {
        icon: <i className="icon paragraph" />,
        keywords: ['list', 'table'],
        description: 'Database table view.',
        onSelect: () => {
          console.log('Add New Database To Document');

          const initialDocumentID = uuidv4();
          const databaseID = uuidv4();

          // Prepare Database Template
          const newDatabase = {
            type: 'Database',
            id: databaseID,
            title: 'Untitled',
            description: 'Description goes here',
            defaultView: 'Table',
            created_at: new Date().toISOString(),
            updated_at: '',
            propertyPresets: {
              priority: {
                name: 'Priority',
                type: 'select',
                options: [
                  { title: 'High', color: '#fff' },
                  { title: 'Low', color: '#fff' },
                  { title: 'Medium', color: '#fff' },
                  { title: 'Normal', color: '#fff' },
                ],
              },
              status: {
                name: 'Status',
                type: 'select',
                options: [
                  { title: 'Not Started', color: 'red', key: 'not_started' },
                  { title: 'In Progress', color: 'yellow', key: 'in_progress' },
                  { title: 'Done', color: 'green', key: 'done' },
                ],
              },
              tags: {
                name: 'tags',
                type: 'tags',
                options: [
                  {
                    tag: 'Bug',
                    color: '#ff4d4d35',
                  },
                  {
                    tag: 'Feature',
                    color: '#35f8ff35',
                  },
                  {
                    tag: 'Enhancement',
                    color: '#48ff5735',
                  },
                  {
                    tag: 'First Issue',
                    color: '#436fff35',
                  },
                  {
                    tag: 'PR',
                    color: '#e0ff3235',
                  },
                  {
                    tag: 'Assigned',
                    color: '#ff1eec35',
                  },
                ],
              },
            },
            entries: [
              {
                documentID: initialDocumentID,
              },
            ],
          };

          // Prepare Document Template
          const newDatabaseDocument = {
            name: 'Untitled',
            childOf: null,
            workSPaceId: 'Private',
            type: 'doc',
            uuid: initialDocumentID,
            workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
            customProperties: [], // User defined Properties
            properties: [
              {
                title: 'Tags',
                value: ['no-tag'],
                type: 'tags',
                id: uuidv4(),
                order: 1,
              },
              {
                title: 'Priority',
                value: 'Normal',
                type: 'priority',
                id: uuidv4(),
                order: 2,
              },
              {
                title: 'Status',
                value: 'not_started',
                type: 'status',
                id: uuidv4(),
                order: 3,
              },
              {
                title: 'Date',
                value: null,
                type: 'date',
                id: uuidv4(),
                order: 4,
              },
            ],
            checkList: [

            ],
          };

          // Initial Document Template
          const initialDocument = [
            {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Untitled',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h1',
                  },
                  {
                    children: [],
                    direction: null,
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '#Bud',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'root',
                version: 1,
              },
            },
          ];

          // Prepare Document

          dispatch(
            createNewEmptyDatabase({
              workspaceInfo: workspace,
              databaseinfo: newDatabase,
              databaseDocumentInfo: newDatabaseDocument,
              initialDocument,
              initialDocumentID,
              databaseID,
            })
          );

          // Add New Database
        },
        // editor.update(() => {
        //   const selection = $getSelection();
        //   if ($isRangeSelection(selection)) {
        //     $setBlocksType(selection, () => $createParagraphNode());
        //   }
        // }),
      }),
      new ComponentPickerOption('Kanban - Database', {
        icon: <i className="icon paragraph" />,
        keywords: ['list', 'kanban'],
        description: 'Database kanban view.',
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode());
            }
          }),
      }),
      new ComponentPickerOption('Paragraph', {
        icon: <i className="icon paragraph" />,
        keywords: ['normal', 'paragraph', 'p', 'text'],
        description: 'Write your words in paragraph.',
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode());
            }
          }),
      }),
      ...Array.from({ length: 3 }, (_, i) => i + 1).map(
        (n) =>
          new ComponentPickerOption(`Heading ${n}`, {
            icon: <i className={`icon h${n}`} />,
            keywords: ['heading', 'header', `h${n}`],
            description: `Level ${n} heading.`,
            onSelect: () =>
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  $setBlocksType(selection, () =>
                    // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
                    $createHeadingNode(`h${n}`)
                  );
                }
              }),
          })
      ),
      // new ComponentPickerOption('Table', {
      //   icon: <i className="icon table" />,
      //   keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
      //   onSelect: () =>
      //     showModal('Insert Table', (onClose) => (
      //       <InsertTableDialog activeEditor={editor} onClose={onClose} />
      //     )),
      // }),
      // new ComponentPickerOption('Table (Experimental)', {
      //   icon: <i className="icon table" />,
      //   keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
      //   onSelect: () =>
      //     showModal('Insert Table', (onClose) => (
      //       <InsertNewTableDialog activeEditor={editor} onClose={onClose} />
      //     )),
      // }),
      new ComponentPickerOption('Numbered List', {
        icon: <i className="icon number" />,
        keywords: ['numbered list', 'ordered list', 'ol'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption('Bulleted List', {
        icon: <i className="icon bullet" />,
        keywords: ['bulleted list', 'unordered list', 'ul'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption('Check List', {
        icon: <i className="icon check" />,
        keywords: ['check list', 'todo list'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption('Quote', {
        icon: <i className="icon quote" />,
        keywords: ['block quote'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createQuoteNode());
            }
          }),
      }),
      new ComponentPickerOption('Code', {
        icon: <i className="icon code" />,
        keywords: ['javascript', 'python', 'js', 'codeblock'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
              if (selection.isCollapsed()) {
                $setBlocksType(selection, () => $createCodeNode());
              } else {
                // Will this ever happen?
                const textContent = selection.getTextContent();
                const codeNode = $createCodeNode();
                selection.insertNodes([codeNode]);
                selection.insertRawText(textContent);
              }
            }
          }),
      }),
      new ComponentPickerOption('Simple Table', {
        icon: <i className="icon code" />,
        keywords: ['table', 'rows', 'columns', 'grid'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
      }),
      new ComponentPickerOption('Divider', {
        icon: <i className="icon horizontal-rule" />,
        keywords: ['horizontal rule', 'divider', 'hr'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
      }),
      // new ComponentPickerOption('Excalidraw', {
      //   icon: <i className="icon diagram-2" />,
      //   keywords: ['excalidraw', 'diagram', 'drawing'],
      //   onSelect: () =>
      //     editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined),
      // }),
      // new ComponentPickerOption('Poll', {
      //   icon: <i className="icon poll" />,
      //   keywords: ['poll', 'vote'],
      //   onSelect: () =>
      //     showModal('Insert Poll', (onClose) => (
      //       <InsertPollDialog activeEditor={editor} onClose={onClose} />
      //     )),
      // }),
      // ...EmbedConfigs.map(
      //   (embedConfig) =>
      //     new ComponentPickerOption(`Embed ${embedConfig.contentName}`, {
      //       icon: embedConfig.icon,
      //       keywords: [...embedConfig.keywords, 'embed'],
      //       onSelect: () =>
      //         editor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type),
      //     })
      // ),
      // new ComponentPickerOption('Equation', {
      //   icon: <i className="icon equation" />,
      //   keywords: ['equation', 'latex', 'math'],
      //   onSelect: () =>
      //     showModal('Insert Equation', (onClose) => (
      //       <InsertEquationDialog activeEditor={editor} onClose={onClose} />
      //     )),
      // }),
      new ComponentPickerOption('GIF', {
        icon: <i className="icon gif" />,
        keywords: ['gif', 'animate', 'image', 'file'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            altText: 'Cat typing on a laptop',
            src: catTypingGif,
          }),
      }),
      new ComponentPickerOption('Image', {
        icon: <i className="icon image" />,
        keywords: ['image', 'photo', 'picture', 'file'],
        onSelect: () =>
          showModal('Insert Image', (onClose) => (
            <InsertImageDialog activeEditor={editor} onClose={onClose} />
          )),
      }),
      // new ComponentPickerOption('Collapsible', {
      //   icon: <i className="icon caret-right" />,
      //   keywords: ['collapse', 'collapsible', 'toggle'],
      //   onSelect: () =>
      //     editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined),
      // }),
      ...['left', 'center', 'right', 'justify'].map(
        (alignment) =>
          new ComponentPickerOption(`Align ${alignment}`, {
            icon: <i className={`icon ${alignment}-align`} />,
            keywords: ['align', 'justify', alignment],
            onSelect: () =>
              // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
          })
      ),
    ];

    const dynamicOptions = getDynamicOptions();

    return queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, 'gi').exec(option.title) ||
              option.keywords != null
              ? option.keywords.some((keyword) =>
                  new RegExp(queryString, 'gi').exec(keyword)
                )
              : false;
          }),
        ]
      : baseOptions;
  }, [editor, getDynamicOptions, queryString, showModal]);

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        if (nodeToRemove) {
          nodeToRemove.remove();
        }
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  function TableModal() {
    return (
      <>
        <TextInput
          placeholder="# of rows (1-500)"
          label="Rows"
          onChange={setRows}
          value={rows}
          data-test-id="table-modal-rows"
          type="number"
        />
        <TextInput
          placeholder="# of columns (1-50)"
          label="Columns"
          onChange={setColumns}
          value={columns}
          data-test-id="table-modal-columns"
          type="number"
        />
        <DialogActions data-test-id="table-model-confirm-insert">
          <Button
            onClick={() => {
              setShowTableModal(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <>
      {modal}
      {showTableModal && <TableModal />}
      {/* <ActionMenu /> */}
      <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
        ) =>
          anchorElementRef.current && options.length
            ? ReactDOM.createPortal(
                <div className="typeahead-popover component-picker-menu bud-action">
                  <div className="bud-action-title">Editor Blocks</div>
                  <ul>
                    {options.map((option, i: number) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i);
                          selectOptionAndCleanUp(option);
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i);
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                  </ul>
                </div>,
                anchorElementRef.current
              )
            : null
        }
      />
    </>
  );
}
