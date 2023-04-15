import React = require("react");
import {Layout} from 'antd';
import Link from 'next/link';

const {
    Header,
    Content,
  } = Layout;

export default function SideMenuLayout() {
    return (
        <>
            <Header>
                <Link href="/next">
                    <a>Go to HELL page</a>
                </Link>
            </Header>

            <Content style={{ padding: 48 }}>
                BINGO
            </Content>
        </>
    )
}