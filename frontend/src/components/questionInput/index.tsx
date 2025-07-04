"use client";
import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { QuizForm } from "@/utils/validation";
import { QuestionType } from "@/types/quiz";
import styles from "./questionInput.module.css";
import { Trash2, Plus } from "lucide-react";

interface QuestionInputProps {
  questionIndex: number;
  onRemove: () => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  questionIndex,
  onRemove,
}) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<QuizForm>();

  const questionType = watch(`questions.${questionIndex}.type`);
  const questionErrors = errors.questions?.[questionIndex];

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const handleTypeChange = (newType: QuestionType) => {
    if (
      newType === "MULTIPLE_CHOICE" &&
      (!optionFields || optionFields.length === 0)
    ) {
      appendOption({ text: "", isCorrect: false, id: crypto.randomUUID() });
      appendOption({ text: "", isCorrect: false, id: crypto.randomUUID() });
    }
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionHeader}>
        <h3>Question {questionIndex + 1}</h3>
        <button
          type="button"
          onClick={onRemove}
          className={styles.removeButton}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Question Type:</label>
        <Controller
          name={`questions.${questionIndex}.type`}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) => {
                const newType = e.target.value as QuestionType;
                field.onChange(newType);
                handleTypeChange(newType);
              }}
              className={styles.select}
            >
              <option value="OPEN_ENDED">Open-ended</option>
              <option value="TRUE_FALSE">True/False</option>
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            </select>
          )}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Question Text:</label>
        <input
          {...register(`questions.${questionIndex}.text`)}
          className={styles.input}
          placeholder="Enter question text"
        />
        {questionErrors?.text && (
          <p className={styles.errorMessage}>{questionErrors.text.message}</p>
        )}
      </div>

      {questionType === "OPEN_ENDED" && (
        <div className={styles.formGroup}>
          <label className={styles.label}>Correct Answer:</label>
          <input
            {...register(`questions.${questionIndex}.correctAnswer`)}
            className={styles.input}
            placeholder="Enter correct answer"
          />
          {questionErrors?.correctAnswer && (
            <p className={styles.errorMessage}>
              {questionErrors.correctAnswer.message}
            </p>
          )}
        </div>
      )}

      {questionType === "TRUE_FALSE" && (
        <div className={styles.formGroup}>
          <label className={styles.label}>Correct Answer:</label>
          <Controller
            name={`questions.${questionIndex}.correctAnswer`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={
                  field.value === true
                    ? "true"
                    : field.value === false
                    ? "false"
                    : ""
                }
                onChange={(e) => {
                  const value =
                    e.target.value === "true"
                      ? true
                      : e.target.value === "false"
                      ? false
                      : undefined;
                  field.onChange(value);
                }}
                className={styles.select}
              >
                <option value="">Select answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}
          />
          {questionErrors?.correctAnswer && (
            <p className={styles.errorMessage}>
              {questionErrors.correctAnswer.message}
            </p>
          )}
        </div>
      )}

      {questionType === "MULTIPLE_CHOICE" && (
        <div className={styles.formGroup}>
          <label className={styles.label}>Answer Options:</label>
          {optionFields?.map((option, optionIndex) => (
            <div key={option.id} className={styles.optionContainer}>
              <input
                {...register(
                  `questions.${questionIndex}.options.${optionIndex}.text`
                )}
                className={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
              />
              <Controller
                name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                control={control}
                render={({ field }) => (
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className={styles.checkbox}
                    />
                    Correct Answer
                  </label>
                )}
              />
              {optionFields.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className={styles.removeOptionButton}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendOption({
                text: "",
                isCorrect: false,
                id: crypto.randomUUID(),
              })
            }
            className={styles.addOptionButton}
          >
            <Plus size={16} /> Add Option
          </button>
          {questionErrors && "options" in questionErrors && (
            <p className={styles.errorMessage}>
              {
                (questionErrors as { options?: { message?: string } }).options
                  ?.message
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
