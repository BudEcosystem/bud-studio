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
export default function App() {
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
