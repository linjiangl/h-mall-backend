import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { List } from 'react-virtualized';
const data = [
  1,
  2,
  3,
  4,
  5,
  7,
  8,
  9,
  9,
  199,
  3343,
  10991,
  33939,
  434343,
  23423,
  4234,
  23,
  423,
  4,
  234,
  23,
  423,
  4,
  23,
  423,
  4,
  234,
];

const TableList: React.FC = () => {
  return (
    <PageContainer>
      <div>
        <List
          // 窗口的高度,必填
          height={400}
          // 窗口的宽度,必填
          width={300}
          // 总共个数
          rowCount={data.length}
          // cell高度
          rowHeight={30}
          style={{ outline: 'none' }}
          rowRenderer={({ key, index, isScrolling, style }) => {
            if (isScrolling) {
              return (
                <div key={key} style={style}>
                  滚动中...
                </div>
              );
            }
            return (
              <div key={key} style={style}>
                {data[index]}
              </div>
            );
          }}
        />
      </div>
    </PageContainer>
  );
};

export default TableList;
