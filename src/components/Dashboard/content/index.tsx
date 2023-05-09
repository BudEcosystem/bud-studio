/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Layout } from 'antd';
import HeaderComp from '../header';
import classes from '../dashboard.module.css';
import Launcher from '../../Launcher/Launcher';
import OmniSearch from '../../OmniSearch/OmniSearch';
import WorkspaceModal from '../../WorkspaceModal/WorkspaceModal';
import Editor from '../../Editor/Editor';
import Hamburger from 'components/Hamburger/Hamburger';

function ContentView({
  setCollapsed,
  isCollapsed,
  workspaceName,
  workspaceModal,
  setWorkspaceModal,
  children,
}: any) {
  const { Content } = Layout;
  return (
    <Layout className={classes['site-layout']}>
      <HeaderComp
        slideFn={() => setCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
      />
      {children}
      <Content className={classes['site-layout-content']}>
        <Launcher />
        {workspaceModal && (
          <WorkspaceModal
            name={workspaceName}
            setWorkspaceModal={setWorkspaceModal}
            workspaceModal={workspaceModal}
          />
        )}
        <Editor />
        <Hamburger />
      </Content>
      <OmniSearch />
    </Layout>
  );
}
export default ContentView;
