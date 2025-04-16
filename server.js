
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import helmet from 'helmet';

// DB Connection
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blog.routes.js';

dotenv.config();
const app = express();


connectDB();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/uploads', express.static(path.join(process.cwd(), "uploads")));


// Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);


app.use(limiter);








app.get('/', (req, res) => {
  res.send('🚀 TechInfuse API is running');
});











// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
