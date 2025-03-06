import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  const handleCompare = (product) => {
    if (compareList.length < 4 && !compareList.some((p) => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Price ($)', dataIndex: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Discount (%)', dataIndex: 'discountPercentage' },
    { title: 'Brand', dataIndex: 'brand' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Image', dataIndex: 'thumbnail', render: (url) => <img src={url} width={50} alt="product" /> },
    {
      title: 'Compare',
      render: (_, record) => (
        <Button
          onClick={() => handleCompare(record)}
          disabled={compareList.some((p) => p.id === record.id)}
        >
          {compareList.some((p) => p.id === record.id) ? 'Added' : 'Compare'}
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Product Details</h2>
        {compareList.length > 0 && (
          <Button
            type="primary"
            onClick={() => navigate('/compare', { state: { compareList } })}
            style={styles.compareButton}
          >
            Go to Compare Page
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={styles.table}
      />
    </div>
  );
};

const styles = {
  container: {
    height: '108vh',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black'
  },
  compareButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    color: 'white',
    fontSize: '16px',
  },
  table: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '8px',
  },
};

export default ProductDetails;
