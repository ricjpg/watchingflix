const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

// Read data from JSON file
const readData = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all items
app.get('/api/items', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST new item
app.post('/api/items', (req, res) => {
  const data = readData();
  const newItem = req.body;
  newItem.id = Date.now().toString();
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const updatedItem = req.body;
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const filteredData = data.filter(item => item.id !== id);
  if (data.length !== filteredData.length) {
    writeData(filteredData);
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});