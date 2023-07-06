import { useState } from 'react';
import { Layout } from 'antd';

import Workspace from 'components/Containers/Workspace';
import classes from './dashboard.module.css';
import SideBar from './sidebar';

// Dashboard component
export default function Dashboard(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={classes['main-layout']}>
      <SideBar isCollapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Workspace */}
      <Workspace isCollapsed={collapsed} setMenuCollapsed={setCollapsed} />

      {/* Canvas */}
    </Layout>
  );
}
