import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button } from 'antd';
import type { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import { all } from '@/services/server/goods/service';
import FormPage from '@/pages/goods/service/components/FormPage';

type ParamsProps = {
  //
};

const FormService: React.FC<ParamsProps> = () => {
  const [list, setList] = useState<CheckboxOptionType[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    all()
      .then((res: Service.Detail[]) => {
        const tmp: CheckboxOptionType[] = [];
        res.forEach((item) => {
          tmp.push({
            label: item.name,
            value: item.id as number,
          });
        });
        setList(tmp);
      })
      .catch(() => {});
  }, [formVisible]);

  return (
    <>
      <Form.Item
        name={['attribute', 'service_ids']}
        label="商品服务"
        help={
          <Button
            type="link"
            size="small"
            onClick={() => {
              setFormVisible(true);
            }}
          >
            新增服务
          </Button>
        }
      >
        <Checkbox.Group options={list} />
      </Form.Item>

      {formVisible && <FormPage onCancel={setFormVisible} formVisible={formVisible} detail={{}} />}
    </>
  );
};

export default FormService;
