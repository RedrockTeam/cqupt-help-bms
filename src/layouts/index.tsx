import { Link, IRouteComponentProps, connect, ConnectProps } from 'umi'
import React, { useState, ReactNode, useEffect } from 'react'
import { Layout, Menu, Avatar, Breadcrumb, message } from 'antd'
import { UserModelState } from '@/models/user'
import { LayoutModelState } from '@/models/layout'
import {
  HomeOutlined,
  GiftOutlined,
  IdcardOutlined,
  WalletOutlined,
  HeartOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import styles from './index.css'
import { pathnameToPagename } from '@/utils'

const iconStyle = { fontSize: '1vw', paddingLeft: '1vw' }

const { Header, Sider, Content } = Layout

interface ConnectState {
  user: UserModelState,
  layout: LayoutModelState,
}

type Props = ConnectProps & ConnectState & {
  children: ReactNode,
}

function MyLayout({ children, location, user, layout }: Props) {
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    // TODO: 先这样写，之后优化把 pathnameToPagename 的逻辑放到 layout model 的 subscription 里面
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{pathnameToPagename(pathSnippets.slice(0, index + 1))}</Link>
      </Breadcrumb.Item>
    )
  })

  useEffect(() => {
    layout.errorMessages.forEach(err => message.error(err.message))
  }, [layout.errorMessages])

  useEffect(() => {
    layout.successMessages.forEach(info => message.success(info))
  }, [layout.successMessages])

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
            <Avatar className={styles.avatar} src={user.info.avatar} />
            <div className={styles.info}>
              <div className={styles.name}>{user.info.name}</div>
              <div className={styles.subInfo}>
                学院：<span className={styles.infoContent}>{user.info.college}</span>
              </div>
              <div className={styles.subInfo}>
                组织：<span className={styles.infoContent}>{user.info.team_name}</span>
              </div>
            </div>
          </div>
          <Menu
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
            <Menu.SubMenu key="组织管理"
              title={
                <span>
                  <SettingOutlined style={iconStyle} />
                  <span className={styles.item}>组织管理</span>
                </span>
              }
            >
              <Menu.Item key="权限管理">
                <Link to="/organization-auth">权限管理</Link>
              </Menu.Item>
              <Menu.Item key="部门成员">
                <Link to="/organization-member">部门成员</Link>
              </Menu.Item>
              <Menu.Item key="任务发布">
                <Link to="/organization-task">任务发布</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default connect((state: ConnectState) => ({
  user: state.user,
  layout: state.layout,
}))(MyLayout)
