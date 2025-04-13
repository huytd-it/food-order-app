import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        tip="Đang tải..."
      />
    </div>
  );
};

export default LoadingSpinner; 