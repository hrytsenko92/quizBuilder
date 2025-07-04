import './globals.css';
import styles from './layout.module.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create and manage quizzes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
              Quiz Builder
            </Link>
            <ul className={styles.navList}>
              <li>
                <Link href="/create" className={styles.navLink}>
                  Create Quiz
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className={styles.navLink}>
                  My Quizzes
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className={styles.mainContent}>
          {children}
        </main>
      </body>
    </html>
  );
}