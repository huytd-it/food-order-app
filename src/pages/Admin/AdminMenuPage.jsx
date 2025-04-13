import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, Tag, Upload, Image } from 'antd';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
        const imageRef = ref(storage, menu.imageUrl);
        await deleteObject(imageRef);
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
      const storageRef = ref(storage, `menus/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      return url;
    } catch (error) {
      message.error('Failed to upload image');
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
                setImageFile(file);
                handleImageUpload(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageUrl && (
              <div className="mt-4">
                <Image
                  width={200}
                  src={imageUrl}
                  alt="Menu item"
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminMenuPage; 