import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';
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

// initialization

const root = ReactDOM.createRoot(document.getElementById('root'));
const { Sider, Content, Header } = Layout;

// const location = useLocation();
// root.render(
//   <React.StrictMode>
//     <StatusProvider>
//       <UserProvider>
//         <BrowserRouter>
//           <ThemeProvider>
//             <Layout>
//               <Layout>
//                 <Header>
//                   <HeaderBar />
//                 </Header>
//                 {location.pathname === '/console' && (
//                   <Sider>
//                     <SiderBar />
//                   </Sider>
//                 )}
//                 <Content
//                   style={{
//                     padding: '24px',
//                   }}
//                 >
//                   <App />
//                 </Content>
//                 <Layout.Footer>
//                   <Footer></Footer>
//                 </Layout.Footer>
//               </Layout>
//               <ToastContainer />
//             </Layout>
//           </ThemeProvider>
//         </BrowserRouter>
//       </UserProvider>
//     </StatusProvider>
//   </React.StrictMode>,
// );

function LayoutWithConditionalSider() {
  const location = useLocation();
  return (
    <Layout>
      <Header style={{
        height: '60px',
        position: 'sticky',
        top: 0,
        zIndex: 999 
      }}>
        <HeaderBar />
      </Header>
      <Layout style={{
        height: 'calc(100vh - 60px)'
      }}>
        {!isMobile() &&
          (
            location.pathname.startsWith('/console') && (
              <Sider style={{
                height: 'calc(100vh - 60px)'
              }}>
                <SiderBar />
              </Sider>
            )
          )
        }
        <Layout
            style={{
              overflowY: 'auto'
            }}
          >
          <Content
            style={{
              padding: '24px'
            }}
          >
            <App />
          </Content>
      <Layout.Footer  style={{
        height: '60px'
      }}>
        <Footer></Footer>
      </Layout.Footer>
        </Layout>
      </Layout>
      <ToastContainer />
    </Layout>
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