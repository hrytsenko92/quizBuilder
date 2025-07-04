'use client';
import React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizForm as QuizFormType, quizFormSchema } from '@/utils/validation';
import { QuestionType } from '@/types/quiz';
import QuestionInput from '@/components/questionInput';
import styles from './quizForm.module.css';
import { PlusCircle } from 'lucide-react';
import QuizService from '@/services/quiz.service';

const QuizForm: React.FC = () => {
  const methods = useForm<QuizFormType>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      questions: [
        {
          type: 'OPEN_ENDED',
          text: '',
          correctAnswer: '',
          id: crypto.randomUUID(),
        },
      ],
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuizFormType) => {
    try {
      const dataToSend = {
        title: data.title,
        questions: data.questions.map(q => {
          const processedQuestion: {
            text: string;
            type: QuestionType;
            correctAnswer?: string | null;
            options?: { text: string; isCorrect: boolean }[];
          } = {
            text: q.text,
            type: q.type,
          };

          switch (q.type) {
            case 'TRUE_FALSE':
            case 'OPEN_ENDED':
              if (q.correctAnswer !== undefined && q.correctAnswer !== null) {
                processedQuestion.correctAnswer = String(q.correctAnswer);
              }
              break;
            case 'MULTIPLE_CHOICE':
              if (q.options && q.options.length > 0) {
                processedQuestion.options = q.options.map(option => ({
                  text: option.text,
                  isCorrect: option.isCorrect,
                }));
              }
              break;
          }

          return processedQuestion;
        }),
      };

      await QuizService.createQuiz(dataToSend);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to create quiz:', error.message);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.quizForm}>
        <div className={styles.formGroup}>
          <label htmlFor="quizTitle" className={styles.label}>
            Quiz title:
          </label>
          <input
            id="quizTitle"
            {...methods.register('title')}
            className={styles.input}
          />
          {errors.title && (
            <p className={styles.errorMessage}>{errors.title.message}</p>
          )}
        </div>

        <h2 className={styles.questionsHeader}>Questions:</h2>
        {fields.map((field, index) => (
          <QuestionInput
            key={field.id}
            questionIndex={index}
            onRemove={() => remove(index)}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              type: 'OPEN_ENDED',
              text: '',
              correctAnswer: '',
              id: crypto.randomUUID(),
            })
          }
          className={styles.addQuestionButton}
        >
          <PlusCircle size={20} /> Add question
        </button>

        {errors.questions && (
          <p className={styles.errorMessage}>{errors.questions.message}</p>
        )}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save quiz'}
        </button>
      </form>
    </FormProvider>
  );
};

export default QuizForm;