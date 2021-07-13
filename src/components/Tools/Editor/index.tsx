import React, { useState, useRef } from 'react';
import RcUEditor from 'react-ueditor-wrap';
import { onCallback } from '@/utils/utils';

type EditorProps = {
  value?: string;
  width?: number | string;
  zIndex?: number;
  height?: number | string;
  maxWords?: number;
  config?: Common.Object;
  onChange?: (value: string) => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const ref = useRef();
  const { value, width, zIndex, height, maxWords, config, onChange } = props;
  const [content] = useState<string>(value || '');

  const editorConfig = {
    serverUrl: '/public/ueditor',
    autoClearinitialContent: false,
    autoFloatEnabled: false,
    autoHeightEnabled: false,
    focus: true,
    enableAutoSave: false,
    ...config,
    initialFrameWidth: width, // 初始化编辑器宽度
    initialFrameHeight: height,
    zIndex,
    maximumWords: maxWords,
  };

  return (
    <RcUEditor
      ref={ref}
      value={content}
      ueditorUrl="https://market.w7.cc/UEditor/ueditor.all.min.js"
      ueditorConfigUrl="https://market.w7.cc/UEditor/ueditor.config.js"
      editorConfig={editorConfig}
      onChange={(text: string) => onCallback(onChange, [text])}
    />
  );
};

Editor.defaultProps = {
  value: '',
  width: 'auto',
  zIndex: 1,
  height: 480,
  maxWords: 10000,
  config: {},
};

export default Editor;
