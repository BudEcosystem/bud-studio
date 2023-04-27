/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Layout } from 'antd';
import HeaderComp from '../header';
import classes from '../dashboard.module.css';

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
        <div className={classes['site-layout-common-menu']}>
          <img
            className="hover-effect"
            src="/images/other/launcher-icon.png"
            alt="#"
            width={30}
            height={30}
          />
          <img
            className="hover-effect"
            src="/images/logo/name.png"
            alt="#"
            width={50}
            height={20}
          />
          <img
            className="hover-effect"
            src="/images/other/pitch-icon.png"
            alt="#"
            width={20}
            height={20}
          />
        </div>
      </Content>
    </Layout>
  );
}
export default ContentView;
