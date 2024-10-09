const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;
 
app.use(cors());
app.use(express.json()); 

 
mongoose.connect('mongodb://localhost:27017/user_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

 
app.use('/api/users', userRoutes);

 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
