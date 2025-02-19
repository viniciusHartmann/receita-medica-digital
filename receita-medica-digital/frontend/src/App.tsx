import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileAddTwoTone,
  SafetyOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import { NewRecipe } from './pages/forms/recipes/LayoutRecipe';
import RegistrationForm from './pages/forms/register/LayoutRegister';
const { Sider, Content } = Layout;

//Parte de autenticação com google
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from './services/firebase';
// export function SingIn() {
//   const provider = new GoogleAuthProvider();
//   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//   provider.setCustomParameters({
//     'login_hint': 'user@example.com'
//   });

//   function makeLogin() {

//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   }

//   return (
//     <div>
//       <button onClick={makeLogin}>
//         <span>Login com o Google</span>
//       </button>
//     </div>
//   )
// }


export function App() {
  const [page, setPage] = useState('Home');
  const [collapsed, setCollapsed] = useState(true);

  const handleMenuClick = (e: any) => {
    setPage(e.key);
    setCollapsed(prev => !prev);
  };

  // Função para renderizar a página correspondente
  const renderPage = () => {
    switch (page) {
      case 'Receitas':
        return <NewRecipe />;
      case 'Cadastros':
        return <RegistrationForm />
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
          <Menu.Item key="Cadastros" icon={<SafetyOutlined />}>Cadastros</Menu.Item>
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

