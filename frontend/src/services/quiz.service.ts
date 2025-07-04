
import { Quiz, QuizCreateInput } from '@/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

class QuizService {
  async getAllQuizzes(): Promise<Quiz[]> {
    console.log('API_BASE_URL', API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/quizzes`);
    if (!response.ok) {
      throw new Error('Failed to fetch quizzes');
    }
    return response.json();
  }

  async getQuizById(id: number): Promise<Quiz> {
    const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }
    return response.json();
  }

  async createQuiz(quizData: QuizCreateInput): Promise<Quiz> {
    const response = await fetch(`${API_BASE_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create quiz');
    }
    
    return response.json();
  }

  async deleteQuiz(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete quiz');
    }
  }
}

export default new QuizService();
