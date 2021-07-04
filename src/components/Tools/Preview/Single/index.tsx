import React from 'react';
import { Image } from 'antd';

type PreviewProps = {
  image: string;
  width?: number;
  height?: number;
};

const Preview: React.FC<PreviewProps> = (props) => {
  const { image, width, height } = props;

  return <Image src={image} width={width} height={height} />;
};

Preview.defaultProps = {
  width: 120,
  height: 120,
};

export default Preview;
