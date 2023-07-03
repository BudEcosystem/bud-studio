import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderSection from 'components/ListView/HeaderSection';
import TableView from './TableView';
import './database.css';
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

  return (
    <div className="database">
      <HeaderSection view="kanabn" title={databaseData.title} />
      {databaseData.defaultView === 'Table' && databaseEntries.length && (
        <TableView
          databaseData={databaseData}
          databaseEntries={databaseEntries}
        />
      )}
    </div>
  );
}
