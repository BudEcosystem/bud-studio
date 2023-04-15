import React = require("react");
import {Layout} from 'antd';
import Link from 'next/link';

const {
    Header,
    Content,
    Sider
  } = Layout;

export default function SideMenuLayout() {
    return (
        <>
            <Layout>
                 <Sider>Sider</Sider>

                <Content style={{ padding: 48 }}>
                    BINGO
                </Content>
            </Layout>
        </>
    )
}