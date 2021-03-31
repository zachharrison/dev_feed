const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/posts');

const app = express();

// CONNECT DATABASE
connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
