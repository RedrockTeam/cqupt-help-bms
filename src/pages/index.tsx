import React, { useState } from 'react';
import styles from './index.less';
import { Tree, Button, message } from 'antd';
import {
  DownOutlined,
  FrownOutlined,
  SmileOutlined,
  MehOutlined,
  FrownFilled,
} from '@ant-design/icons';
import { useModel } from 'umi';
import { chooseOrg } from '@/api/user';
import { redirectTo } from '@/utils';

const WxLoginRedirecter = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [selectedKeys, setSelectedKeys] = useState<number[]>();
  return (
    <div>
      <div>
        <h1 className={styles.title}>选择组织</h1>
        <Button
          type="primary"
          className={styles.btn}
          onClick={async () => {
            if (selectedKeys && selectedKeys[0]) {
              const res = await chooseOrg(selectedKeys[0]);
              if (res.info === 'success') {
                redirectTo('/user');
                refresh();
              } else {
                message.info(res.info || 'error');
              }
            }
          }}
        >
          确定
        </Button>
      </div>
      <div className={styles.treeWrapper}>
        <Tree
          showIcon
          switcherIcon={<DownOutlined />}
          selectedKeys={selectedKeys}
          onSelect={(s, e) => {
            setSelectedKeys(s);
          }}
          treeData={initialState.orgs.teams.map(p => ({
            title: p.name,
            key: p.id,
            children: p.infos.map(c => ({
              title: c.name,
              key: c.id,
            })),
          }))}
        />
      </div>
    </div>
  );
};

export default WxLoginRedirecter;
