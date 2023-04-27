/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Layout } from 'antd';
import HeaderComp from '../header';
import classes from '../dashboard.module.css';
import Launcher from '../../Launcher/Launcher';
import OmniSearch from '../../OmniSearch/OmniSearch';

function ContentView({ setCollapsed, isCollapsed, children }: any) {
  const { Content } = Layout;
  return (
    <Layout className={classes['site-layout']}>
      <HeaderComp
        slideFn={() => setCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
      />
      {children}
      <Content className={classes['site-layout-content']}>
        <Launcher/>
      </Content>
      <OmniSearch/>
    </Layout>
  );
}
export default ContentView;
