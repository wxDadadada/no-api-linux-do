import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Modal } from '@douyinfe/semi-ui';
import { isMobile, API, showError, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';

const Home = () => {
  const [statusState] = useContext(StatusContext);
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  
  const displayNotice = async () => {
    const res = await API.get('/api/notice');
    const { success, message, data } = res.data;
    if (success) {
      let oldNotice = localStorage.getItem('notice');
      if (data !== '') {
        const htmlNotice = marked(data);
        setDialogContent(htmlNotice);
        setVisible(true);
        localStorage.setItem('notice', data);
      }
    } else {
      showError(message);
    }
  };

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = marked.parse(data);
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const getStartTimeString = () => {
    const timestamp = statusState?.status?.start_time;
    return statusState.status ? timestamp2string(timestamp) : '';
  };

  const handleOk = () => {
    setVisible(false);
    console.log('Ok button clicked');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('Cancel button clicked');
  };

  const handleAfterClose = () => {
    console.log('After Close callback executed');
  };

  useEffect(() => {
    displayNotice().then();
    displayHomePageContent().then();
  }, []);

  return (
    <>
      {homePageContentLoaded && homePageContent === '' ? (
        <>
          <Card
            bordered={false}
            headerLine={false}
            title='系统状况'
            bodyStyle={{ padding: '10px 20px' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  title='系统信息'
                  headerExtraContent={
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--semi-color-text-1)',
                      }}
                    >
                      系统信息总览
                    </span>
                  }
                >
                  <p>名称：{statusState?.status?.system_name}</p>
                  <p>
                    版本：
                    {statusState?.status?.version
                      ? statusState?.status?.version
                      : 'unknown'}
                  </p>
                  <p>
                    源码：
                    <a
                      href='https://docs.qq.com/doc/p/af2a94ff20cd066dc642d20179a04006c9cba162'
                      target='_blank'
                      rel='noreferrer'
                    >
                      https://docs.qq.com/doc/p/af2a94ff20cd066dc642d20179a04006c9cba162
                    </a>
                  </p>
                  <p>
                    协议：
                    <a
                      href='https://www.apache.org/licenses/LICENSE-2.0'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Apache-2.0 License
                    </a>
                  </p>
                  <p>启动时间：{getStartTimeString()}</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title='系统配置'
                  headerExtraContent={
                    <span
                      style={{
                        fontSize: '12px',
                      }}
                    >
                      系统配置总览
                    </span>
                  }
                >
                  <p>
                    邮箱验证：
                    {statusState?.status?.email_verification === true
                      ? '已启用'
                      : '未启用'}
                  </p>
                  <p>
                    GitHub 身份验证：
                    {statusState?.status?.github_oauth === true
                      ? '已启用'
                      : '未启用'}
                  </p>
                  <p>
                    LINUX DO 身份验证：
                    {statusState?.status?.linuxdo_oauth === true
                      ? '已启用'
                      : '未启用'}
                  </p>
                  <p>
                    微信身份验证：
                    {statusState?.status?.wechat_login === true
                      ? '已启用'
                      : '未启用'}
                  </p>
                  <p>
                    Turnstile 用户校验：
                    {statusState?.status?.turnstile_check === true
                      ? '已启用'
                      : '未启用'}
                  </p>
                  <p>
                    Telegram 身份验证：
                    {statusState?.status?.telegram_oauth === true
                      ? '已启用'
                      : '未启用'}
                  </p>
                </Card>
              </Col>
            </Row>
          </Card>
        </>
      ) : (
        <>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              style={{ width: '100%', height: '100vh', border: 'none' }}
            />
          ) : (
            <div
              style={{ fontSize: 'larger' }}
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            ></div>
          )}
        </>
      )}
      <Modal
        title="公告"
        width={!isMobile() ? '548' : 'calc(100vw - 20px)'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleAfterClose}
        closable={false}
        hasCancel={false}
        maskClosable={false}
      >
        <div dangerouslySetInnerHTML={{ __html: dialogContent }} />
      </Modal>
    </>
  );
};

export default Home;
