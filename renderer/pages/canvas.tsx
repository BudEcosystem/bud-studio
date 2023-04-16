import React, { useEffect } from 'react';
import Head from 'next/head';
import SideMenuLayout from '../components/layouts/side-menu-layout';
import Canvas from 'components/canvas';


export default function CanvasPage() {

  return (
    <React.Fragment>
      <SideMenuLayout showTopBar={false}>
        <Canvas></Canvas>
      </SideMenuLayout>

    </React.Fragment>
  );
};

