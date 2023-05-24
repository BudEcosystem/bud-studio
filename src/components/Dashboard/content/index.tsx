import { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import Hamburger from 'components/Hamburger/Hamburger';
import ListView from 'components/ListView/ListView';
import { useDispatch,useSelector } from 'react-redux';
import { setContentRef } from 'redux/slices/content';
import HeaderComp from '../header';
import classes from '../dashboard.module.css';
import Launcher from '../../Launcher/Launcher';
import OmniSearch from '../../OmniSearch/OmniSearch';
import WorkspaceModal from '../../WorkspaceModal/WorkspaceModal';
import Editor from '../../Editor/Editor';
import EditorJsWrapper from '../../EditorWrapper';
import KanbanUI from 'components/KanbanNew';

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
  const [selectedDoc,setSelectedDoc] = useState()
  const [currentSelectedUI,setCurrentSelectedUI] = useState('')
  const {workspace} = useSelector(state=>state)
  useEffect(()=>{
    console.log("workspace ------------------------",workspace)
    let {currentWorkspace,currentSelectedDocId} = workspace
    setSelectedDoc(currentSelectedDocId)
  },[workspace])
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
        {(selectedDoc && currentSelectedUI === '')&&<EditorJsWrapper data={{}} setCurrentSelectedUI={setCurrentSelectedUI} />}
        {currentSelectedUI === 'listview' && <ListView />}
        {currentSelectedUI === 'kanban' && <KanbanUI />}
        {/* <KanbanUI /> */}
        <Hamburger />
      </Content>
      <OmniSearch />
    </Layout>
  );
}
export default ContentView;
