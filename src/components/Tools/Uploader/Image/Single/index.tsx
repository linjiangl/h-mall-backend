import React, { useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { getUploadUrl } from '@/utils/config';
import { checkUploadImage } from '@/utils/upload';
import { onCallback } from '@/utils/utils';
import type { UploadChangeParam } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import type { ImgCropProps } from 'antd-img-crop';
import './index.less';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

type ImageSingleProps = {
  value?: string;
  crop?: false | ImgCropProps;
  onChange?: (fullPath: string, path: string) => void;
};

const ImageSingle: React.FC<ImageSingleProps> = (props) => {
  const { value, crop, onChange } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>(value || '');

  const handleResult = (fullPath: string) => {
    onCallback(onChange, [fullPath, fullPath.replace(/\/\/[^\\/]+\//i, '')]);
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setImagePath('');
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const data: Common.Upload = info.file.response;
      data.full_path = data.full_path.replace(/http(s)?:/i, '');
      setLoading(false);
      setImagePath(data.full_path);
      handleResult(data.full_path);
    }
  };

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>;

  let upload = (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={getUploadUrl}
      beforeUpload={checkUploadImage}
      onChange={handleChange}
    >
      {imagePath ? <img src={imagePath} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
  if (crop !== false) {
    upload = <ImgCrop {...crop}>{upload}</ImgCrop>;
  }

  return upload;
};

ImageSingle.defaultProps = {
  value: '',
  crop: false,
};

export default ImageSingle;
