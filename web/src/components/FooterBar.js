import React, { useEffect, useState } from 'react';

import { isMobile, getFooterHTML, getSystemName } from '../helpers';
import { Layout, Tooltip } from '@douyinfe/semi-ui';

const Footer = () => {
  const systemName = getSystemName();
  const [footer, setFooter] = useState(getFooterHTML());
  let remainCheckTimes = 5;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const defaultFooter = (
    // <div className='custom-footer'>
    <div style={{
      display: 'flex',
      'word-wrap': 'break-word',
      'align-items': 'center',
      padding: 20,
      height: 60,
      color: 'var(--semi-color-text-2)',
      'background-color': 'rgba(var(--semi-grey-0), 1)',
      'justify-content': !isMobile() ? 'space-between' : 'center',
      'flex-direction': !isMobile() ? 'row' : 'column',
      // 'align-items': !isMobile() ? 'stretch' : 'center',
    }}>
      <span>
        <span>Copyright © 2024&nbsp;
          <a href='https://github.com/wxDadadada' style={{ 'text-align': 'center', 'text-decoration': 'none', color: 'inherit', marginRight: '10px' }}
            target='_blank'
            rel='noreferrer'
          >
            No API
          </a>All Rights Reserved.</span>
      </span>
      <div style={{ 'text-align': 'center' }}>
        <a href='https://github.com/Calcium-Ion/new-api' style={{ 'text-align': 'center', 'text-decoration': 'none', color: 'inherit', marginRight: '10px' }}
          target='_blank'
          rel='noreferrer'
        >
          New API
        </a>
        <a
          href='https://github.com/songquanpeng/one-api' style={{ 'text-align': 'center', 'text-decoration': 'none', color: 'inherit' }}
          target='_blank'
          rel='noreferrer'
        >
          One API
        </a>
        {/* <a href="https://github.com/Calcium-Ion/new-api" style="text-align: center; text-decoration: none; color: inherit;">New API</a>
        <a href="https://github.com/songquanpeng/one-api" style="text-align: center; text-decoration: none; color: inherit;">One API</a> */}
      </div>
    </div>
    // </div>
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainCheckTimes <= 0) {
        clearInterval(timer);
        return;
      }
      remainCheckTimes--;
      loadFooter();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Layout>
      <Layout.Content style={{ textAlign: 'center' }}>
        {footer ? (
          <Tooltip content={defaultFooter}>
            <div
              // className='custom-footer'
              dangerouslySetInnerHTML={{ __html: footer }}
            ></div>
          </Tooltip>
        ) : (
          defaultFooter
        )}
      </Layout.Content>
      </Layout>
    </>
  );
};

export default Footer;
