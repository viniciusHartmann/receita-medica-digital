import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileAddTwoTone
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';

const { Sider, Content } = Layout;

function App() {
  const [page, setPage] = useState('Home');
  const [collapsed, setCollapsed] = useState(true);

  const handleMenuClick = (e) => {
    setPage(e.key);
    setCollapsed(prev => !prev);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={collapsed} trigger={null} collapsible>
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '10px' }}>
          Logo
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Nova Receita']} onClick={handleMenuClick}>
          <Menu.Item key="Nova Receita" icon={<FileAddTwoTone />}>Nova Receita</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <h1>{page}</h1>
          <p>Welcome to the {page} page.</p>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;