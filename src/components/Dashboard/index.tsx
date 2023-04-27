import { useState } from 'react';
import { Layout } from 'antd';
import classes from './dashboard.module.css';
import SideBar from './sidebar';

// eslint-disable-next-line no-unused-vars
export default function Dashboard(_props: any) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={classes['main-layout']}>
      <SideBar isCollapsed={collapsed} setCollapsed={setCollapsed} />
    </Layout>
  );
}
