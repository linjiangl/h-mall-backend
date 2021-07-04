import { message } from 'antd';
import type { UploadFile } from 'antd/lib/upload/interface';

export const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const checkUploadImage = (file: { type: string; size: number }) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG的图片文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片文件不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const getFileList = (imageList: string[]): UploadFile[] => {
  const data: UploadFile[] = [];
  imageList.forEach((item, index) => {
    data.push({
      uid: index.toString(),
      type: '',
      name: '',
      size: 0,
      status: 'done',
      url: item,
    });
  });
  return data;
};

export const getUploadError = (): UploadFile => {
  return {
    uid: '-1',
    type: '',
    size: 0,
    name: '',
    status: 'error',
  };
};
