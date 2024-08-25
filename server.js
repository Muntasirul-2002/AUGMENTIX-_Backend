import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors'
dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://augmentix-backend.onrender.com/",
    "https://augmentix-backend.onrender.com",
    "http://augmentix-backend.onrender.com",
    "https://augmentix-todo.vercel.app/",
    "https://augmentix-todo.vercel.app",
    "http://augmentix-todo.vercel.app",
    undefined,
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS from origin : ${origin}`));
      }
    },
    credentials: true,
  };
  
// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Todo backend!");
  });
// Routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
