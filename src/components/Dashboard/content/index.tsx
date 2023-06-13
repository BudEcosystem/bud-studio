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
import TableView from 'components/TableView';

import BudEditor from '../../BudEditor';
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
  const [selecteOption, setSelectedOption] = useState('Editor');
  const { workspace, activestate }: any = useSelector((state) => state);
  const [currentSelectedUI, setCurrentSelectedUI] = useState('');
  const [workspaceItems, setWorkspaceItems] = useState(
    workspace.workSpaceItems
  );

  const newNode = {
    title: 'Welcome To Bud',
    key: '8fbac4d2-7bd0-482f-9880-c645bddd6eac5',
    isLeaf: true,
    color: '#343434',
    workspaceDetails: {
      name: 'Private',
      color: '#343434',
      id: 'wsp-1',
      uuid: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
      childs: [],
    },
    children: [],
  };

  const findParent = (x: any) => {
    const find = workspace.workspaceFolders.find(
      (y: any) => y?.uuid === x?.parent
    );
    return find;
  };

  const solveRec = (x: any) => {
    if (x?.childOf != null) {
      const temp = workspace.workspaceFolders.find(
        (y: any) => y?.uuid === x?.childOf
      );
      console.log('asdfasfsad', temp);
      dispatch(setNavigationPath(temp));
      solveRec(temp);
    }
  };

  const navPathHandler = (n: any) => {
    const par = findParent(n);
    dispatch(setNavigationPath(null));
    dispatch(setNavigationPath({ name: n.title }));
    if (par) {
      dispatch(setNavigationPath(par));
      solveRec(par);
    }
    dispatch(setNavigationPath({ name: 'Private' }));
  };

  useEffect(() => {
    if (workspaceItems.length == 1) {
      dispatch(setCurrentSelectedDocument({ id: null }));
      navPathHandler(newNode);
      setTimeout(() => {
        dispatch(
          setCurrentSelectedDocument({
            uuid: '8fbac4d2-7bd0-482f-9880-c645bddd6eac5',
            workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
          })
        );
        dispatch(
          setNodeIDs({
            uuid: '8fbac4d2-7bd0-482f-9880-c645bddd6eac5',
            workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
          })
        );
        dispatch(changeColor({ color: '#343434' }));
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const { currentSelectedDocId } = workspace;
    setSelectedDoc(currentSelectedDocId);
  }, [workspace]);
  useEffect(() => {
    const { currentSelectedUI: csUI, nodeIDs } = activestate;
    console.log('csi', csUI);
    setCurrentSelectedUI(csUI);
    dispatch(setCurrentSelectedDocument(nodeIDs));
  }, [dispatch, activestate]);
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
            // setCurrentSelectedUI={setCurrentSelectedUI}
            // selectedOption={selectedOption}
            // setSelectedOption={setSelectedOption}
          />
        )}
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
        {currentSelectedUI?.includes('table') && (
          <TableView workspaceObj={workspace} uiDetails={currentSelectedUI} />
        )}

        <Hamburger />
      </Content>
      <OmniSearch />
    </Layout>
  );
}
export default ContentView;
