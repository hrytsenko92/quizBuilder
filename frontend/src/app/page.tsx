import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Welcome to Quiz Builder!</h1>
      <p className={styles.homeDescription}>
        Create, view, and manage your quizzes with ease.
      </p>
      <div className={styles.homeButtons}>
        <Link href="/create" className="button button-primary">
          Create New Quiz
        </Link>
        <Link href="/quizzes" className="button button-success">
          View All Quizzes
        </Link>
      </div>
    </div>
  );
}