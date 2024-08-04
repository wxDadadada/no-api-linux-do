import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import 'semantic-ui-offline/semantic.min.css';
import './index.css';
import { UserProvider } from './context/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from './context/Status';
import { Layout } from '@douyinfe/semi-ui';
import SiderBar from './components/SiderBar';
import { ThemeProvider } from './context/Theme';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { isMobile } from './helpers';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { Sider, Content, Header, Footer } = Layout;

function LayoutWithConditionalSider() {
  const location = useLocation();
  return (
    <>
      <Layout>
        <Header style={{
          position: 'fixed',
          width: '100%',
          height: '60px',
          zIndex: '999'
        }}>
          <HeaderBar />
        </Header>
        <Layout style={{
          position: 'fixed',
          width: '100%',
          height: 'calc(100vh - 60px)',
          marginTop: 60
        }}>
          {!isMobile() && (
            location.pathname.startsWith('/console') && (
              <Sider>
                <SiderBar />
              </Sider>
            )
          )}
          <Layout style={{
              // padding: '15px',
              // marginBottom: 60,
              overflow: 'auto'
            }} >
            <Content style={{
              padding: '15px',
              // marginBottom: 60,
              // overflow: 'auto'
            }} >
              <App />
            </Content>
            <Footer style={{
              // position: 'fixed',
              // width: '100%',
              // height: 60,
              // bottom: 0
            }}>
              <FooterBar />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="*" element={<LayoutWithConditionalSider />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <StatusProvider>
      <UserProvider>
        <Main />
      </UserProvider>
    </StatusProvider>
  </React.StrictMode>
);