import { useState } from 'react';
import { Layout } from 'antd';
import classes from './dashboard.module.css';
import SideBar from './sidebar';

// Dashboard component
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={classes['main-layout']}>
      <SideBar isCollapsed={collapsed} setCollapsed={setCollapsed} />
    </Layout>
  );
}
