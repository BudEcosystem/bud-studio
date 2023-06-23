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
import { useSelector } from 'react-redux';

import HeaderComp from 'components/Dashboard/header';
import Launcher from 'components/Launcher/Launcher';
import OmniSearch from 'components/OmniSearch/OmniSearch';
import WorkspaceModal from 'components/WorkspaceModal/WorkspaceModal';
import BudEditor from 'Libraries/LexicalEditor/BudEditor';
import classes from './workspace.module.css';

interface WorkspaceProps {
  isCollapsed: boolean;
  // eslint-disable-next-line no-unused-vars
  setMenuCollapsed: (isCollapsed: any) => void;
}

// Workspace component
// All the  workspace logic should be handled here

export default function Workspace({
  isCollapsed,
  setMenuCollapsed,
}: WorkspaceProps): JSX.Element {
  // Local States

  // Get the workspace state from redux
  const { workspace }: any = useSelector((state) => state);
  // Flyout Menu
  const [showFloutMenu, setShowFloutMenu] = useState(true);
  const [currentDocument, setCurrentDocument] = useState(null);

  // Utils
  const getDocumentByID = (id) => {
    const doc = workspace.workSpaceDocs.filter((item) => item.uuid === id);
    return doc[0];
  };

  // Use Effect
  useEffect(() => {
    console.log('workspace', workspace);

    if (workspace.currentSelectedDocId) {
      // console.log('Active Document', workspace.workSpaceDocs[0]);
      // console.log('Active Data ID', workspace.workSpaceDocs[0].uuid);
      // console.log(
      //   'Active Data',
      //   workspace.applicationData[workspace.workSpaceDocs[0].uuid]
      // );

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
      {showFloutMenu && (
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
        {currentDocument && <WorkspaceEditor data={currentDocument} />}
      </Layout.Content>
    </Layout>
  );
}

// Workspace Editor Component
function WorkspaceEditor({ data }): JSX.Element {
  useEffect(() => {
    console.log('Data Updated', data);
  }, [data]);

  return (
    <div>
      <BudEditor data={data} />
    </div>
  );
}
