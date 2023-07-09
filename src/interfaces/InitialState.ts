import CurrentSelectedItem from './CurrentSelectedItem';
import WorkSpaceItem from './WorkSpaceItem';
import WorkspaceFolder from './WorkspaceFolder';
import WorkSpaceDoc from './WorkSpaceDoc';

interface InitialState {
  props: any; // Replace 'any' with the appropriate type for props
  color: string;
  currentWorkspace: null | string;
  currentSelectedDocId: null | string;
  currentSelectedItem: CurrentSelectedItem;
  workSpaceItems: WorkSpaceItem[];
  workspaceFolders: WorkspaceFolder[];
  workSpaceDocs: WorkSpaceDoc[];
  applicationData: {}; // Replace 'any' with the appropriate type for applicationData
  editorInitialised: boolean;
  editorApplicationsAdded: string[];
  workspaceDocsSearchKey: null | string;
}

export default InitialState;
