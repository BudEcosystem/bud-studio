import { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import Hamburger from 'components/Hamburger/Hamburger';
import ListView from 'components/ListView/ListView';
import { useDispatch, useSelector } from 'react-redux';
import { setContentRef } from 'redux/slices/content';
import KanbanUI from 'components/KanbanNew';
import HeaderComp from '../header';
import classes from '../dashboard.module.css';
import Launcher from '../../Launcher/Launcher';
import OmniSearch from '../../OmniSearch/OmniSearch';
import WorkspaceModal from '../../WorkspaceModal/WorkspaceModal';
import Editor from '../../Editor/Editor';
import EditorJsWrapper from '../../EditorWrapper';

import BudEditor from '../../BudEditor';

function ContentView({
  setCollapsed,
  isCollapsed,
  workspaceName,
  workspaceModal,
  setWorkspaceModal,
  children,
  workSpaceIndex,
}: any) {
  const { Content } = Layout;
  const dispatch = useDispatch();

  const contentRef = useRef(null);

  useEffect(() => {
    dispatch(setContentRef(`${contentRef.current}`));
  }, [contentRef, dispatch]);
  const [selectedDoc, setSelectedDoc] = useState();
  const [currentSelectedUI, setCurrentSelectedUI] = useState('');
  const [selectedOption, setSelectedOption] = useState('Editor');
  const { workspace } = useSelector((state) => state);
  useEffect(() => {
    const { currentWorkspace, currentSelectedDocId } = workspace;
    setSelectedDoc(currentSelectedDocId);
  }, [workspace]);
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
            idx={workSpaceIndex}
            name={workspaceName}
            setWorkspaceModal={setWorkspaceModal}
            workspaceModal={workspaceModal}
          />
        )}
        {/* <Editor /> */}
        {selectedDoc && currentSelectedUI === '' && (
          // <BudEditor />
          <EditorJsWrapper
            data={{}}
            setCurrentSelectedUI={setCurrentSelectedUI}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
        {currentSelectedUI === 'listview' && (
          <ListView contentRef={contentRef} workspaceObj={workspace} />
        )}
        {currentSelectedUI === 'kanban' && (
          <KanbanUI workspaceObj={workspace} />
        )}
        <Hamburger
          setCurrentSelectedUI={setCurrentSelectedUI}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </Content>
      <OmniSearch />
    </Layout>
  );
}
export default ContentView;
