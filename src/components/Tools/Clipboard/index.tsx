import React from 'react';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';

type ParmamProps = {
  text: string;
};

const Clipboard: React.FC<ParmamProps> = (props) => {
  const { text } = props;

  const handleClipboard = () => {
    copy(text);
    message.success('Copy successfully');
  };

  return (
    <Button type="primary" className="clipBtn" onClick={handleClipboard}>
      Copy Trace
    </Button>
  );
};

export default Clipboard;
