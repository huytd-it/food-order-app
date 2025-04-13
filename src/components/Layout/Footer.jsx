import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Text, Link: AntLink } = Typography;

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Food Order App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 