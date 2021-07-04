import ProCard from '@ant-design/pro-card';
import { Collapse } from 'antd';

import './index.less';

const { Panel } = Collapse;

type ParamsProps = {
  list: string[];
};

const DrawerForm: React.FC<ParamsProps> = (props) => {
  const { list } = props;

  return (
    <ProCard style={{ marginBottom: 18 }}>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header="操作提示" key="1">
          <ul className="tips-ul">
            {list.map((item, key) => {
              return <li key={key}>{item}</li>;
            })}
          </ul>
        </Panel>
      </Collapse>
    </ProCard>
  );
};

export default DrawerForm;
