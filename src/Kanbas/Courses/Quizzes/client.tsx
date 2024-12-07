// src/Kanbas/Courses/Quizzes/client.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const QUIZ_API = `${API_BASE}/api/quizzes`;

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${API_BASE}/api/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${API_BASE}/api/quizzes/${quizId}`);
  console.log("Quiz response:", response.data); // Debug log
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axios.put(`${QUIZ_API}/${quizId}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/api/courses/${courseId}/quizzes`);
  return response.data;
};

// Add to src/Kanbas/Courses/Quizzes/client.ts

export const recordAttempt = async (quizId: string, attempt: any) => {
  const response = await axios.post(`${QUIZ_API}/${quizId}/attempts`, attempt);
  return response.data;
};

// client.ts
export const submitQuiz = async (quizId: string, attempt: any) => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/quizzes/${quizId}/attempts`,
      attempt,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    throw error;
  }
};

export const findAttemptsByUser = async (quizId: string, userId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/quizzes/${quizId}/attempts/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user attempts:", error);
    return []; // Return empty array if no attempts found
  }
};