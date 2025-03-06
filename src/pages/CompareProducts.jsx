import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Button, Modal, Card } from 'antd';
import axios from 'axios';

const CompareProducts = () => {
  const location = useLocation();
  const [compareList, setCompareList] = useState(location.state?.compareList || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const showModal = () => {
    axios.get('https://dummyjson.com/products').then((res) => {
      setAllProducts(res.data.products);
      setIsModalOpen(true);
    });
  };

  const handleAddToCompare = (product) => {
    if (compareList.length < 4 && !compareList.some((p) => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const handleRemove = (id) => {
    setCompareList(compareList.filter((product) => product.id !== id));
  };

  const compareColumns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Brand', dataIndex: 'brand', responsive: ['md'] },
    { title: 'Category', dataIndex: 'category', responsive: ['lg'] },
    { title: 'Price ($)', dataIndex: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Discount (%)', dataIndex: 'discountPercentage', responsive: ['md'] },
    { title: 'Image', dataIndex: 'thumbnail', render: (url) => <img src={url} width={50} alt="product" /> },
    {
      title: 'Remove',
      render: (_, record) => (
        <Button danger onClick={() => handleRemove(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Compare Products</h2>
      
      <div style={styles.tableContainer}>
        <Table
          columns={compareColumns}
          dataSource={compareList}
          rowKey="id"
          pagination={false}
          scroll={{ x: '100%' }} 
        />
      </div>

      {compareList.length < 4 && (
        <Button type="primary" onClick={showModal} style={styles.addButton}>
          Add More Products
        </Button>
      )}

      <Modal
        title="Add Products to Compare"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600} 
        bodyStyle={{ 
            maxHeight: '400px', 
            overflowY: 'auto' 
          }}
      >
        <div style={styles.modalContainer}>
          {allProducts.map((product) => (
            <Card key={product.id} hoverable style={styles.productCard}>
              <img src={product.thumbnail} alt={product.title} style={styles.productImage} />
              <h4>{product.title}</h4>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
              <Button
                type="primary"
                onClick={() => handleAddToCompare(product)}
                disabled={compareList.some((p) => p.id === product.id)}
              >
                {compareList.some((p) => p.id === product.id) ? 'Added' : 'Add'}
              </Button>
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto', 
    width:'78vw',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'black',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '900px', 
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  addButton: {
    marginTop: '15px',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    color: 'white',
    fontSize: '16px',
  },
  modalContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
    gap: '15px',
    padding: '10px',
    justifyContent: 'center',
  },
  productCard: {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
};

export default CompareProducts;
