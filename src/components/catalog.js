import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const ItemCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h3`
  margin-top: 0;
`;

const ItemActions = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

function Catalog() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Catalog</h2>
      <CatalogGrid>
        {items.map(item => (
          <ItemCard key={item.id}>
            <ItemTitle>{item.title}</ItemTitle>
            <p>{item.description}</p>
            <ItemActions>
              <Link to={`/edit/${item.id}`}>Edit</Link>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </ItemActions>
          </ItemCard>
        ))}
      </CatalogGrid>
    </div>
  );
}

export default Catalog;