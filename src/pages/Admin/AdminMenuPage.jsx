import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, Tag, Upload, Image } from 'antd';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { auth } from '../../firebaseConfig';

const { Option } = Select;
const { TextArea } = Input;

const AdminMenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (url) => (
        <Image
          width={50}
          height={50}
          src={url}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'available' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const menusSnapshot = await getDocs(collection(db, 'menus'));
      const menusList = menusSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMenus(menusList);
    } catch (error) {
      message.error('Failed to fetch menus');
      console.error('Error fetching menus:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    setImageUrl(menu.imageUrl);
    form.setFieldsValue({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      status: menu.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (menuId) => {
    try {
      const menu = menus.find(m => m.id === menuId);
      if (menu.imageUrl) {
        try {
          const imagePath = menu.imageUrl.split('/o/')[1].split('?')[0];
          const decodedPath = decodeURIComponent(imagePath);
          const imageRef = ref(storage, decodedPath);
          await deleteObject(imageRef);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }
      await deleteDoc(doc(db, 'menus', menuId));
      message.success('Menu item deleted successfully');
      fetchMenus();
    } catch (error) {
      message.error('Failed to delete menu item');
      console.error('Error deleting menu:', error);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      const storageRef = ref(storage, `menus/${filename}`);
      
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uploadedBy: auth.currentUser?.uid || 'unknown',
          uploadedAt: new Date().toISOString()
        }
      };
      
      const snapshot = await uploadBytes(storageRef, file, metadata);
      
      const url = await getDownloadURL(snapshot.ref);
      
      setImageUrl(url);
      setUploading(false);
      return url;
    } catch (error) {
      setUploading(false);
      message.error('Failed to upload image: ' + error.message);
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const menuData = {
        ...values,
        imageUrl: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      if (selectedMenu) {
        if (selectedMenu.imageUrl && selectedMenu.imageUrl !== imageUrl) {
          const oldImagePath = selectedMenu.imageUrl.split('/o/')[1].split('?')[0];
          const decodedPath = decodeURIComponent(oldImagePath);
          const oldImageRef = ref(storage, decodedPath);
          await deleteObject(oldImageRef);
        }
        await updateDoc(doc(db, 'menus', selectedMenu.id), menuData);
        message.success('Menu item updated successfully');
      } else {
        menuData.createdAt = new Date().toISOString();
        await addDoc(collection(db, 'menus'), menuData);
        message.success('Menu item added successfully');
      }

      setIsModalVisible(false);
      setImageUrl('');
      setImageFile(null);
      form.resetFields();
      fetchMenus();
    } catch (error) {
      message.error('Failed to save menu item');
      console.error('Error saving menu:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedMenu(null);
    setImageUrl('');
    setImageFile(null);
    form.resetFields();
  };

  const handleAddNew = () => {
    setSelectedMenu(null);
    setImageUrl('');
    setImageFile(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <Button type="primary" onClick={handleAddNew}>
          Add New Menu Item
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={menus}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={selectedMenu ? "Edit Menu Item" : "Add New Menu Item"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select>
              <Option value="appetizer">Appetizer</Option>
              <Option value="main">Main Course</Option>
              <Option value="dessert">Dessert</Option>
              <Option value="drink">Drink</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select>
              <Option value="available">Available</Option>
              <Option value="unavailable">Unavailable</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('You can only upload image files!');
                  return false;
                }
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                  message.error('Image must be smaller than 5MB!');
                  return false;
                }
                setImageFile(file);
                handleImageUpload(file);
                return false;
              }}
              showUploadList={false}
              accept="image/*"
              maxCount={1}
            >
              <Button 
                icon={<UploadOutlined />} 
                loading={uploading}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </Upload>
            {imageUrl && (
              <div className="mt-4">
                <Image
                  width={200}
                  src={imageUrl}
                  alt="Menu item"
                  style={{ objectFit: 'cover' }}
                  preview={false}
                />
                <Button 
                  danger 
                  className="mt-2"
                  onClick={() => {
                    setImageUrl('');
                    setImageFile(null);
                  }}
                >
                  Remove Image
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminMenuPage; 