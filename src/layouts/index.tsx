import { Link, IRouteComponentProps, useRouteMatch, useParams } from 'umi'
import React, { useState } from 'react'
import { Layout, Menu, Avatar, Breadcrumb } from 'antd'
import {
  HomeOutlined,
  GiftOutlined,
  IdcardOutlined,
  WalletOutlined,
  HeartOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import 'normalize.css'

import { pathnameToPagename } from '../configs'
import styles from './index.css'

const iconStyle = { fontSize: '1vw', paddingLeft: '1vw' }

const { Header, Sider, Content } = Layout

function MyLayout({ children, location, route, history, match }: IRouteComponentProps) {
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{pathnameToPagename(pathSnippets.slice(0, index + 1))}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1 className={styles.title}>重邮帮后台管理中心</h1>
        <div className={styles.routeName}>
          <Breadcrumb separator="<">
            {extraBreadcrumbItems}
          </Breadcrumb>
        </div>
        <div>退出</div>
      </Header>
      <Layout>
        <Sider width={'17vw'} theme={'light'} className={styles.sider}>
          <div className={styles.self}>
            <Avatar className={styles.avatar} />
            <div className={styles.info}>
              <div className={styles.name}>{'重小邮'}</div>
              <div className={styles.subInfo}>学院：{'软件学院'}</div>
              <div className={styles.subInfo}>组织：{'红岩网校工作站'}</div>
            </div>
          </div>
          <Menu
            // defaultSelectedKeys={[pathnameToPagename(location.pathname)]}
            mode="inline"
            theme="light"
          >
            <Menu.Item key="个人中心">
              <Link to="/user">
                <HomeOutlined style={iconStyle} />
                <span className={styles.item}>个人中心</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="活动奖品推送中心">
              <Link to="/activity">
                <GiftOutlined style={iconStyle} />
                <span className={styles.item}>活动奖品推送中心</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="身份有证管理中心">
              <Link to="/id">
                <IdcardOutlined style={iconStyle} />
                <span className={styles.item}>身份有证管理中心</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="影票上线管理中心">
              <Link to="/ticket">
                <WalletOutlined style={iconStyle} />
                <span className={styles.item}>影票上线管理中心</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="志愿服务管理">
              <Link to="/volunteer">
                <HeartOutlined style={iconStyle} />
                <span className={styles.item}>志愿服务管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="组织管理">
              <Link to="/organization">
                <SettingOutlined style={iconStyle} />
                <span className={styles.item}>组织管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default MyLayout
