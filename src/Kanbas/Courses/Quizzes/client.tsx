import axios from "axios";
const API_BASE = process.env.REACT_APP_REMOTE_SERVER;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/api/courses/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${API_BASE}/api/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${API_BASE}/api/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axios.put(`${API_BASE}/api/quizzes/${quizId}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${API_BASE}/api/quizzes/${quizId}`);
  return response.data;
};

export const togglePublishQuiz = async (quizId: string) => {
  const response = await axios.put(`${API_BASE}/api/quizzes/${quizId}/publish`);
  return response.data;
};

export const submitQuizAttempt = async (quizId: string, attempt: any) => {
  const response = await axios.post(`${API_BASE}/api/quizzes/${quizId}/attempts`, attempt);
  return response.data;
};