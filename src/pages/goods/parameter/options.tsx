import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Space, Tag } from 'antd';
import { list, remove } from '@/services/server/goods/ParameterOptions';
import { PlusOutlined } from '@ant-design/icons';
import { info as parameterDetail } from '@/services/server/goods/parameter';
import { getPageQuery, parmasValidationFailed } from '@/utils/utils';
import FormPage from './components/ParameterOptionsForm';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';
import Tips from '@/components/Tools/Table/Tips';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [loding, setLoding] = useState<boolean>(true);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Parameter.Options>({});
  const [title, setTitle] = useState<string>('属性类型');
  const [parameterId, setParameterId] = useState<number>(0);
  const [tipsMessages] = useState<string[]>([
    '设置对应的商品属性',
    '设置快捷的商品模版有助于创建商品',
  ]);

  const beforeCreated = () => {
    setDetail({});
    setFormVisible(true);
  };

  const beforeUpdated = (item: Parameter.Options) => {
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
    const params = getPageQuery();
    const queryId: number = parseInt(params.parameter_id as string, 10);
    if (!queryId) {
      parmasValidationFailed();
    }
    if (queryId > 0) {
      parameterDetail(queryId)
        .then((res: Parameter.Detail) => {
          if (res.name) {
            setTitle(`${res.name}模版`);
            setParameterId(res.id as number);
            setLoding(false);
          }
        })
        .catch(() => {
          setLoding(false);
        });
    }
  }, []);

  const columns: ProColumns<Parameter.Options>[] = [
    {
      title: '属性名称',
      dataIndex: 'option',
      align: 'center',
      width: 240,
    },
    {
      title: '属性类型',
      dataIndex: 'type',
      align: 'center',
      width: 180,
      valueEnum: {
        0: { text: '单选', status: 'Success' },
        1: { text: '多选', status: 'Success' },
        2: { text: '手动输入', status: 'Success' },
      },
    },
    {
      title: '属性值',
      dataIndex: 'values',
      align: 'center',
      render: (_, record) =>
        record.values?.map((item) => {
          return (
            <Tag color="#108ee9" key={record.id}>
              {item}
            </Tag>
          );
        }),
    },
    {
      title: '排序',
      dataIndex: 'sorting',
      align: 'center',
      width: 180,
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
            onOk={() => {
              handleRemove(record.id as number);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      {!loding && (
        <>
          <Tips list={tipsMessages} />
          <ProTable<Parameter.Options>
            headerTitle={title}
            actionRef={ref}
            rowKey="id"
            bordered
            search={false}
            request={(params, sort, filter) =>
              list({ params: { ...params, parameter_id: parameterId }, sort, filter })
            }
            columns={columns}
            toolBarRender={() => [
              <Button type="primary" key="created" onClick={beforeCreated}>
                <PlusOutlined /> 新建
              </Button>,
            ]}
          />

          {formVisible && (
            <FormPage
              formVisible={formVisible}
              parameterId={parameterId}
              detail={detail}
              onCancel={(visible, reload) => {
                setFormVisible(visible);
                if (reload) {
                  ref.current?.reload();
                }
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default ListTable;
