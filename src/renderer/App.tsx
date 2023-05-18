/* eslint-disable no-console */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/index.css';
import '../components/Layout.css';
import '../components/Launcher/Launcher.css';
import '../components/OmniSearch/OmniSearch.css';
import '../components/OmniSearch/Panel/Panel.css';
import '../components/OmniSearch/Panel/Button/Button.css';
import '../components/OmniSearch/SearchBar/SearchBar.css';
import '../components/OmniSearch/Panel/PanelOption/PanelOption.css';
import { lazy } from 'react';
// redux
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from '../redux/store';

const AppLayout = lazy(() => import('../components/Dashboard/index'));
// let isDbOpened = false;
// const DBName = 'bud-electron';
// const DBVersion = 3;
// const DBRequest = indexedDB.open(DBName, DBVersion);
export default function App() {
  // useEffect(() => {
  //   // console.log(DBRequest);
  //   // // create related events
  //   // DBRequest.onerror = (event) => {
  //   //   console.log('INDEXDB - Error', event);
  //   // };
  //   // DBRequest.onupgradeneeded = (event) => {
  //   //   // whenever the DBVErsion changes this function will auto trigger and do the changes
  //   //   console.log('Upgrade event', event);
  //   //   // creating object stores and assigning primary keys
  //   //   const db = event?.target?.result;
  //   //   db.createObjectStore('budElectron', {
  //   //     keypath: 'reduxId',
  //   //     autoIncrement: true,
  //   //   });
  //   // };

  //   // DBRequest.onblocked = (event) => {
  //   //   console.log('DB blocked by browser', event);
  //   // };
  //   // // onSuccess
  //   // DBRequest.onsuccess = (event) => {
  //   //   console.log('INDEXDB created successfully', event.target?.result);
  //   //   const db = event.target?.result;
  //   //   const trans = db.transaction('budElectron', 'readwrite');
  //   //   const indexStore = trans.objectStore('budElectron');
  //   //   console.log('store', indexStore);
  //   //   indexStore?.add({ id: 1, name: 'redux-store' });
  //   // };
  //   DBRequest.onupgradeneeded = (event: any) => {
  //     const db = event.target?.result;
  //     db.createObjectStore('bud-store', { keyPath: 'bud-id' });
  //   };
  //   DBRequest.onsuccess = () => {
  //     console.log('DB is successfully opened!');
  //     isDbOpened = true;
  //   };
  //   DBRequest.onerror = () => {
  //     console.log('DB is NOT opened!');
  //     isDbOpened = false;
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'var(--selected-color)',
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="*" element={<AppLayout />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}
