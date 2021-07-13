import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import PageForm from './components/index/form';

export default (): React.ReactNode => (
  <PageContainer title={false}>
    <ProCard>
      <PageForm />
    </ProCard>
  </PageContainer>
);
