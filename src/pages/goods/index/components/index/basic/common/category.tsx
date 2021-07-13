import React, { useEffect, useState } from 'react';
import { Cascader, Space, Button } from 'antd';
import { children } from '@/services/goods/category';
import FormPage from '@/pages/goods/category/components/FormPage';

type ParamsProps = {
  value?: React.Key[];
  onChange?: (value: React.Key[]) => void;
};

const FormCategory: React.FC<ParamsProps> = (props) => {
  const { value, onChange } = props;
  const [options, setOptions] = useState([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    children()
      .then((res) => {
        setOptions(res);
      })
      .catch(() => {});
  }, [formVisible]);

  return (
    <>
      <Space>
        <Cascader
          defaultValue={value}
          options={options}
          onChange={onChange}
          placeholder="请选择商品分类"
          fieldNames={{ label: 'name', value: 'id' }}
          style={{ width: '160px' }}
        />

        <Button
          type="link"
          size="small"
          onClick={() => {
            setFormVisible(true);
          }}
        >
          新增分类
        </Button>
      </Space>

      {formVisible && <FormPage onCancel={setFormVisible} formVisible={formVisible} detail={{}} />}
    </>
  );
};

export default FormCategory;
