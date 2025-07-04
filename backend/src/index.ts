import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/quizzes", quizRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});