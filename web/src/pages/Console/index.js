import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import { marked } from 'marked';
import { Layout, Empty, Card, Typography } from '@douyinfe/semi-ui';
import { IllustrationSuccess, IllustrationSuccessDark } from '@douyinfe/semi-illustrations';
import SiderBar from '../../components/SiderBar';
const { Sider } = Layout;

const About = () => {
  const [about, setAbout] = useState('');
  const [aboutLoaded, setAboutLoaded] = useState(false);

  const displayAbout = async () => {
    setAbout(localStorage.getItem('about') || '');
    const res = await API.get('/api/about');
    const { success, message, data } = res.data;
    if (success) {
      let aboutContent = data;
      if (!data.startsWith('https://')) {
        aboutContent = marked.parse(data);
      }
      setAbout(aboutContent);
      localStorage.setItem('about', aboutContent);
    } else {
      showError(message);
      setAbout('加载关于内容失败...');
    }
    setAboutLoaded(true);
  };

  useEffect(() => {
    displayAbout().then();
  }, []);

  const { Text } = Typography;

  return (
    <>
      <Layout>
        <Layout.Content>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center', // 水平居中
            // alignItems: 'center', // 垂直居中
            // height: '100vh', // 让父元素占据整个视口的高度
          }}>
            <Empty
              image={<IllustrationSuccess style={{ width: 150, height: 150 }} />}
              darkModeImage={<IllustrationSuccessDark style={{ width: 150, height: 150 }} />}
              description={'欢迎来到控制台'}
              style={{ padding: 30 }}
            />
          </div>

          <Card title='常见问题' >
            <Card
              title='关于gpt系列最新模型'
              style={{ marginBottom: 20 }}
              headerExtraContent={
                <Text link>
                  More
                </Text>
              }
            >
              gpt所有模型升级后默认会指向最新日期的模型，不想频繁变动模型名称可直接配置不带日期的模型，列如GPT-4o当前指向 gpt-4o-2024-05-13。
            </Card>
            <Card
              title=' 余额用完了怎么充值'
              headerExtraContent={
                <Text link>
                  More
                </Text>
              }
            >
              1.您可以在额度充值页面进行在线充值；2. 或者使用兑换码进行兑换余额即可；如果您的令牌设置的不是无限额度，充值后还需检查该令牌余额是否充足，以免影响正常使用。
            </Card>
          </Card>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default About;
