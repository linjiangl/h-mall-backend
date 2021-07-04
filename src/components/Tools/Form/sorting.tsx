import React from 'react';
import { ProFormSlider } from '@ant-design/pro-form';
import styles from './form.less';

const FormSorting: React.FC = () => {
  return (
    <div className={styles.customForm}>
      <ProFormSlider
        name="sorting"
        label="排序"
        min={0}
        max={100}
        width="lg"
        help="商品默认排序号为0，数字越小，排序越靠前，数字重复，则最新添加的靠前。"
      />
    </div>
  );
};

export default FormSorting;
