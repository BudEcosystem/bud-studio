/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/*
 * Created on Thu Jun 22 2023
 *
 * Copyright (c) 2023 Bud Ecosystems Inc.
 */
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import HeaderComp from 'components/Dashboard/header';
import Launcher from 'components/Launcher/Launcher';
import OmniSearch from 'components/OmniSearch/OmniSearch';
import WorkspaceModal from 'components/WorkspaceModal/WorkspaceModal';
import BudEditor from 'Libraries/LexicalEditor/BudEditor';
import Hamburger from 'components/Hamburger/Hamburger';
import EditorHeader from 'components/EditorHeader';
import { updateDocumentData } from 'redux/slices/workspace';
import { imageGeneration, jsonResult } from 'api';

import iconImage from 'components/EditorHeader/images/iconImage.png';
import Database from 'components/Database';
import classes from './workspace.module.css';
import KanbanUI from '@/components/KanbanNew';

interface WorkspaceProps {
  isCollapsed: boolean;
  // eslint-disable-next-line no-unused-vars
  setMenuCollapsed: (isCollapsed: any) => void;
}

// Workspace component
export default function Workspace({
  isCollapsed,
  setMenuCollapsed,
}: WorkspaceProps): JSX.Element {
  // Local States

  // Get the workspace state from redux
  const { workspace }: any = useSelector((state) => state);
  // Flyout Menu
  const [showFlyoutMenu, setShowFlyoutMenu] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [currentDocumentID, setCurrentDocumentID] = useState(null);

  // Utils
  const getDocumentByID = (id: string) => {
    const doc = workspace.workSpaceDocs.filter((item) => item.uuid === id);
    return doc[0];
  };

  // Use Effect
  useEffect(() => {
    console.log('workspace', workspace.currentSelectedDocId);
    console.log('Workspace Local', currentDocumentID);

    if (workspace.currentSelectedDocId === currentDocumentID) {
      return;
    }

    if (workspace.currentSelectedDocId) {
      setCurrentDocumentID(workspace.currentSelectedDocId);

      const docId = getDocumentByID(workspace.currentSelectedDocId);
      const document = workspace.applicationData[docId.uuid];
      setCurrentDocument(document);

      // console.log('Filterd Document', document);
    }
  }, [workspace]);

  return (
    <Layout className={classes['site-layout']}>
      {/* Common Global Components */}
      <OmniSearch />
      <Launcher />

      {/* Workspace Nvigation */}
      {showFlyoutMenu && (
        <WorkspaceModal
          idx={0}
          workspaceModal
          setWorkspaceModal={() => console.log('ok')}
        />
      )}

      {/* Header Component */}
      <HeaderComp
        isCollapsed={isCollapsed}
        slideFn={() => setMenuCollapsed(!isCollapsed)}
      />

      {/* Content Area */}
      <Layout.Content className={classes['site-layout-content']}>
        {currentDocument && (
          <WorkspaceEditor
            data={currentDocument}
            setCurrentDocument={setCurrentDocument}
            currentDocumentUUID={currentDocumentID}
          />
        )}
      </Layout.Content>
    </Layout>
  );
}

// Workspace Editor Component
function WorkspaceEditor({
  data,
  setCurrentDocument,
  currentDocumentUUID,
}): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [coverImgAPI, setCoverImageAPI] = useState('');
  const [currentDatabase, setDatabase] = useState(null);

  // Database Slice
  const { database }: any = useSelector((state) => state);

  useEffect(() => {
    fetchApiData();
  }, []);

  // Once the current page is changed, fetch the API data
  useEffect(() => {
    if (data[currentPage].type === 'Database') {
      // Load Database Content
      const db = database.databases.filter(
        (item: { id: string }) => item.id === data[currentPage].databaseID
      );
      setDatabase(db[0]);
    }
  }, [currentPage]);

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

  const persistEditorRoot = (editorState: any) => {
    console.log('persistEditorRoot', editorState);
    console.log('Current Document Raw', data);

    // const tempDoc = data;

    // setCurrentDocument

    dispatch(
      updateDocumentData({
        editorState,
        currentPage,
        currentDocumentUUID,
      })
    );

    // Persist the editor state to redux
  };

  return (
    <div>
      {data && (
        <>
          <section>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage || 'empty'}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {data[currentPage] && data[currentPage].type === undefined ? (
                  <>
                    {/* <EditorHeader coverImg={coverImgAPI} iconImg={iconImage} />
                    <BudEditor
                      data={data[currentPage]}
                      persistEditorRoot={persistEditorRoot}
                    /> */}
                    <KanbanUI/>
                  </>
                ) : (
                  <Database databaseData={currentDatabase} />
                )}
              </motion.div>
            </AnimatePresence>
          </section>
          <Hamburger
            documentData={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
