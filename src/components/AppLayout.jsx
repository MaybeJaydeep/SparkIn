// src/components/AppLayout.jsx
import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  FileAddOutlined,
  UserOutlined,
  EditOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/new',
      icon: <FileAddOutlined />,
      label: <Link to="/new">New Post</Link>,
    },
    {
      key: '/author',
      icon: <UserOutlined />,
      label: user ? (
        <Link to={`/author/${user.username}`}>Author Profile</Link>
      ) : (
        'Author Profile'
      ),
    },
    {
      key: '/profile/edit',
      icon: <EditOutlined />,
      label: <Link to={`/profile/${user?.username}/edit`}>Edit Profile</Link>,
    },
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Admin Dashboard</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        className="!bg-gray-900 text-white"
      >
        <div className="text-white text-center p-4 text-lg font-bold">
          ⚡ SparkIn
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="!bg-gray-900 text-white flex items-center justify-between px-6"
          style={{ height: '64px' }}
        >
          {/* Add your header content if needed */}
        </Header>
        <Content className="bg-gray-900 text-white">
          <div className="bg-gray-800 text-white p-6 rounded-lg min-h-[90vh]">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center !bg-gray-900 text-gray-400">
          SparkIn ©{new Date().getFullYear()} Created by Jaydeep
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
