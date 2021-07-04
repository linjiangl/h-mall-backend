import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type ActionProps = {
  tips?: string;
  isBatch?: boolean;
  disabled?: boolean;
  onOk: () => void;
};

const ConfirmDelete: React.FC<ActionProps> = (props) => {
  const { tips, isBatch, disabled, onOk } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const handleOk = () => {
    setVisible(false);
    onOk();
  };

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => {
          setVisible(true);
        }}
        disabled={disabled}
      >
        {isBatch ? '批量删除' : '删除'}
      </Button>
      <Modal
        title="提示"
        width={420}
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="icons-list">
          <Row>
            <Col span={2}>
              <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#d9363e' }} />
            </Col>
            <Col span={12}>
              {tips || (isBatch ? '确定要执行批量删除吗？' : '确定要删除该记录吗？')}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

ConfirmDelete.defaultProps = {
  isBatch: false,
  disabled: false,
};

export default ConfirmDelete;
