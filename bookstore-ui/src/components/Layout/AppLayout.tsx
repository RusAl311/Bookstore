import './AppLayout.less';

import { Col, Layout, Menu, Row } from 'antd';
import React, { useState } from 'react';
import {
    Link,
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
} from 'react-router-dom';

import routes from '../../configs/routes';

const { Header, Sider, Content } = Layout;
import {
    AlignLeftOutlined,
    BookOutlined,
    HomeFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
} from '@ant-design/icons';

export const AppLayout: React.FC<RouteComponentProps> = () => {
    const getRoutes = (routes: any[]) => {
        return routes.map((prop, key) => {
            if (prop.layout === '/main') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="custMenu"
                >
                    <div className="logo"></div>
                    <Menu
                        className="menu"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item icon={<HomeFilled />} key="1">
                            <Link to={'/main/index'}>Main</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BookOutlined />} key="2">
                            <Link to={'/main/book'}>Books</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignLeftOutlined />} key="3">
                            <Link to={'/main/genre'}>Genres</Link>
                        </Menu.Item>
                        <Menu.Item icon={<TeamOutlined />} key="4">
                            <Link to={'/main/author'}>Authors</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{ padding: 0 }}
                    >
                        <Row style={{ height: '60px' }}>
                            <Col span={2} className="trigger">
                                {React.createElement(
                                    collapsed
                                        ? MenuUnfoldOutlined
                                        : MenuFoldOutlined,
                                    {
                                        className: 'trigger',
                                        onClick: toggle,
                                    },
                                )}
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            {getRoutes(routes)}
                            <Redirect from="*" to="/main/index" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
