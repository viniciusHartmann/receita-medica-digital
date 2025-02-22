import { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  FileAddTwoTone,
  SafetyOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import { NewRecipe } from './pages/forms/recipes/LayoutRecipe';
import RegistrationForm from './pages/forms/register/LayoutRegister';

const { Content } = Layout;

export function App() {
  const [page, setPage] = useState('Home');
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e: any) => {
    setPage(e.key);
    setOpen(false); // Fecha o menu ao selecionar uma opção
  };

  // Função para renderizar a página correspondente
  const renderPage = () => {
    switch (page) {
      case 'Receitas':
        return <NewRecipe />;
      case 'Cadastros':
        return <RegistrationForm />;
      case 'Home':
        return (
          <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginTop: '20%' }}>
            Bem-vindo!
          </div>
        );
      default:
        return <h1>Página não encontrada</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1000
        }}
      />

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu mode="vertical" defaultSelectedKeys={['Home']} onClick={handleMenuClick}>
          <Menu.Item key="Home">Home</Menu.Item>
          <Menu.Item key="Cadastros" icon={<SafetyOutlined />}>Cadastros</Menu.Item>
          <Menu.Item key="Receitas" icon={<FileAddTwoTone />}>Receitas</Menu.Item>
        </Menu>
      </Drawer>

      <Layout>
        <Content style={{ padding: '20px' }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}
