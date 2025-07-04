'use client';
import React, { useState, useEffect } from 'react';
import QuizService from '@/services/quiz.service';
import { Quiz } from '@/types/quiz';
import QuizCard from '@/components/quizCard';
import styles from './quizzesPage.module.css';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await QuizService.getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error('Error loading quizzes:', err);
      setError('Failed to load quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (id: number) => {
    console.log(`Confirming deletion of quiz with ID: ${id}`);
    const confirmDelete = true;

    if (confirmDelete) {
      try {
        await QuizService.deleteQuiz(id);
        setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== id));
        console.log(`Quiz with ID: ${id} deleted successfully.`);
      } catch (err) {
        console.error(`Error deleting quiz ${id}:`, err);
        console.error('Failed to delete quiz.');
      }
    }
  };

  if (loading) {
    return <div className={styles.message}>Loading quizzes...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Available quizzes</h1>
      {quizzes.length === 0 ? (
        <p className={styles.noQuizzes}>No quizzes yet. Create the first quiz!</p>
      ) : (
        <div className={styles.quizGrid}>
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionCount={quiz.questions.length}
              onDelete={handleDeleteQuiz}
            />
          ))}
        </div>
      )}
    </div>
  );
}