import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllQuizzes = async (req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });
  res.json(quizzes);
};

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions } = req.body;

  try {
    const adaptedQuestions = questions.map((q: any) => {
      const questionData: any = {
        text: q.text,
        type: q.type,
      };

      switch (q.type) {
        case 'TRUE_FALSE':
          questionData.correctAnswer = q.correctAnswer !== undefined && q.correctAnswer !== null
            ? String(q.correctAnswer)
            : null;
          questionData.options = null;
          break;
        case 'OPEN_ENDED':
          questionData.correctAnswer = q.correctAnswer || null;
          questionData.options = null;
          break;
        case 'MULTIPLE_CHOICE':
          questionData.correctAnswer = null;
          if (q.options) {
            questionData.options = q.options;
          } else {
            questionData.options = null;
          }
          break;
        default:
          console.warn(`Unknown question type received from frontend: ${q.type}`);
          questionData.correctAnswer = null;
          questionData.options = null;
          break;
      }

      return questionData;
    });

    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: adaptedQuestions,
        },
      },
      include: { questions: true },
    });

    res.status(201).json(quiz);
  } catch (error: any) {
    console.error("Backend error creating quiz:", error);
    res.status(500).json({
      error: "Failed to create quiz",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
    include: { questions: true },
  });
  res.json(quiz);
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.question.deleteMany({
      where: { quizId: Number(id) },
    });
    await prisma.quiz.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};