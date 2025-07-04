import React from 'react';
import QuizForm from '@/components/quizForm';

const CreateQuizPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
    <h1>Create a new quiz</h1>
      <QuizForm />
    </div>
  );
};

export default CreateQuizPage;