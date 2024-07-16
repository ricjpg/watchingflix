import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  height: 100px;
`;

const Button = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

function ItemForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/api/items/${id}`);
      const item = response.data;
      setTitle(item.title);
      setDescription(item.description);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = { title, description };
    try {
      if (id) {
        await axios.put(`/api/items/${id}`, item);
      } else {
        await axios.post('/api/items', item);
      }
      history.push('/');
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit' : 'Add'} Item</h2>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></TextArea>
      <Button type="submit">{id ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

export default ItemForm;