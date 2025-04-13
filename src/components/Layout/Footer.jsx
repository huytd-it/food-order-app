import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thông tin liên hệ */}
          <div>
            <Text strong className="text-lg mb-4 block">Liên hệ</Text>
            <Space direction="vertical">
              <Text>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</Text>
              <Text>Điện thoại: (84) 123-456-789</Text>
              <Text>Email: info@foodorderapp.com</Text>
            </Space>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <Text strong className="text-lg mb-4 block">Liên kết nhanh</Text>
            <Space direction="vertical">
              <Link href="/menu">Thực đơn</Link>
              <Link href="/cart">Giỏ hàng</Link>
              <Link href="/about">Về chúng tôi</Link>
              <Link href="/contact">Liên hệ</Link>
            </Space>
          </div>

          {/* Mạng xã hội */}
          <div>
            <Text strong className="text-lg mb-4 block">Theo dõi chúng tôi</Text>
            <Space size="large">
              <Link href="https://facebook.com" target="_blank">
                <FacebookOutlined className="text-2xl text-primary" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <InstagramOutlined className="text-2xl text-primary" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <TwitterOutlined className="text-2xl text-primary" />
              </Link>
            </Space>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <Text type="secondary">
            © {new Date().getFullYear()} Food Order App. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer; 