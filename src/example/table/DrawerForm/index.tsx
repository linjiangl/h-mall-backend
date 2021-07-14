import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Avatar, Space } from 'antd';
import { list, remove, parent } from '@/services/server/goods/category';
import { formatDate } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import FormPage from './components/FormPage';
import ImagePreview from '@/components/Tools/Preview/Single';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Category.Detail>({});
  const [top, setTop] = useState<Common.IValueEnum>({});
  const [loding, setLoding] = useState<boolean>(true);

  const beforeCreated = () => {
    setDetail({});
    setFormVisible(true);
  };

  const beforeUpdated = (item: Category.Detail) => {
    setDetail(item);
    setFormVisible(true);
  };

  const handleRemove = (id: number) => {
    remove(id)
      .then(() => {
        message.success('删除成功');
        ref.current?.reload();
      })
      .catch(() => {});
  };

  useEffect(() => {
    parent()
      .then((res: Category.Detail[]) => {
        const tmp: Common.IValueEnum = {};
        res.forEach((item: Category.Detail) => {
          if (item.id) {
            tmp[item.id] = {
              text: item.name,
            };
          }
        });
        setTop(tmp);
        setLoding(false);
      })
      .catch(() => {
        setLoding(false);
      });
  }, []);

  const columns: ProColumns<Category.Detail>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      search: false,
      align: 'center',
    },
    {
      title: '所属分类',
      dataIndex: 'parent_id',
      hideInTable: true,
      valueEnum: {
        0: { text: '顶级分类' },
        ...top,
      },
    },
    {
      title: '所属分类',
      align: 'center',
      render: (_, row) => <>{row.parent?.name || '顶级分类'}</>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      align: 'center',
    },
    {
      title: '图标',
      align: 'center',
      render: (_, row) => (
        <>{row.icon ? <Avatar src={row.icon} size="large" shape="square" /> : '--'}</>
      ),
    },
    {
      title: '背景图',
      align: 'center',
      render: (_, row) => (
        <>{row.cover ? <ImagePreview image={row.cover} height={48} width={48} /> : '--'}</>
      ),
    },
    {
      title: '排序',
      align: 'center',
      dataIndex: 'sorting',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      search: false,
      align: 'center',
      width: 160,
      render: (_, row) => <>{formatDate(row.created_time || 0)}</>,
    },
    {
      title: '修改时间',
      dataIndex: 'updated_time',
      search: false,
      align: 'center',
      width: 160,
      render: (_, row) => <>{formatDate(row.updated_time || 0)}</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 240,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              beforeUpdated(record);
            }}
          >
            编辑
          </Button>
          <ConfirmDelete
            tips="确定要删除此分类吗?"
            onOk={() => handleRemove(record.id as number)}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      {!loding && (
        <>
          <ProTable<Category.Detail>
            headerTitle="分类列表"
            actionRef={ref}
            rowKey="id"
            bordered
            request={(params, sort, filter) => list({ params, sort, filter })}
            columns={columns}
            toolBarRender={() => [
              <Button type="primary" key="created" onClick={beforeCreated}>
                <PlusOutlined /> 新建
              </Button>,
            ]}
          />
          {formVisible && (
            <FormPage
              onCancel={(visible, reload) => {
                setFormVisible(visible);
                if (reload) {
                  ref.current?.reload();
                }
              }}
              formVisible={formVisible}
              detail={detail}
            />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default ListTable;
