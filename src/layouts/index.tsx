import { Link, ConnectProps, useModel, useAccess, NavLink } from 'umi'
import React, { useState, ReactNode, useEffect, ReactChildren } from 'react'
import { Layout, Menu, Avatar, Breadcrumb, message, Skeleton } from 'antd'
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

const { Header, Sider, Content } = Layout

type Props = ConnectProps & {
  children: ReactNode,
}

const Nav = ({ canEnter, route, routeName, Icon }: { canEnter: boolean, route: string, routeName: string, Icon?: ReactNode }) => {
  return (
    canEnter ? <NavLink to={route} className={styles.nav} activeClassName={styles.activeNav}>
      {Icon}
      <span className={styles.item}>{routeName}</span>
    </NavLink> : <div onClick={() => message.warn('没有权限')} className={styles.nav}>
      {Icon}
      <span className={styles.item}>{routeName}</span>
    </div>
  )
}

function MyLayout({ children, location }: Props) {
  // if (location.pathname === '/') return <>{children}</>

  const { initialState, loading } = useModel('@@initialState')
  const access = useAccess()

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

  console.log(access)

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
          <Skeleton loading={loading} active avatar>
            <div className={styles.self}>
              <Avatar className={styles.avatar} src={initialState?.avatar} />
              <div className={styles.info}>
                <div className={styles.name}>{initialState?.name}</div>
                <div className={styles.subInfo}>
                  学院：<span className={styles.infoContent}>{initialState?.college}</span>
                </div>
                <div className={styles.subInfo}>
                  组织：<span className={styles.infoContent}>{initialState?.team_name}</span>
                </div>
              </div>
            </div>
          </Skeleton>
          <Menu
            mode="inline"
            theme="light"
          >
            <Nav canEnter={access.canEnterUser} route="/user" routeName="个人中心" Icon={<HomeOutlined />} />
            <Nav canEnter={access.canEnterActivity} route="/activity" routeName="活动奖品推送中心" Icon={<GiftOutlined />} />
            <Nav canEnter={access.canEnterId} route="/id" routeName="身份有证管理中心" Icon={<IdcardOutlined />} />
            <Nav canEnter={access.canEnterTicket} route="/ticket" routeName="影票上线管理中心" Icon={<WalletOutlined />} />
            <Nav canEnter={access.canEnterVolunteer} route="/volunteer" routeName="志愿服务管理" Icon={<HeartOutlined />} />
            <Menu.SubMenu key="组织管理"
              title={
                <span style={{ color: '#636B81' }}>
                  <SettingOutlined style={{ fontSize: '0.9375vw' }} />
                  <span className={styles.item} style={{ marginLeft: '0.52084vw' }}>组织管理</span>
                </span>
              }
            >
              <Nav canEnter={access.canEnterOrganization} route="/organization-auth" routeName="权限管理" />
              <Nav canEnter={access.canEnterOrganization} route="/organization-member" routeName="部门成员" />
              <Nav canEnter={access.canEnterOrganization} route="/organization-task" routeName="任务发布" />
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default MyLayout
