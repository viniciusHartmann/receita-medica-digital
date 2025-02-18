import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileAddTwoTone
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import NewRecipe from './pages/LayoutPages';

const { Sider, Content } = Layout;

function App() {
  const [page, setPage] = useState('Home');
  const [collapsed, setCollapsed] = useState(true);

  const handleMenuClick = (e: any) => {
    setPage(e.key);
    setCollapsed(prev => !prev);
  };

  // Função para renderizar a página correspondente
  const renderPage = () => {
    switch (page) {
      case 'Nova Receita':
        return <NewRecipe />;
      default:
        return <h1>Página não encontrada</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={collapsed} trigger={null} collapsible>
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '10px' }}>
          Logo
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Nova Receita']} onClick={handleMenuClick}>
          <Menu.Item key="Nova Receita" icon={<FileAddTwoTone />}>Nova Receita</Menu.Item>
          <Menu.Item key="Receitas" icon={<FileAddTwoTone />}>Receitas</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;