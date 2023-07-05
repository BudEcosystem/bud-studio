import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderSection from 'components/ListView/HeaderSection';
import TableView from './TableView';
import './database.css';
import { v4 as uuidv4 } from 'uuid';
import { addEmptyDoc } from 'redux/slices/workspace';
import KanbanUI from './KanbanNew';
// TODO : Update The Interface With Required Data
interface DatabaseProps {
  databaseData: any;
}

// database related items should be handled here, for each view there
// should be a component that handles the view
// also a data handler as well

export default function Database({ databaseData }: DatabaseProps): JSX.Element {
  // Workspace
  const { workspace } = useSelector((state) => state);
  const [databaseEntries, setDatabaseEntries] = useState<any[]>([]);

  const dispatch = useDispatch();

  /*
   * Database functions
   */

  // When a database is created at least 1 document should be created, assuming it is created
  const prepareDatabaseViewData = () => {
    // Print All the documents

    const documentsList = databaseData.entries;
    // Find The Document List From JSON Data
    const filteredObjects = workspace.workSpaceDocs.filter((obj) => {
      return documentsList.some((item) => item.documentID === obj.uuid);
    });

    // Set The Properties
    filteredObjects.map((item) => {
      console.log(item.uuid, item.properties);
    });

    setDatabaseEntries(filteredObjects);

    // Prepare the data for the view
    // Default View Holds The View Type
    // Default View Can Be Table, List, Kanban, Calendar
  };

  // On Database Load
  useEffect(() => {
    // if the databaseData is received and not null
    if (databaseData) {
      // Get All Documents
      prepareDatabaseViewData();
    }
  }, [databaseData]);

  // Append Empty Document
  const appendEmptyDocument = () => {
    console.log('New Document');

    // Prepare The First Document,
    // Create The Document
    // Append To The Database

    const initialDocumentID = uuidv4();
    // New Documents
    const newDatabaseDocument = {
      name: 'Untitled',
      childOf: null,
      workSPaceId: 'Private',
      type: 'doc',
      uuid: initialDocumentID,
      workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
      customProperties: [], // User defined Properties
      properties: {
        tags: ['no-tag'],
        priority: 'Normal',
        status: 'Not Started',
        date: null,
      },
    };

    // initial document
    const initialDocument = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Untitled',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'heading',
            version: 1,
            tag: 'h1',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'digital mind place',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'heading',
            version: 1,
            tag: 'h1',
          },
          {
            children: [],
            direction: null,
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Philosophy, life, misc',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    };

    // Dispatch Event
    dispatch(
      addEmptyDoc({
        newDatabaseDocument,
        initialDocument,
        initialDocumentID,
        databaseID: databaseData.id,
      })
    );
  };

  return (
    <div className="database">
      <HeaderSection
        view={databaseData.defaultView}
        title={databaseData.title}
        databaseDescription={databaseData.description}
      />
      {databaseData.defaultView === 'Table' && databaseEntries.length && (
        <TableView
          databaseData={databaseData}
          databaseEntries={databaseEntries}
          appendEmptyDocument={appendEmptyDocument}
        />
      )}

      {databaseData.defaultView === 'Kanban' && databaseEntries.length && (
        <KanbanUI/>
      )}

      {databaseData.defaultView === 'List' && databaseEntries.length && (
        <div>List</div>
      )}

    </div>
  );
}
