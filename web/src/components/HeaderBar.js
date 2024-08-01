import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useSetTheme, useTheme } from '../context/Theme';
import { StatusContext } from '../context/Status';
import { API, getLogo, getSystemName, showSuccess, isAdmin, isMobile, showError } from '../helpers';
import { setStatusData } from '../helpers/data.js';
import {
  IconMoon,
  IconSun,
  IconCalendarClock,
  IconChecklistStroked,
  IconComment,
  IconCreditCard,
  IconGift,
  IconHistogram,
  IconHome,
  IconKey,
  IconLayers,
  IconPriceTag,
  IconSetting,
  IconUser,
  IconHelpCircle,
  IconAt
} from '@douyinfe/semi-icons';

import {
  IconToken,
  IconIntro,
  IconTree,
  IconOverflow,
  IconTag,
  IconCard,
  IconToast,
  IconBanner,
  IconAvatar,
  IconChangelog,
  IconPopover,
  IconImage,
  IconSlider,
  IconConfig,
  IconFaq,
} from '@douyinfe/semi-icons-lab';

import { Layout, Nav, Avatar, Dropdown, Switch } from '@douyinfe/semi-ui';
import { stringToColor } from '../helpers/render';
import '../index.css';

import fireworks from 'react-fireworks';

// HeaderBar Buttons
const HeaderBar = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [statusState, statusDispatch] = useContext(StatusContext);
  const defaultIsCollapsed = isMobile() || localStorage.getItem('default_collapse_sidebar') === 'true';
  let navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const systemName = getSystemName();
  const logo = getLogo();
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);
  const [showSidebar, setShowSidebar] = useState(false);

  const routerMap = {
    home: '/',
    console: '/console',
    channel: '/console/channel',
    token: '/console/token',
    redemption: '/console/redemption',
    topup: '/console/topup',
    user: '/console/user',
    log: '/console/log',
    midjourney: '/console/midjourney',
    setting: '/setting',
    about: '/about',
    chat: '/console/chat',
    detail: '/console/detail',
    pricing: '/pricing',
    task: '/console/task',
    login: '/login',
    register: '/register',
  };

  const headerButtons = useMemo(
    () => [
      {
        text: '首页',
        itemKey: 'home',
        to: '/',
        icon: <IconIntro />,
      },
      {
        text: '控制台',
        itemKey: 'console',
        to: '/console',
        icon: <IconToken />,
      },
      {
        text: '渠道',
        itemKey: 'channel',
        to: '/channel',
        icon: <IconTree />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: '聊天',
        itemKey: 'chat',
        to: '/chat',
        icon: <IconOverflow />,
        className: localStorage.getItem('chat_link')
          ? 'semi-navigation-item-normal'
          : 'tableHiddle',
      },
      {
        text: '令牌',
        itemKey: 'token',
        to: '/token',
        icon: <IconTag />,
      },
      {
        text: '兑换码',
        itemKey: 'redemption',
        to: '/redemption',
        icon: <IconCard />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: '钱包',
        itemKey: 'topup',
        to: '/topup',
        icon: <IconToast />,
      },
      {
        text: '模型',
        itemKey: 'pricing',
        to: '/pricing',
        icon: <IconBanner />,
      },
      {
        text: '用户',
        itemKey: 'user',
        to: '/user',
        icon: <IconAvatar />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: '日志',
        itemKey: 'log',
        to: '/log',
        icon: <IconChangelog />,
      },
      {
        text: '看板',
        itemKey: 'detail',
        to: '/detail',
        icon: <IconPopover />,
        className:
          localStorage.getItem('enable_data_export') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: '绘图',
        itemKey: 'midjourney',
        to: '/midjourney',
        icon: <IconImage />,
        className:
          localStorage.getItem('enable_drawing') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: '异步任务',
        itemKey: 'task',
        to: '/task',
        icon: <IconSlider />,
        className:
          localStorage.getItem('enable_task') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: '设置',
        itemKey: 'setting',
        to: '/setting',
        icon: <IconConfig />,
      },
      {
        text: '关于',
        itemKey: 'about',
        to: '/about',
        icon: <IconFaq />
      }
    ],
    [
      localStorage.getItem('enable_data_export'),
      localStorage.getItem('enable_drawing'),
      localStorage.getItem('enable_task'),
      localStorage.getItem('chat_link'),
      isAdmin(),
    ],
  );

  const loadStatus = async () => {
    const res = await API.get('/api/status');
    if (res === undefined) {
      return;
    }
    const { success, data } = res.data;
    if (success) {
      statusDispatch({ type: 'set', payload: data });
      setStatusData(data);
    } else {
      showError('无法正常连接至服务器！');
    }
  };

  useEffect(() => {
    loadStatus().then(() => {
      setIsCollapsed(
        isMobile() ||
        localStorage.getItem('default_collapse_sidebar') === 'true',
      );
    });
    let localKey = window.location.pathname.split('/')[1];
    if (localKey === '') {
      localKey = 'home';
    }
    setSelectedKeys([localKey]);
  }, []);

  async function logout() {
    setShowSidebar(false);
    await API.get('/api/user/logout');
    showSuccess('注销成功!');
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    navigate('/login');
  }

  const theme = useTheme();
  const setTheme = useSetTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('theme-mode', 'dark');
    }
  }, []);

  return (
    <>
      <Layout>
        <div style={{ width: '100%' }}>
          <Nav
            mode={'horizontal'}
            selectedKeys={selectedKeys}
            renderWrapper={({ itemElement, props }) => {
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  to={routerMap[props.itemKey]}
                >
                  {itemElement}
                </Link>
              );
            }}
            items={!isMobile() ? [
              {
                text: '首页',
                itemKey: 'home',
              },
              {
                text: '控制台',
                itemKey: 'console'
              }
            ] : [{
              text: '控制台',
              itemKey: 'console',
              icon: <IconToken />,
              items: headerButtons
            }]}
            onSelect={(key) => {
              setSelectedKeys([key.itemKey]);
            }}

            header={
              <>
                {/* {
                  logo: (
                    <img src={logo} alt='logo' style={{ marginRight: '0.75em' }} />
                  )
                  // text: systemName
                } */}
                {/* {!isMobile() && <img src={logo} alt='logo' style={{ marginRight: '0.75em', width: '36px', height: '36px' }} />} */}
                {!isMobile() ? (
                  <img src={logo} alt='logo' style={{ marginRight: '0.75em', width: '36px', height: '36px' }} />
                ) : (
                  !location.pathname.startsWith('/console') ? (
                    <img src={logo} alt='logo' style={{ marginRight: '0.75em', width: '36px', height: '36px' }} />
                  ) : ('1'
                  )
                )}
              </>
            }
            footer={
              <>
                {/* <span>
                  {!isMobile() && <Nav.Item itemKey={'about'} icon={<IconFaq />} />}
                </span> */}
                <span
                  onClick={() => {
                    if (theme === 'dark') {
                      setTheme('');
                    } else {
                      setTheme('dark');
                    }
                  }}
                >
                  <Nav.Item style={{ 'background-color': 'transparent' }}>
                    {theme === 'dark' ? <IconSun /> : <IconMoon />}
                  </Nav.Item>
                </span>

                {userState.user ? (
                  <>
                    {!location.pathname.startsWith('/console') ? (
                      <Nav.Item
                        text={'控制台'}
                        itemKey={'console'}
                        icon={<IconToken />}
                        style={{ 'background-color': 'transparent' }}
                      />
                    ) : (
                      <Dropdown
                        position='bottomRight'
                        render={
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={logout}>退出</Dropdown.Item>
                          </Dropdown.Menu>
                        }
                      >
                        <Avatar
                          size='small'
                          color={stringToColor(userState.user.username)}
                          style={{ margin: 4 }}
                        >
                          {userState.user.username}
                        </Avatar>
                        {!isMobile() && <span>{userState.user.username}</span>}
                      </Dropdown>
                    )}

                  </>
                ) : (
                  <>
                    <Nav.Item
                      text={'登录'}
                      itemKey={'login'}
                      icon={<IconKey />}
                      style={{ 'background-color': 'transparent' }}
                    />
                    <Nav.Item
                      text={'注册'}
                      itemKey={'register'}
                      icon={<IconUser />}
                      style={{ 'background-color': 'transparent' }}
                    />
                  </>
                )}
              </>
            }
          ></Nav>
        </div>
      </Layout >
    </>
  );
};

export default HeaderBar;
