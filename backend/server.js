import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../backend/auth.js';
import resetPass from '../backend/resetPass.js';
import setMenu from '../backend/setMenu.js';
import setNotice from '../backend/setNotice.js';
import http from 'http';
import { Server } from 'socket.io';
import bookLunch from '../backend/bookLunch.js';
import session from 'express-session';
import birthdata from '../backend/birthdata.js'
import studentdata from '../backend/studentdata.js'
dotenv.config();
const app = express();
app.use(cors({
  origin:['http://localhost:5173', 'https://prathaagarwal.github.io'],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret:'helloworld',
  resave:false,
  saveUninitialized: false
}))
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://prathaagarwal.github.io/'],
    methods: ['GET', 'POST']
  }
});
app.get('/', (req, res) => {
  res.send('Server is running!');
});
io.on('connection', (socket) => {
  console.log('Client connected: ', socket.id);
  socket.on('locationUpdate', (locationData) => {
    console.log('Location update:', locationData);
    socket.broadcast.emit('receiveLocation', locationData);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});
app.use('/api/auth', authRoutes);
app.use('/api', resetPass);
app.use('/api/menu', setMenu);
app.use('/api/notice', setNotice);
app.use('/api/lunch', bookLunch);
app.use('/api/birth', birthdata);
app.use('/api/student', studentdata);
server.listen(PORT, () => {
  console.log(`🚀 Server with Socket.IO running at http://localhost:${PORT}`);
});
