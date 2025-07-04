import Link from 'next/link';
import styles from './quizCard.module.css';

interface QuizCardProps {
  id: number;
  title: string;
  questionCount: number;
  onDelete: (id: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, questionCount, onDelete }) => {
  return (
    <div className={styles.card}>
      <Link href={`/quizzes/${id}`} className={styles.titleLink}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <p className={styles.info}>Questions: {questionCount}</p>
      <button
        onClick={() => onDelete(id)}
        className={styles.deleteButton}
        aria-label={`Delete quiz ${title}`}
      >
        Delete
      </button>
    </div>
  );
};

export default QuizCard;