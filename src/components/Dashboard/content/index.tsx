/* eslint-disable no-unused-vars */ // Should Remove this line when start to use this file
import { Layout } from 'antd';
import BudEditor from 'Libraries/LexicalEditor/BudEditor';
import classes from '../dashboard.module.css';


import {
  changeColor,
  setCurrentSelectedDocument,
} from 'redux/slices/workspace';
import TableviewNew from 'components/TableviewNew/TableviewNew';
import {
  setNodeIDs,
  setCurrentSelectedUI,
  setNavigationPath,
} from 'redux/slices/activestate';
import TaskView from 'components/TaskView/TaskView';

export default function ContentView({
  setCollapsed,
  isCollapsed,
  workspaceName,
  workspaceModal,
  setWorkspaceModal,
  children,
  workSpaceIndex,
}: any) {
  return (
    <Layout className={classes['site-layout']}>
      {children}
      <Content className={classes['site-layout-content']} ref={contentRef}>
        <Launcher />
        {workspaceModal && (
          <WorkspaceModal
            idx={workSpaceIndex}
            name={workspaceName}
            setWorkspaceModal={setWorkspaceModal}
            workspaceModal={workspaceModal}
          />
        )}
        {activestate.isMoveto && <MoveToComponent />}
        {selectedDoc && currentSelectedUI === '' && <EditorJsWrapper />}
        {currentSelectedUI?.includes('listview') && (
          <ListView
            contentRef={contentRef}
            workspaceObj={workspace}
            uiDetails={currentSelectedUI}
          />
        )}
        {currentSelectedUI?.includes('kanban') && (
          <KanbanUI workspaceObj={workspace} uiDetails={currentSelectedUI} />
        )}
        {currentSelectedUI?.includes('tableview') && (
          <TableviewNew
            workspaceObj={workspace}
            uiDetails={currentSelectedUI}
          />
        )}
        <Hamburger />
      </Content>
      <OmniSearch />
    </Layout>
  );
}
