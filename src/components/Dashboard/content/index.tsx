/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import HeaderComp from '../header';
import classes from '../dashboard.module.css';
import Launcher from '../../Launcher/Launcher';
import OmniSearch from '../../OmniSearch/OmniSearch';
import WorkspaceModal from '../../WorkspaceModal/WorkspaceModal';
import Editor from '../../Editor/Editor';
import Hamburger from 'components/Hamburger/Hamburger';
import ListView from 'components/ListView/ListView';
import { useDispatch } from 'react-redux';
import { setContentRef } from 'redux/slices/content';

function ContentView({
  setCollapsed,
  isCollapsed,
  workspaceName,
  workspaceModal,
  setWorkspaceModal,
  children,
}: any) {
  const { Content } = Layout;
  const dispatch = useDispatch();

  const contentRef = useRef(null);

  useEffect(() => {
    dispatch(setContentRef(contentRef.current));
  }, [contentRef, dispatch]);
  return (
    <Layout className={classes['site-layout']}>
      <HeaderComp
        slideFn={() => setCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
      />
      {children}
      <Content className={classes['site-layout-content']} ref={contentRef}>
        <Launcher />
        {workspaceModal && (
          <WorkspaceModal
            name={workspaceName}
            setWorkspaceModal={setWorkspaceModal}
            workspaceModal={workspaceModal}
          />
        )}
        <Editor />
        {/* <ListView /> */}
        <Hamburger />
      </Content>
      <OmniSearch />
    </Layout>
  );
}
export default ContentView;
