/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import classes from './dashboard.module.css';
import SideBar from './sidebar';
import { recoverWorkspacedata } from 'redux/slices/workspace';
// eslint-disable-next-line no-unused-vars
const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let localReduxStore;
const DBName = 'budelectron';
const DBVersion = 1;
const DBRequest = idb.open(DBName, DBVersion);

const updateDataINIndexedDB = (reduxPassed, callback) => {
  const addLocalStoreToIndexedDB = () => {
    // console.log('localReduxStore', reduxPassed);
    // creating indexedDB instance
    const dbInstance = DBRequest.result;
    // Creating Transaction
    const transaction = dbInstance.transaction('budstore', 'readwrite');
    // Handling Object Store
    const indexeddbStore = transaction.objectStore('budstore');
    const requestForCheckIfExists = indexeddbStore.get('123');
    requestForCheckIfExists.onsuccess = (event) => {
      console.log(event);
      if (event.target.result) {
        const { budid, value } = event.target.result;
        if (value) {
          console.log('Store already exists!');
          callback(value);
        } else {
          const request = indexeddbStore.add({
            budid: '123',
            value: reduxPassed,
          });
          request.onsuccess = () => {
            alert('Store is added!');
            callback();
          };
          request.onerror = () => {
            alert('Store is NOT added!');
          };
        }
      } else {
        const request = indexeddbStore.add({
          budid: '123',
          value: reduxPassed,
        });
        request.onsuccess = () => {
          alert('Store is added!');
          callback();
        };
        request.onerror = () => {
          alert('Store is NOT added!');
        };
      }
    };
    requestForCheckIfExists.onerror = () => {
      console.log(`Store is not available!`);
    };
  };
  DBRequest.onupgradeneeded = (event: any) => {
    const db = event.target?.result;
    db.createObjectStore('budstore', { keyPath: 'budid' });
  };
  DBRequest.onsuccess = () => {
    console.log('DB is successfully opened!');
    addLocalStoreToIndexedDB();
  };
  DBRequest.onerror = () => {
    console.log('DB is NOT opened!');
  };
};

const editDataINIndexedDB = (reduxPassed) => {
  console.log('values changed- reduxPassed', reduxPassed);

  const dbInstance = DBRequest.result;
  const transaction = dbInstance.transaction('budstore', 'readwrite');
  const indexeddbStore = transaction.objectStore('budstore');
  const { counter, workspace } = reduxPassed;
  const requestForUpdate = indexeddbStore.put({
    budid: '123',
    value: { counter, workspace },
  });
  requestForUpdate.onsuccess = (event) => {
    alert('updated');
  };
  requestForUpdate.onerror = () => {
    console.log(`Store is NOT fetched!`);
  };
};
// Dashboard component
export default function Dashboard(_props: any) {
  const dispatch = useDispatch();
  localReduxStore = useSelector((reduxState) => reduxState);
  const [collapsed, setCollapsed] = useState(false);
  const { content, counter, workspace } = localReduxStore;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const changeDataLoadedStatus = (value) => {
    console.log('values changed - changeDataLoadedStatus');
    setIsDataLoaded(true);
    dispatch(recoverWorkspacedata(value.workspace));
  };

  useEffect(() => {
    if (!isDataLoaded) {
      updateDataINIndexedDB(localReduxStore, changeDataLoadedStatus);
    }
  }, [changeDataLoadedStatus, isDataLoaded]);
  useEffect(() => {
    console.log('values changed', workspace);
    if (isDataLoaded) {
      console.log('values changed', workspace);
      editDataINIndexedDB({
        counter,
        content,
        workspace,
      });
    }
  }, [counter, content, workspace, isDataLoaded]);
  console.log('values changed - isDataLoaded', isDataLoaded);
  return (
    <Layout className={classes['main-layout']}>
      <SideBar isCollapsed={collapsed} setCollapsed={setCollapsed} />
    </Layout>
  );
}
