import React, { useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { getUploadUrl } from '@/utils/config';
import { getBase64, getFileList } from '@/utils/upload';
import { onCallback } from '@/utils/utils';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import stlyes from './index.less';

type ImageSingleProps = {
  value?: string[];
  // 限制上传图片个数
  max?: number;
  onChange?: (fullPathList: string, pathList: string) => void;
};

const ImageMultiple: React.FC<ImageSingleProps> = (props) => {
  const { value, max, onChange } = props;
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResult = (list: UploadFile[]) => {
    const fullPathList: string[] = [];
    list.forEach((item) => {
      let fullPath: string = '';
      if (item.url) {
        fullPath = item.url;
      } else if (item.response.data && item.response.data.full_path) {
        fullPath = item.response.data.full_path;
        fullPath = fullPath.replace(/http(s)?:/i, '');
      }
      if (fullPath) {
        fullPathList.push(fullPath);
      }
    });
    const pathList: string[] = [];
    fullPathList.forEach((item) => {
      pathList.push(item.replace(/\/\/[^\\/]+\//i, ''));
    });
    onCallback(onChange, [fullPathList.join(','), pathList.join(',')]);
  };

  const handlePreview = async (file: UploadFile) => {
    if (file.url) {
      setPreviewImage(file.url);
      setPreviewVisible(true);
    } else if (file.originFileObj) {
      getBase64(file.originFileObj)
        .then((res) => {
          setPreviewImage(res as string);
          setPreviewVisible(true);
        })
        .catch(() => {
          message.error('获取图片失败');
        });
    }
  };

  const handleChange = (info: UploadChangeParam) => {
    if (max && info.fileList.length > max) {
      message.error(`最多可以上传${max}个图片`);
      return;
    }
    setFileList(info.fileList);
    handleResult(info.fileList);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value?.length) {
      const tmpFileList = getFileList(value);
      setFileList(tmpFileList);
      handleResult(tmpFileList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>;

  return (
    <>
      <Upload
        name="file"
        listType="picture-card"
        action={getUploadUrl}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        className={stlyes.uploadImageList}
      >
        {max && fileList.length >= max ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title="图片预览"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

ImageMultiple.defaultProps = {
  value: [],
  max: 9,
};

export default ImageMultiple;
