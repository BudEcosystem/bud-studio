/* eslint-disable react/jsx-no-useless-fragment */
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
import { Suspense, lazy } from 'react';
// redux
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '../redux/store';

const persistor = persistStore(store);
const AppLayout = lazy(() => import('../components/Dashboard/index'));

export default function App() {
  return (
    <Suspense fallback={<></>}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </Suspense>
  );
}
