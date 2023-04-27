import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/index.css';
import '../components/Layout.css';
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
