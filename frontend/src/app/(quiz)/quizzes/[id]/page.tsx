"use client";

import React from "react";
import QuizService from "@/services/quiz.service";
import { Quiz, Question } from "@/types/quiz";
import styles from "./quizDetailPage.module.css";
import Link from "next/link";

const QuestionDisplay: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className={styles.questionCard}>
      <h3 className={styles.questionText}>{question.text}</h3>
      <p className={styles.questionType}>Type: {question.type}</p>
      {question.type === "TRUE_FALSE" && (
        <div className={styles.answerSection}>
          <p>
            Correct answer: <strong>{question.correctAnswer ? "Yes" : "No"}</strong>
          </p>
        </div>
      )}
      {question.type === "OPEN_ENDED" && (
        <div className={styles.answerSection}>
          <p>
            Correct answer: <strong>{question.correctAnswer}</strong>
          </p>
        </div>
      )}
      {question.type === "MULTIPLE_CHOICE" && question.options && (
        <div className={styles.answerSection}>
          <p className={styles.optionsTitle}>Answer options:</p>
          <ul className={styles.optionsList}>
            {question.options.map((option, index) => (
              <li key={index} className={option.isCorrect ? styles.correctOption : ""}>
                {option.text} {option.isCorrect && "(Correct)"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

import { use } from "react";

interface QuizDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function QuizDetailPage({ params }: QuizDetailPageProps) {
  const unwrappedParams = use(params);
  const quizId = Number(unwrappedParams.id);

  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await QuizService.getQuizById(quizId);
        setQuiz(data);
        setError(null);
      } catch {
        setError("Failed to load quiz details.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;
  if (!quiz) return <div className={styles.message}>Quiz not found.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.quizTitle}>{quiz.title}</h1>
      <Link href="/quizzes" className={styles.backButton}>
        &larr; Back to all quizzes
      </Link>
      <div className={styles.questionsList}>
        {quiz.questions.length === 0 ? (
          <p className={styles.noQuestions}>This quiz has no questions.</p>
        ) : (
          quiz.questions.map((question) => <QuestionDisplay key={question.id} question={question} />)
        )}
      </div>
    </div>
  );
}