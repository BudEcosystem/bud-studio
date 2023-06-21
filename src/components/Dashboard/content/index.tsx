/* eslint-disable no-unused-vars */ // Should Remove this line when start to use this file
import { Layout } from 'antd';
import BudEditor from 'Libraries/LexicalEditor/BudEditor';
import classes from '../dashboard.module.css';


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

      <div>
        <BudEditor />
      </div>
    </Layout>
  );
}
