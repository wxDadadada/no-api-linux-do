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
      {location.pathname.startsWith('/console') && (
        <Sider>
          <SiderBar />
        </Sider>
      )}
      <Content
        style={{
          padding: '24px',
        }}
      >
        <App />
      </Content>
    </Layout>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header>
          <HeaderBar />
        </Header>
        <Routes>
          <Route path="*" element={<LayoutWithConditionalSider />} />
        </Routes>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </ThemeProvider>
      <ToastContainer />
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