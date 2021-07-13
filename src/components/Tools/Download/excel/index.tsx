import { Button } from 'antd';
import moment from 'moment';
import React from 'react';
import { exportExcel } from '@/services/server/common';

type ParamsProps = {
  requestUrl: string;
  requestParams: Record<string, unknown>;
  max?: number;
  filename?: string;
  method?: string;
};

const DownloadExcel: React.FC<ParamsProps> = (props) => {
  const { requestUrl, requestParams, max, filename, method } = props;

  const handleExport = () => {
    exportExcel(
      requestUrl,
      {
        params: {
          current: 1,
          pageSize: max,
          ...requestParams,
        },
      },
      method,
    )
      .then((response) => {
        const blob = new Blob([response]);
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = `${filename}-${moment().format('YYYY.MM.DD')}.xlsx`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      })
      .catch(() => {});
  };

  return (
    <Button type="primary" onClick={handleExport}>
      导出
    </Button>
  );
};

DownloadExcel.defaultProps = {
  max: 10000,
  filename: '未知',
  method: 'GET',
};

export default DownloadExcel;
