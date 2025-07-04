import { z } from 'zod';

export const checkboxOptionSchema = z.object({
  text: z.string().min(1, 'Option cannot be empty'),
  isCorrect: z.boolean(),
  id: z.string().optional(),
});

const baseQuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'Question text cannot be empty'),
  type: z.enum(['TRUE_FALSE', 'OPEN_ENDED', 'MULTIPLE_CHOICE']),
});

export const trueFalseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('TRUE_FALSE'),
  correctAnswer: z.union([z.boolean(), z.string()]).optional(),
});

export const openEndedQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('OPEN_ENDED'),
  correctAnswer: z.string().min(1, 'Answer cannot be empty'),
});

export const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('MULTIPLE_CHOICE'),
  options: z.array(checkboxOptionSchema)
    .min(2, 'At least 2 options are required')
    .refine((options) => options.some(option => option.isCorrect), {
      message: 'At least one option must be correct',
    }),
  correctAnswer: z.string().optional().nullable(),
});

export const questionFormSchema = z.discriminatedUnion('type', [
  trueFalseQuestionSchema,
  openEndedQuestionSchema,
  multipleChoiceQuestionSchema,
]);

export const quizFormSchema = z.object({
  title: z.string().min(3, 'Quiz title must be at least 3 characters long'),
  questions: z.array(questionFormSchema).min(1, 'Quiz must have at least one question'),
});

export type CheckboxOptionForm = z.infer<typeof checkboxOptionSchema>;
export type QuestionForm = z.infer<typeof questionFormSchema>;
export type QuizForm = z.infer<typeof quizFormSchema>;