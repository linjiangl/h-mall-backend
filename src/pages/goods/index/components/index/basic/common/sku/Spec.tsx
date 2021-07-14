import React, { useState } from 'react';
import { Select, Tag, Row, Col, Space } from 'antd';

const { Option, OptGroup } = Select;
const { CheckableTag } = Tag;

const SkuSpec: React.FC = () => {
  const tagsData = ['Movies', 'Books', 'Music', 'Sports'];
  const [selectedTags, setSelectTags] = useState(['Books']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectTags(nextSelectedTags);
  };

  return (
    <Row>
      <Col span={24} style={{ paddingBottom: 12 }}>
        <Space>
          <Select defaultValue="lucy" style={{ width: 200 }} disabled>
            <OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
          </Select>

          <a style={{ color: 'red' }}>删除</a>

          <a>编辑</a>
        </Space>
      </Col>

      <Col span={24}>
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Col>
    </Row>
  );
};

export default SkuSpec;
