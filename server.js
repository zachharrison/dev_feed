const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
// const http = require('http');

// API ROUTES
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/posts');
const messageRoutes = require('./routes/api/messages');
const uploadRoutes = require('./routes/api/upload');

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

const io = require('socket.io').listen(server);

// io.on('connection', (socket) => {
//   console.log('SOCKET CONNECTED');
// });

// CONNECT DATABASE
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// ASSIGN SOCKET OBJECT TO EVERY REQUEST
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
